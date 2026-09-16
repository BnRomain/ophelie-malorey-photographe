## Summary

<!-- What does this pull request change, and why? Link the related issue, for example "Closes #12". -->

## Type of change

- [ ] Bug fix
- [ ] New section, interaction or design change
- [ ] SEO, GEO or metadata
- [ ] Documentation
- [ ] CI, dependencies or tooling

## Checklist

- [ ] `npm run lint` passes (html-validate, stylelint, ESLint)
- [ ] `npm run check` passes (JSON, sitemap, referenced files, site URL, image budget)
- [ ] The site was checked in a browser on a phone-sized viewport and on desktop
- [ ] New images are in `assets/images/`, named in kebab-case, resized to 2000 px at most and under 700 kB
- [ ] `sitemap.xml` and the JSON-LD are updated if a page or a featured image changed
- [ ] `npx markdownlint-cli2` and `lychee --offline --include-fragments .` pass (if Markdown files changed)
- [ ] `CHANGELOG.md` is updated under "Unreleased"
