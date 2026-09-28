#!/usr/bin/env tsx
/**
 * Standalone XML Sitemap Generation Script
 * Dhanus Gold Fitness - Kengeri Bengaluru
 *
 * Dynamically crawls App.tsx routes and generates Google & Schema-compliant
 * sitemap.xml with bilingual hreflang alternates for English and Kannada pages.
 *
 * Usage:
 *   npx tsx scripts/generate-sitemap.ts
 *   npm run generate:sitemap
 */

import fs from 'fs';
import path from 'path';
import {
  crawlAppRoutes,
  generateSitemapXml,
  generateSitemapManifest,
} from '../src/utils/sitemapGenerator';

const BASE_URL = process.env.SITE_URL || 'https://www.dhanusgoldfitness.com';
const ROOT_DIR = process.cwd();
const APP_TSX_PATH = path.resolve(ROOT_DIR, 'src/App.tsx');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const OUTPUT_SITEMAP = path.resolve(PUBLIC_DIR, 'sitemap.xml');
const OUTPUT_MANIFEST = path.resolve(PUBLIC_DIR, 'sitemap-manifest.json');

console.log('====================================================');
console.log('🏋️‍♂️  DHANUS GOLD FITNESS - SITEMAP & ROUTE CRAWLER   ');
console.log('====================================================');
console.log(`📍 Base Domain:    ${BASE_URL}`);
console.log(`🔍 Crawling file:  ${APP_TSX_PATH}`);
console.log(`📅 Timestamp:      ${new Date().toISOString()}`);

if (!fs.existsSync(APP_TSX_PATH)) {
  console.error(`❌ Error: App.tsx not found at ${APP_TSX_PATH}`);
  process.exit(1);
}

// 1. Crawl routes from App.tsx
const crawledRoutes = crawlAppRoutes(APP_TSX_PATH);
const indexableRoutes = crawledRoutes.filter((r) => !r.isExcluded);
const excludedRoutes = crawledRoutes.filter((r) => r.isExcluded);
const canonicalRoutes = indexableRoutes.filter((r) => !r.isAlias);
const aliasRoutes = indexableRoutes.filter((r) => r.isAlias);

console.log('\n📊 Route Discovery Breakdown:');
console.log(`  • Total routes parsed from App.tsx: ${crawledRoutes.length}`);
console.log(`  • Canonical crawlable pages:        ${canonicalRoutes.length}`);
console.log(`  • Target alias redirects:           ${aliasRoutes.length}`);
console.log(`  • Excluded / Auth protected routes:  ${excludedRoutes.length}`);
console.log(`  • Total XML URL nodes (EN + KN):    ${indexableRoutes.length * 2}`);

// 2. Generate XML Sitemap with bilingual alternates
const sitemapXml = generateSitemapXml(BASE_URL, {
  includeKannadaEntries: false,
  currentDate: new Date().toISOString().split('T')[0],
});

// 3. Ensure public directory exists and write sitemap.xml
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_SITEMAP, sitemapXml, 'utf-8');
console.log(`\n✅ Generated Sitemap: ${OUTPUT_SITEMAP} (${(Buffer.byteLength(sitemapXml, 'utf-8') / 1024).toFixed(2)} KB)`);

// 4. Generate & write audit manifest
const manifest = generateSitemapManifest(BASE_URL);
fs.writeFileSync(OUTPUT_MANIFEST, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`✅ Generated Audit Manifest: ${OUTPUT_MANIFEST}`);

// 5. If dist directory exists (post-build), sync sitemap there as well
if (fs.existsSync(DIST_DIR)) {
  const distSitemap = path.resolve(DIST_DIR, 'sitemap.xml');
  const distManifest = path.resolve(DIST_DIR, 'sitemap-manifest.json');
  fs.writeFileSync(distSitemap, sitemapXml, 'utf-8');
  fs.writeFileSync(distManifest, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✅ Synced sitemap to production dist: ${distSitemap}`);
}

// 6. Display Route Table Summary
console.log('\n📋 Crawled Routes & Localized Indexing Index:');
console.table(
  crawledRoutes.map((r) => ({
    Route: r.path,
    Type: r.isExcluded ? '⛔ Excluded' : r.isAlias ? '🔗 Alias' : '🌟 Canonical',
    Component: r.component,
    Priority: r.isExcluded ? '-' : r.priority.toFixed(1),
    Freq: r.changefreq,
    'English Title': r.titleEn.slice(0, 38) + (r.titleEn.length > 38 ? '…' : ''),
    'Kannada Title': r.titleKn.slice(0, 30) + (r.titleKn.length > 30 ? '…' : ''),
  }))
);

console.log('🎉 Sitemap generation completed successfully!\n');
