const Router = require('koa-router');
const models = require('../models');

const routerMemo = new Router();

const Memo = models.memo.build();

routerMemo.post('/create', async (ctx) => {
  const { ip } = ctx;
  const { content } = ctx.request.body;

  Memo.createMemo({
    ip,
    content,
  });

  ctx.body = { success: true };
  return true;
});

module.exports = routerMemo;
