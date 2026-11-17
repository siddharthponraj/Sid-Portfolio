# Siddharth P — Portfolio

Personal portfolio built with React, TypeScript, Vite, Three.js (via React Three Fiber) and Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build
```

## Edit content

- **Wording** lives in `src/i18n/` — `en.ts` (English, the default), `ta.ts` (Tamil) and `hi.ts` (Hindi).
  English is the master: TypeScript fails the build if a translation is missing a field.
  Wrap words in `**double asterisks**` to make them bold.
- **Links, images and tech stacks** live in [`src/data.ts`](src/data.ts).
- **Images, the résumé and certificate PDFs** live in `public/assets/`.

Visitors always start in English; the language picker in the header remembers their choice.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** (one-time).
