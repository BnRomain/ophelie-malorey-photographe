// Consistency checks of the static site, run by `npm run check` and by the CI.
//
// - the JSON files and the JSON-LD of the pages parse;
// - the sitemap is well formed and every URL it lists points to a file of the repository;
// - every local file referenced by the HTML pages (images, stylesheet, script, manifest) exists;
// - the pages, the sitemap and the machine-readable files use a single site URL;
// - the images stay under the weight budget.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const SITE_URL = "https://bnromain.github.io/ophelie-malorey-photographe/";
const PAGES = ["index.html", "mentions-legales.html"];
const JSON_FILES = ["manifest.json", "entities.json", "ai-index.json", "package.json"];
const URL_FILES = [...PAGES, "sitemap.xml", "robots.txt", "llms.txt", "humans.txt", "entities.json", "ai-index.json"];
const IMAGE_DIR = "assets/images";
const IMAGE_BUDGET_KB = 700;

let errors = 0;
const fail = (message) => {
  errors += 1;
  console.error(`ERROR ${message}`);
};

// Path of a local reference or of a URL of the site, relative to the repository root.
const localPath = (reference) => {
  const relative = reference.startsWith(SITE_URL) ? reference.slice(SITE_URL.length) : reference;
  return decodeURIComponent(relative.split(/[?#]/)[0]);
};

for (const file of JSON_FILES) {
  try {
    JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${file}: ${error.message}`);
  }
}

for (const page of PAGES) {
  const html = readFileSync(page, "utf8");
  // src and href attributes, plus the meta content attributes that hold a URL of the site (og:image...).
  const references = [
    ...[...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((match) => match[1]),
    ...[...html.matchAll(/\bcontent="(https:\/\/bnromain\.github\.io\/[^"]+)"/g)].map((match) => match[1]),
  ];
  for (const reference of references) {
    if (/^(#|mailto:|tel:|data:)/.test(reference)) continue;
    if (/^https?:/.test(reference) && !reference.startsWith(SITE_URL)) continue;
    const path = localPath(reference);
    if (path !== "" && !existsSync(path)) fail(`${page}: "${reference}" does not exist`);
  }
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonLd) {
    try {
      JSON.parse(jsonLd[1]);
    } catch (error) {
      fail(`${page}: invalid JSON-LD (${error.message})`);
    }
  }
}

const sitemap = readFileSync("sitemap.xml", "utf8");
if (!sitemap.startsWith("<?xml") || !sitemap.includes("</urlset>")) fail("sitemap.xml is not well formed");
const locations = [...sitemap.matchAll(/<(?:image:)?loc>([^<]+)<\/(?:image:)?loc>/g)].map((match) => match[1]);
if (locations.length === 0) fail("sitemap.xml lists no URL");
for (const location of locations) {
  if (!location.startsWith(SITE_URL)) {
    fail(`sitemap.xml: "${location}" is not under ${SITE_URL}`);
    continue;
  }
  const path = localPath(location);
  if (path !== "" && !existsSync(path)) fail(`sitemap.xml: "${location}" does not exist`);
}

const otherUrl = /https:\/\/bnromain\.github\.io\/(?!ophelie-malorey-photographe\/)[^"'\s<]*/g;
for (const file of URL_FILES) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(otherUrl)) fail(`${file}: unexpected site URL "${match[0]}"`);
}

const images = readdirSync(IMAGE_DIR).sort();
let totalKb = 0;
console.log(`Images of ${IMAGE_DIR}/ (budget: ${IMAGE_BUDGET_KB} kB each)`);
for (const image of images) {
  const kb = statSync(join(IMAGE_DIR, image)).size / 1000;
  totalKb += kb;
  console.log(`  ${image.padEnd(32)} ${kb.toFixed(0).padStart(5)} kB`);
  if (kb > IMAGE_BUDGET_KB) fail(`${image} weighs ${kb.toFixed(0)} kB, above the ${IMAGE_BUDGET_KB} kB budget`);
}
console.log(`  ${"total".padEnd(32)} ${totalKb.toFixed(0).padStart(5)} kB (${images.length} images)`);

if (errors > 0) {
  console.error(`${errors} error(s)`);
  process.exit(1);
}
console.log("Site check passed: JSON, JSON-LD, sitemap, referenced files, site URL and image budget.");
