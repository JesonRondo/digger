var koa = require('koa');
var router = require('koa-router')();
var route = require('./api/router');

var app = koa();

for (let k in route.get) {
  router.get(k, route.get[k]);
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
