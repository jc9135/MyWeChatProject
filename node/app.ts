const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();
// const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
// const logger = require("koa-logger");
const getAccessToken = require("./utils/getWeChartAccessToken");
const validateWechatHost = require("./utils/validateWeChatHost");

// middlewares
// app.use(
//   bodyparser({
//     enableTypes: ["json", "form", "text"],
//   })
// );
app.use(async (ctx: any) => {
  const result = await validateWechatHost(ctx);
  if (ctx.request.method === "GET" && result.isWeChatHost) {
    ctx.body = result.echostr;
  } else if (ctx.request.method === "POST" && result.isWeChatHost) {
  }
});
// app.use(json());
// app.use(logger());
// app.use(require("koa-static")(__dirname + "/public"))

// routes
// const user = require("./routes/user")
// app.use(user.routes(), user.allowedMethods())

app.listen(8080, () => {
  console.log("listening in 8080");
});
// module.exports = app;
