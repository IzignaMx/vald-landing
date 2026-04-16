# Repository Guidelines

## Project Structure & Module Organization
This repository is a static event site served from the repo root. Main entry points are `index.html` and `corredores.html`; archived content lives under `ediciones/2025/`. Shared styling is in `styles.css` and `styles.min.css`, offline behavior is in `sw.js`, sponsor metadata is in `data/sponsors.json`, route assets are in `route/`, and images/logos live in `images/` and `sponsors/`.

## Build, Test, and Development Commands
There is no package-based build pipeline here; edit files directly and preview them with a local static server.

```bash
python -m http.server 8000
```

Use `http://localhost:8000/` for the landing page and `http://localhost:8000/corredores.html` for runner/results checks.

Validate JSON before committing sponsor data changes:

```bash
python -m json.tool data/sponsors.json > NUL
```

## Coding Style & Naming Conventions
Follow the existing style: 2-space indentation in HTML, CSS, and inline JavaScript. Preserve semantic HTML, root-relative asset paths such as `/images/VALD.png`, and descriptive lowercase-hyphen filenames for new assets. Keep CSS tokens in `:root`, group related rules with short section comments, and prefer small, localized edits over broad rewrites.

## Testing Guidelines
There is no automated test suite, so rely on manual regression checks. After each change, verify:
- `index.html` renders correctly on mobile and desktop.
- `corredores.html` still loads `corredores.txt` without console errors.
- `ediciones/2025/index.html` still fetches `data/sponsors.json`.
- PWA changes work after a hard refresh; if cached assets change, update the cache version/constants in `sw.js`.

## Commit & Pull Request Guidelines
Recent history uses short imperative subjects, usually Conventional Commit style such as `feat: archive 2025 edition...`. Prefer `feat:`, `fix:`, or `chore:` prefixes when the scope is clear. Keep PRs focused and include:
- A short summary of user-visible changes.
- Linked issue or task, if available.
- Screenshots for layout or content updates.
- Manual verification notes covering the affected pages.

## Deployment & Configuration Tips
This site is intended for static hosting. Treat `CNAME`, `.htaccess`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and `sw.js` as deploy-sensitive files; review them carefully before release.
