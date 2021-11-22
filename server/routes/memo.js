const Router = require('koa-router');
const models = require('../models');

const routerMemo = new Router();

const Memo = models.memo.build();

routerMemo.post('/create', async (ctx) => {
  const { ip } = ctx;

  ctx.body = { success: true, ip };
  return true;
});

module.exports = routerMemo;
