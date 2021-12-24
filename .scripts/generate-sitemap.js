require('dotenv').config({ path: '.env.production' });

const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');
const path = require('path');

const BUILD_ID = fs.readFileSync('.next/BUILD_ID').toString();

// eslint-disable-next-line no-console
console.log(`BUILD ID: ${BUILD_ID}`);

const DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

(async () => {
  await sitemap({
    sitemapFilename: 'sitemap.xml',
    baseUrl: DOMAIN,
    pagesDirectory: path.join(__dirname, '../.next/server/pages'),
    targetDirectory: 'public/',
    ignoredExtensions: ['map', 'png', 'jpg', 'json'],
    ignoredPaths: [],
  });
})();
