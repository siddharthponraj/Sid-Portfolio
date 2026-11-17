import { certifications, profile, projectMeta, skills } from '../data';
import Icon from './Icon';
import { useLang } from '../i18n';
import { Reveal, Section } from './Reveal';

const pad = (n: number) => String(n).padStart(2, '0');

export function About() {
  const { t } = useLang();
  const [lead, ...rest] = t.about.paragraphs;
  return (
    <Section id="about" label={t.about.label}>
      <Reveal className="col-left">
        <figure className="portrait">
          <img src={profile.portrait} alt={t.about.portraitAlt} width={433} height={577} loading="lazy" />
        </figure>
      </Reveal>
      <Reveal className="col-right about-copy" delay={0.08}>
        <p className="lead">{lead}</p>
        {rest.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Reveal>
    </Section>
  );
}

export function Experience() {
  const { t } = useLang();
  return (
    <Section id="experience" label={t.experience.label}>
      <ol className="rows">
        {t.experience.jobs.map((job, i) => (
            <Reveal as="li" key={i} className="row job">
              <p className="col-left meta">{job.period}</p>
              <div className="col-right">
                <h3 className="row-title">{job.role}</h3>
                <p className="row-sub">{job.org}</p>
                <ul className="points">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {'groups' in job && job.groups &&
                  job.groups.map((g) => (
                    <section key={g.name} className="job-project">
                      <div className="job-project-head">
                        <h4 className="job-project-name">{g.name}</h4>
                        <span className="job-project-tag">{g.tag}</span>
                      </div>
                      <p className="meta">{g.facts}</p>
                      <p className="meta job-project-stack" lang="en">{g.stack}</p>
                      <ul className="points">
                        {g.points.map(([label, text]) => (
                          <li key={label}>
                            <strong>{label}.</strong> {text}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
              </div>
            </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <Section id="work" label={t.work.label}>
      <ol className="rows">
        {t.work.projects.map((p, i) => {
          const meta = projectMeta[i];
          if (!meta) return null;
          const isFigma = !!meta.href?.includes('figma.com');
          const linkLabel = isFigma ? t.work.prototype : t.work.source;

          // Projects without a screenshot show their facts instead of an empty frame.
          let media;
          if (!meta.image) {
            media = (
              <dl className="col-right project-details">
                {meta.company && (
                  <div>
                    <dt className="meta">{t.work.company}</dt>
                    <dd>{meta.company}</dd>
                  </div>
                )}
                {'platform' in p && p.platform && (
                  <div>
                    <dt className="meta">{t.work.platform}</dt>
                    <dd>{p.platform}</dd>
                  </div>
                )}
                {'modules' in p && p.modules && (
                  <div>
                    <dt className="meta">{t.work.modules}</dt>
                    <dd>{p.modules}</dd>
                  </div>
                )}
                {'role' in p && p.role && (
                  <div>
                    <dt className="meta">{t.work.role}</dt>
                    <dd>{p.role}</dd>
                  </div>
                )}
                {meta.stack.length > 0 && (
                  <div>
                    <dt className="meta">{t.work.stack}</dt>
                    <dd>{meta.stack.join(' · ')}</dd>
                  </div>
                )}
              </dl>
            );
          } else {
            const img = <img src={meta.image} alt="" loading="lazy" />;
            media = meta.href ? (
              <a href={meta.href} target="_blank" rel="noopener" className="col-right project-media" tabIndex={-1} aria-hidden="true">
                {img}
              </a>
            ) : (
              <div className="col-right project-media">{img}</div>
            );
          }

          return (
            <Reveal as="li" key={i} className="row project">
              <div className="col-left project-info">
                <p className="meta">{pad(i + 1)}</p>
                <h3 className="row-title">{p.title}</h3>
                <p className="project-summary">{p.summary}</p>
                {meta.image && meta.stack.length > 0 && <p className="meta tech">{meta.stack.join(' · ')}</p>}
                {meta.href && (
                  <a href={meta.href} target="_blank" rel="noopener" className="chip-btn">
                    <Icon name={isFigma ? 'figma' : 'github'} size={16} />
                    {linkLabel}
                  </a>
                )}
              </div>
              {media}
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

export function Skills() {
  const { t } = useLang();
  return (
    <Section id="skills" label={t.skills.label}>
      {t.skills.groups.map((group, i) => (
        <Reveal key={group} className="col-third skill" delay={(i % 3) * 0.05}>
          <h3 className="meta">{group}</h3>
          <ul className="chips" lang="en">
            {skills[i]?.map((s) => (
              <li key={s.name} className="chip">
                <Icon name={s.icon} />
                {s.name}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </Section>
  );
}

export function Certifications() {
  const { t, locale } = useLang();
  const fmt = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' });
  const date = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    return fmt.format(new Date(y, m - 1, 1));
  };
  return (
    <Section id="certifications" label={t.certs.label}>
      <ul className="rows certs">
        {certifications.map((c) => (
          <li key={c.title} className="row cert">
            <a href={c.href} target="_blank" rel="noopener" className="cert-title" lang="en">
              {c.title}
            </a>
            <span className="cert-issuer meta" lang="en">
              {c.issuer}
            </span>
            <time className="cert-date meta" dateTime={c.date}>
              {date(c.date)}
            </time>
          </li>
        ))}
      </ul>
    </Section>
  );
}
