const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const json = require('koa-json');
const next = require('next');
const models = require('./models');
const { schedulerMiddleware } = require('./middlewares/scheduler');

const routeMemo = require('./routes/memo');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
// When force value is true, your data in database are reset.
const syncOptions = dev ? { force: false } : { /* DO NOT EDIT HERE */ };

const app = next({ dev });
const handler = app.getRequestHandler();

schedulerMiddleware();

(async () => {
  try {
    await app.prepare().then(() => {
      const server = new Koa();
      const router = new Router();
      const domain = dev ? 'localhost:* *.example.com' : '*.example.com';

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
              defaultSrc: ["'self'", domain],
              frameSrc: [domain],
              frameAncestors: ["'self'"],
              baseUri: ["'self'"],
              connectSrc: ["'self'", domain],
              scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:'],
              styleSrc: ["'self'", "'unsafe-inline'", domain],
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

      models.sequelize.sync(syncOptions).then(() => {
        server.listen(port);
        console.info(`client-server is running on port ${port}!!!`);
      });
    });
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
