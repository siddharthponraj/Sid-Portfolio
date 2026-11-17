import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLang } from '../i18n';
import { useTheme, type Theme } from '../theme';

// An exploded view of the layers Siddharth works on — interface, logic, data and
// security (the foundation). Labels are HTML, positioned every frame from the
// projected plate corners so they line up exactly with the 3D.

const SIZE = 3; // plate width/depth
const THICK = 0.16;
const GAP = 1.05; // vertical distance between plates
const COUNT = 4;
// Per-theme materials and light. The active layer always takes the text colour,
// so it reads as "highlighted" in both themes; security keeps the accent blue.
const PALETTES: Record<
  Theme,
  { clay: THREE.Color; active: THREE.Color; foundation: THREE.Color; foundationActive: THREE.Color; ground: string; hemi: number; key: number; shadow: number }
> = {
  light: {
    clay: new THREE.Color('#e4e2db'),
    active: new THREE.Color('#111110'),
    foundation: new THREE.Color('#2f4bdb'),
    foundationActive: new THREE.Color('#4a66f2'),
    ground: '#d6d2c8',
    hemi: 1.15,
    key: 1.9,
    shadow: 0.07,
  },
  dark: {
    clay: new THREE.Color('#47463f'),
    active: new THREE.Color('#f2f1ed'),
    foundation: new THREE.Color('#3651e0'),
    foundationActive: new THREE.Color('#7b8fff'),
    ground: '#0f0f0e',
    hemi: 0.85,
    key: 1.5,
    shadow: 0.35,
  },
};

function plateGeometry() {
  const s = SIZE / 2;
  const r = 0.18;
  const shape = new THREE.Shape();
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r, -s);
  shape.quadraticCurveTo(s, -s, s, -s + r);
  shape.lineTo(s, s - r);
  shape.quadraticCurveTo(s, s, s - r, s);
  shape.lineTo(-s + r, s);
  shape.quadraticCurveTo(-s, s, -s, s - r);
  shape.lineTo(-s, -s + r);
  shape.quadraticCurveTo(-s, -s, -s + r, -s);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: THICK,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
    curveSegments: 6,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -THICK / 2, 0);
  return geo;
}

type Overlay = { anchors: (HTMLDivElement | null)[] };

const COMPACT_WIDTH = 560; // below this, labels can't sit beside the plates legibly
const LABEL_GAP = 32; // px between the widest plate corner and the label column

function Plates({
  active,
  setHover,
  animate,
  overlay,
  layoutKey,
  compact,
  palette,
}: {
  active: number;
  setHover: (i: number | null) => void;
  animate: boolean;
  overlay: React.RefObject<Overlay>;
  layoutKey: string;
  compact: boolean;
  palette: (typeof PALETTES)[Theme];
}) {
  const { camera, size } = useThree();
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const geometry = useMemo(plateGeometry, []);
  const corner = useMemo(() => new THREE.Vector3(), []);
  const maxLabel = useRef(0);
  const baseY = (i: number) => ((COUNT - 1) / 2 - i) * GAP;

  // Size and place the stack so that plates + label column fill the canvas exactly:
  // the longest label ends on the canvas's right edge (the grid's right edge).
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    if (compact) {
      // Narrow screens: centred stack, labels move to a legend below the canvas.
      maxLabel.current = 0;
      cam.zoom = Math.min(size.width / 6, size.height / 6.6);
      cam.updateProjectionMatrix();
      group.current?.position.set(0, 0.1, 0);
      return;
    }
    const labels = overlay.current?.anchors.map((a) => a?.querySelector<HTMLElement>('.stack-label')?.offsetWidth ?? 0) ?? [];
    maxLabel.current = Math.max(0, ...labels);
    const diag = SIZE * Math.SQRT2 + 0.1; // on-screen width of a plate, in world units
    cam.zoom = Math.min(size.width / 8.4, size.height / 6.6, (size.width - LABEL_GAP - maxLabel.current) / diag);
    cam.updateProjectionMatrix();
    const centerX = size.width - maxLabel.current - LABEL_GAP - (diag / 2) * cam.zoom;
    const shift = (size.width / 2 - centerX) / cam.zoom; // world units, toward screen-left
    group.current?.position.set(-shift / Math.SQRT2, 0.1, shift / Math.SQRT2);
  }, [camera, size, overlay, layoutKey, compact]);

  useFrame((state, delta) => {
    const k = animate ? Math.min(delta * 5, 1) : 1;
    // Exploded-view intro: plates start together and separate once.
    const p = animate ? Math.min(state.clock.elapsedTime / 1.6, 1) : 1;
    const spread = 0.2 + 0.8 * (1 - Math.pow(1 - p, 3));
    const ov = overlay.current;
    const ys: number[] = [];
    const xs: number[] = [];

    meshes.current.forEach((m, i) => {
      if (!m) return;
      m.position.y = baseY(i) * spread;

      // The active layer turns ink; security (the foundation) keeps its accent.
      const mat = m.material as THREE.MeshStandardMaterial;
      const pal = palette;
      const want = i === COUNT - 1 ? (i === active ? pal.foundationActive : pal.foundation) : i === active ? pal.active : pal.clay;
      mat.color.lerp(want, k);

      // Right-hand corner of the plate (screen-right is +x/-z for this camera).
      corner.set(SIZE / 2, m.position.y, -SIZE / 2);
      m.parent!.localToWorld(corner);
      corner.project(state.camera);
      xs.push((corner.x * 0.5 + 0.5) * size.width);
      ys.push((-corner.y * 0.5 + 0.5) * size.height);
    });

    if (ov && !compact) {
      // One shared label column; the longest label ends exactly on the canvas's right edge.
      const labelX = maxLabel.current ? size.width - maxLabel.current : Math.max(...xs) + LABEL_GAP;
      ov.anchors.forEach((a, i) => {
        if (!a || ys[i] === undefined) return;
        a.style.transform = `translate3d(${xs[i]}px, ${ys[i]}px, 0)`;
        a.style.setProperty('--len', `${labelX - xs[i] - 8}px`);
      });
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            meshes.current[i] = m;
          }}
          geometry={geometry}
          position-y={baseY(i)}
          castShadow
          receiveShadow
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(i);
          }}
          onPointerOut={() => setHover(null)}
        >
          <meshStandardMaterial color={i === COUNT - 1 ? palette.foundation : palette.clay} roughness={0.7} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position-y={baseY(COUNT - 1) - 0.3} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial opacity={palette.shadow} />
      </mesh>
    </group>
  );
}

export default function Stack() {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const palette = PALETTES[theme];
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [fontsReady, setFontsReady] = useState(false);
  const [auto, setAuto] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const overlay = useRef<Overlay>({ anchors: [] });
  const active = hover ?? auto;

  // Step through the layers while nobody is hovering.
  useEffect(() => {
    if (reduced || hover !== null || !visible) return;
    const id = window.setInterval(() => setAuto((i) => (i + 1) % COUNT), 2800);
    return () => window.clearInterval(id);
  }, [reduced, hover, visible]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < COMPACT_WIDTH));
    ro.observe(el);
    // Label widths change once web fonts arrive; re-fit the layout then.
    document.fonts?.ready.then(() => setFontsReady(true));
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <figure
      ref={wrap}
      className={`stack${ready ? ' is-ready' : ''}`}
      role="img"
      aria-label={t.hero.diagram}
    >
      <div className="stack-stage">
        <Canvas
          orthographic
          shadows="percentage"
          dpr={[1, 2]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [10, 8.2, 10], near: 0.1, far: 100, zoom: 50 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, 0);
            setReady(true);
          }}
        >
          <hemisphereLight args={['#ffffff', palette.ground, palette.hemi]} />
          <directionalLight
            position={[-4, 10, 6]}
            intensity={palette.key}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
            shadow-bias={-0.0004}
          />
          <directionalLight position={[6, 2, -4]} intensity={0.3} />
          <Plates
            active={active}
            setHover={setHover}
            animate={!reduced}
            overlay={overlay}
            layoutKey={`${lang}-${fontsReady}`}
            compact={compact}
            palette={palette}
          />
        </Canvas>

        <div className="stack-labels" aria-hidden="true" hidden={compact}>
          {t.hero.layers.map((layer, i) => (
            <div
              key={i}
              className={`stack-anchor${i === active ? ' is-active' : ''}`}
              ref={(el) => {
                overlay.current.anchors[i] = el;
              }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              <span className="stack-leader" />
              <span className="stack-label">
                <span className="stack-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="stack-name">{layer.name}</span>
                <span className="stack-detail">{layer.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {compact && (
        <ol className="stack-legend">
          {t.hero.layers.map((layer, i) => (
            <li key={i} className={i === active ? 'is-active' : undefined}>
              <span className="stack-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="stack-name">{layer.name}</span>
              <span className="stack-detail">{layer.detail}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
