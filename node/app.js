const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");

const router = require("./router");
const PORT = process.env.PORT || 17000;

app
  .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "GET,POST");
    ctx.set(
      "Access-Control-Allow-Headers",
      "X-Real-IP, Content-Type, Authorization"
    );
    if (ctx.method === "OPTIONS") {
      ctx.status = 204;
    } else {
      await next();
    }
  })
  .use(
    koaBody({
      multipart: true,
      formLimit: "20mb",
      jsonLimit: "20mb",
      textLimit: "20mb"
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, "localhost");
