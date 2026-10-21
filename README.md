# Roshani Chede — Portfolio

Next.js 16 + React 19 + Framer Motion single-page portfolio.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` — the whole page (hero, about, projects, experience, contact)
- `app/globals.css` — base layout and component styles
- `app/live-preview.css` — styles for the live-site iframe previews on project cards
- `app/nude-theme.css` — the warm nude colour/typography theme, loaded last so it overrides the base
- `public/profilepicture.JPG` — hero portrait

`index.html`, `style.css`, `app.js` and `dist/` are the earlier static version and aren't used by the Next.js app.
