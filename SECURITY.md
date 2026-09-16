# Security Policy

## Supported Versions

Only the `main` branch is maintained: it is the version deployed on GitHub Pages.

| Component | Path | Supported |
| --- | --- | --- |
| Pages, stylesheet and script of the site | `index.html`, `mentions-legales.html`, `css/`, `js/` | Yes |
| Machine-readable files (sitemap, robots, llms.txt, JSON-LD) | root of the repository | Yes |
| Site check script | `scripts/` | Yes |
| GitHub Actions workflows and Dependabot configuration | `.github/` | Yes |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please do not disclose it publicly through a GitHub issue.

Instead, please report it privately to the project maintainer through GitHub's private vulnerability reporting: [report a vulnerability](https://github.com/BnRomain/ophelie-malorey-photographe/security/advisories/new).

When reporting a vulnerability, please provide:

* A short description of the vulnerability
* The affected file or component
* The steps required to reproduce the issue
* Any relevant screenshots, logs, or code examples

## Scope

This policy applies to the source code and configuration contained in this repository, in particular:

* the pages served by GitHub Pages and the JavaScript they run in the visitor's browser;
* the GitHub Actions workflows and the Dependabot configuration.

The site is static: it has no server-side code, no form, no cookie and no third-party script. Its only external resources are the Google Fonts stylesheets. The npm packages of `package.json` are linters used in development and in the CI only; none of them ships with the site.

## Security Measures

* **CodeQL** code scanning on JavaScript and GitHub Actions for every pull request and every push to `main`.
* **Dependabot** version updates for the development tools (pinned in `package.json`) and the GitHub Actions, plus Dependabot security updates. Patch and minor updates are merged automatically only once the required checks of `main` have passed.
* **Dependency review** blocks pull requests that introduce dependencies with known vulnerabilities of moderate severity or higher.
* **Secret scanning** with push protection.
* **Least privilege**: the workflows only get read access to the repository, except the Dependabot auto-merge workflow, which needs to write to pull requests.
* External links open with `rel="noopener noreferrer"`.

## Response

Security reports will be reviewed as soon as reasonably possible.

Depending on the nature and severity of the issue, appropriate corrective actions may include:

* Fixing the vulnerability
* Updating dependencies
* Improving the code or configuration
* Documenting the issue and its resolution
