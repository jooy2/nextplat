const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');
const path = require('path');

const BUILD_ID = fs.readFileSync('.next/BUILD_ID').toString();
// eslint-disable-next-line no-console
console.log(`BUILD ID: ${BUILD_ID}`);

const DOMAIN = 'https://example.com';

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
