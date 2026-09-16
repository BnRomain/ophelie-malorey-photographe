# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.0] - 2026-09-16

### Changed

- Repository renamed `ophelie-malorey-photographe` and default branch renamed `main`: the site now lives at <https://bnromain.github.io/ophelie-malorey-photographe/> (canonical, Open Graph, JSON-LD, sitemap, `robots.txt`, `llms.txt`, `entities.json` and `ai-index.json` updated)
- Photographs moved to `assets/images/`, renamed in kebab-case after the section they illustrate, resized to 2000 px at most and re-encoded as progressive JPEG: 44 MB to 5.1 MB for the 17 images served
- HTML fixes reported by html-validate: encoded ampersand in the title, accessible names on the navigation landmarks, explicit `type` on the lightbox buttons, non-breaking spaces in the phone numbers
- CSS aligned on stylelint-config-standard: modern colour notation, `inset` shorthand, kebab-case keyframes (behaviour unchanged)
- Project documents moved to `docs/` (`cahier-des-charges-fr.md`, `ameliorations-fr.md`)
- README rewritten in English at the root of the repository

### Added

- Linters pinned in `package.json`: html-validate, stylelint and ESLint (`npm run lint`)
- `scripts/check-site.mjs` (`npm run check`): valid JSON and JSON-LD, well-formed sitemap, every referenced file exists, a single site URL, image weight budget
- CI: lint, site check with the page weight in the job summary, markdownlint and lychee, dependency review and CodeQL
- Dependabot for the npm development tools and the GitHub Actions, with auto-merge of patch and minor updates once the required checks pass
- MIT License for the code (photographs and texts remain the property of Ophélie Malorey), contributing guide, code of conduct, security policy, issue forms and pull request template

### Removed

- Four photographs that no page used

## [1.0.0] - 2026-06-12

Version delivered to the client after the SEO and GEO pass. The site itself was designed and built in 2025.

### Added

- One-page portfolio: hero, "Mon travail", three photo sessions with a lightbox, call to action, contact, testimonials and FAQ
- Legal notice page (`mentions-legales.html`)
- Reveal animations, typing effect, parallax, smart navbar, hamburger menu and back-to-top button, all disabled with `prefers-reduced-motion`
- SEO and GEO: calibrated title and description, canonical URL, Open Graph and Twitter cards, JSON-LD graph (LocalBusiness, Person, WebSite, FAQPage), `sitemap.xml` with images, `robots.txt` open to AI crawlers, `llms.txt`, `entities.json`, `ai-index.json`, `humans.txt`, PWA manifest and SVG favicon

[Unreleased]: https://github.com/BnRomain/ophelie-malorey-photographe/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/BnRomain/ophelie-malorey-photographe/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/BnRomain/ophelie-malorey-photographe/releases/tag/v1.0.0
