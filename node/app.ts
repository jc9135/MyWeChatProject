const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
// app.use(require("koa-static")(__dirname + "/public"))

// routes
// const user = require("./routes/user")
// app.use(user.routes(), user.allowedMethods())

module.exports = app;
