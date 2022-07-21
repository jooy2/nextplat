const dotenv = require('dotenv');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');
const next = require('next');
const fs = require('fs');
const { schedulerMiddleware } = require('./middlewares/scheduler');

const routeMemo = require('./routes/memo');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const useDatabaseConnection = dotenv.parse(fs.readFileSync(`.env.${dev ? 'development' : 'production'}`))
  ?.NEXT_PUBLIC_USE_DATABASE === 'true' || false;

const app = next({ dev });
const handler = app.getRequestHandler();

dotenv.config({ path: '.env.production' });
schedulerMiddleware();

(async () => {
  try {
    await app.prepare().then(async () => {
      const server = new Koa();
      const router = new Router();
      let publicDomain = process.env.NEXT_PUBLIC_BASE_URL;
      publicDomain = publicDomain.replace(/https?:\/\//, '');
      const cspDomain = dev ? `localhost:* *.${publicDomain}` : `*.${publicDomain}`;

      server.use(json({ pretty: false }));

      server.use(koaBody())
        .use(cors({
          origin: process.env.NEXT_PUBLIC_API_HOST,
          credentials: true,
        }))
        .use(async (ctx, nxt) => {
          ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
          ctx.set('Access-Control-Allow-Credentials', 'true');
          ctx.cookies.secure = 'true';
          await nxt();
        })
        .use(helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'", cspDomain],
              frameSrc: [cspDomain],
              frameAncestors: ["'self'"],
              baseUri: ["'self'"],
              connectSrc: ["'self'", cspDomain],
              scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:'],
              styleSrc: ["'self'", "'unsafe-inline'", cspDomain],
              fontSrc: ["'self'", "'unsafe-inline'"],
              objectSrc: ["'self'", 'blob:'],
              formAction: ["'self'"],
              imgSrc: ["'self'", 'https:', 'data:'],
              workerSrc: ["'self'", 'blob:'],
              upgradeInsecureRequests: [],
            },
          },
        }))
        .use(router.routes())
        .use(router.allowedMethods());

      router.use('/memo', routeMemo.routes());

      router.get('(.*)', async ctx => {
        await handler(ctx.req, ctx.res);
        ctx.respond = false;
      });

      if (useDatabaseConnection) {
        // eslint-disable-next-line global-require
        const models = require('./models');

        // When force value is true, your data in database are reset.
        await models.sequelize.sync(dev ? { force: false } : { /* DO NOT EDIT HERE */ });
      }
      server.listen(port);
      // eslint-disable-next-line no-console
      console.info(`client-server is running on port ${port}!!!`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit();
  }
})();
