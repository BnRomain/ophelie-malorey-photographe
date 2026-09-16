# Contributing

Thank you for your interest in this project. It is the portfolio website of a
real client, so the content (photographs, texts, contact details) is hers and
changes to it go through her. Bug reports, improvements of the code, of the
accessibility, of the performance or of the SEO, and documentation fixes are
welcome.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** or **suggest an improvement** with the
  [issue forms](https://github.com/BnRomain/ophelie-malorey-photographe/issues/new/choose).
- **Report a security vulnerability** privately, as described in the
  [security policy](SECURITY.md). Please do not open a public issue for it.
- **Open a pull request** for a fix, an interaction, an SEO improvement or documentation.

For a larger change, for example a new section or a redesign, please open an
issue first so that we can agree on the approach.

## Development setup

The site is plain HTML, CSS and JavaScript: open `index.html` in a browser, or
serve the folder to get the same behaviour as GitHub Pages (`python -m http.server`).
Node.js 22 is only needed for the linters and the site check.

```bash
git clone https://github.com/BnRomain/ophelie-malorey-photographe.git
cd ophelie-malorey-photographe
npm ci

npm run lint       # html-validate, stylelint and ESLint
npm run check      # JSON, JSON-LD, sitemap, referenced files, site URL and image budget
```

To check the Markdown files like the CI does:

```bash
npx markdownlint-cli2
lychee --offline --include-fragments .
```

## Coding guidelines

The repository provides an [`.editorconfig`](.editorconfig) file: most editors
apply its indentation and whitespace settings automatically. The original
brief (in French) is kept in [`docs/cahier-des-charges-fr.md`](docs/cahier-des-charges-fr.md).

- No framework, no bundler, no build step: the files are served as they are.
  The site must stay usable without JavaScript (progressive enhancement).
- Semantic HTML, every image with a descriptive `alt`, keyboard-reachable
  interactions, and `prefers-reduced-motion` respected for the animations.
- CSS: custom properties for the colours and the fonts, kebab-case class
  names (an optional BEM modifier such as `.btn--white` is allowed),
  mobile-first media queries in the legacy `(min-width: ...)` notation for
  browser support. The code must pass `stylelint` ([`.stylelintrc.json`](.stylelintrc.json)).
- JavaScript: vanilla, strict mode, no dependency. It must pass ESLint
  ([`eslint.config.js`](eslint.config.js)).
- Images go to `assets/images/`, named in kebab-case after the section they
  illustrate, resized to 2000 px on their longest side at most and kept under
  700 kB (`npm run check` enforces the budget). Add featured images to
  `sitemap.xml` and to the JSON-LD of `index.html`.
- Keep a single site URL everywhere (canonical, Open Graph, JSON-LD, sitemap,
  `robots.txt`, `llms.txt`, `entities.json`, `ai-index.json`): the check fails
  on any other `bnromain.github.io` URL.
- Pin new development dependencies to an exact version in `package.json` so
  that Dependabot can track them.

## Pull request process

1. Create a branch from `main` with a descriptive name, for example
   `fix/lightbox-focus` or `docs/wiki-links`.
2. Keep commits focused, with a short summary in the imperative mood
   (for example "Add the WebP versions of the gallery images").
3. Open a pull request against `main`, fill in the template and add a label
   (`bug`, `enhancement`, `documentation`...): labels sort the release notes.
4. The `main` branch is protected: a pull request can only be merged once the
   required checks (`lint`, `site`, `docs` and `dependency-review`) pass and
   the branch is up to date with `main`. CodeQL also analyzes every pull
   request. Merging to `main` deploys the site on GitHub Pages.
5. Update the documentation (README, [wiki](https://github.com/BnRomain/ophelie-malorey-photographe/wiki))
   when the structure or the tooling changes, and `CHANGELOG.md` under "Unreleased".

## Versioning and releases

The project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (`2.0.0`): redesign or change of the site URL;
- **MINOR** (`1.1.0`): new section, interaction, page or SEO feature;
- **PATCH** (`1.0.1`): bug fix, content or metadata correction.

Releases are published from `main` with a `vX.Y.Z` tag. GitHub generates their
notes from the merged pull requests, grouped by label as configured in
[`.github/release.yml`](.github/release.yml), and the `version` field of
[`package.json`](package.json) is updated at the same time.
