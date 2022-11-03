require('dotenv').config({ path: '.env.production' });

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const PATH_ROBOT_TXT = 'public/robots.txt';
const PATH_ENV_DEVELOPMENT = '.env.development';
const PATH_ENV_PRODUCTION = '.env.production';
const PATH_MANIFEST = 'public/manifest.json';

const PROMPT_HEAD = '[NextJS-ET] ';

(async () => {
  rl.setPrompt(`${PROMPT_HEAD}Enter your website name (Default: NextJS-ET): `);
  rl.prompt();

  let domain;
  let siteName;
  let defaultEnvProduction = '';
  let defaultEnvDevelopment = '';
  let tempStr = '';
  let step = 0;
  let done = false;

  rl.on('line', (data) => {
    switch (step) {
      case 0:
        siteName = data;
        tempStr = `NEXT_PUBLIC_SITE_NAME=${data || 'NextJS-ET'}`;
        rl.setPrompt(`${PROMPT_HEAD}Enter your website domain (Default: example.com): `);
        break;
      case 1:
        domain = data.length < 1 ? 'https://example.com' : data;
        if (!/https?:\/\//.test(domain)) {
          domain = `https://${domain}`;
        }
        if (/\/$/.test(domain)) {
          domain.slice(0, -1);
        }
        tempStr = `\nNEXT_PUBLIC_BASE_URL=${domain}`;
        rl.setPrompt(`${PROMPT_HEAD}Enter your website author name (Default: NextJS-ET): `);
        break;
      case 2:
        tempStr = `\nNEXT_PUBLIC_AUTHOR_NAME=${data || 'NextJS-ET'}`;
        rl.setPrompt(
          `${PROMPT_HEAD}Enter your website author email (Default: admin@example.com): `,
        );
        break;
      case 3:
        tempStr = `\nNEXT_PUBLIC_AUTHOR_EMAIL=${data || 'admin@example.com'}`;
        rl.setPrompt(
          `${PROMPT_HEAD}Would you like to enable the database function? (Enter \'Y\' or \'N\'): `,
        );
        break;
      case 4:
        if (data.length < 1 || (data.toLowerCase() !== 'y' && data.toLowerCase() !== 'n')) {
          rl.setPrompt(
            `${PROMPT_HEAD}Would you like to enable the database function? (Enter \'Y\' or \'N\'): `,
          );
          rl.prompt();
        } else {
          tempStr = `\nNEXT_PUBLIC_USE_DATABASE=${data.toLowerCase() === 'y' ? 'true' : 'false'}`;
          defaultEnvProduction += tempStr;
          defaultEnvDevelopment += tempStr;
          done = true;
        }
        break;
      default:
        break;
    }
    if (step < 4 && !done) {
      defaultEnvProduction += tempStr;
      defaultEnvDevelopment += tempStr;
      step += 1;
      rl.prompt();
    }
    if (done) {
      const manifest = {
        short_name: siteName,
        name: siteName,
        icons: [
          {
            src: `${domain}/favicon.ico`,
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: `${domain}/logo192.png`,
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: `${domain}/logo512.png`,
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      };

      // initialize
      if (fs.existsSync(PATH_ENV_DEVELOPMENT)) {
        fs.rmSync(PATH_ENV_DEVELOPMENT);
      }
      if (fs.existsSync(PATH_ENV_PRODUCTION)) {
        fs.rmSync(PATH_ENV_PRODUCTION);
      }
      if (fs.existsSync(PATH_MANIFEST)) {
        fs.rmSync(PATH_MANIFEST);
      }
      fs.writeFileSync(PATH_ENV_DEVELOPMENT, defaultEnvDevelopment);
      fs.writeFileSync(PATH_ENV_PRODUCTION, defaultEnvProduction);
      fs.writeFileSync(PATH_MANIFEST, JSON.stringify(manifest, null, '\t'));

      // eslint-disable-next-line no-console
      console.log('\nAll settings are complete. Check it out with npm run dev!');
      rl.close();
    }
  });
  rl.on('close', () => {
    process.exit();
  });

  // robot.txt
  if (!fs.existsSync(PATH_ROBOT_TXT)) {
    fs.writeFileSync(
      PATH_ROBOT_TXT,
      `# https://www.robotstxt.org/robotstxt.html\nSitemap: ${domain}/sitemap.xml`,
    );
  }
})();
