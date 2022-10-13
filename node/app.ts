import Koa from "koa";
import Router from "koa-router";
// const json = require("koa-json");
// import bodyparser from "koa-bodyparser";
// const logger = require("koa-logger");
import koaBody from "koa-body";
import xml2js from "xml2js";
import getAccessToken from "./utils/getWeChartAccessToken";
import validateWechatHost from "./utils/validateWeChatHost";
import createResponse from "./utils/createResponse";
const app = new Koa();
const router = new Router();

// middlewares
// app.use(
//   bodyparser({
//     enableTypes: ["json", "form", "text"],
//   })
// );
app.use(
  koaBody({
    json: true,
  })
);

app.use(async (ctx: any) => {
  const result = await validateWechatHost(ctx);
  if (ctx.request.method === "GET" && result.isWeChatHost) {
    ctx.body = result.echostr;
  } else if (ctx.request.method === "POST" && result.isWeChatHost) {
    // todo
    const xmlString = await xml2js.parseStringPromise(ctx.request.body);
    const xmlTemp = xmlString.xml;
    const xmlJson: Record<string, any> = {};
    for (const item in xmlTemp) {
      xmlJson[item] = xmlTemp[item][0];
    }
    if (xmlJson.MsgType === "event" && xmlJson.EventKey === "chifanpiao") {
      xmlJson.type = "news";
      xmlJson.content = [
        {
          title: "测试标题",
          description: "测试描述",
          picur:
            "https://ts1.cn.mm.bing.net/th/id/R-C.923b481ad5fc48ab1adacb01867891bd?rik=I3Dd%2f5LF7dhcVA&riu=http%3a%2f%2fimg.yoyou.com%2fuploadfile%2f2018%2f1210%2f20181210023622863.jpg&ehk=qPKISVCPTnkOXqxjyBYLSIwDM%2f5O42iTTxRE4jVOF8o%3d&risl=&pid=ImgRaw&r=0",
          url: "https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html#%E5%9B%9E%E5%A4%8D%E5%9B%BE%E6%96%87%E6%B6%88%E6%81%AF",
        },
      ];
      xmlJson.count = 1;
    } else if (xmlJson.MsgType === "text") {
      // 查询淘宝官方的接口，返回商品的返现和优惠券详情
      xmlJson.type = "text";
      xmlJson.content = "你好！";
    }

    const resMessage = createResponse(xmlJson);
    console.log(xmlJson);
    ctx.body = resMessage;
  }
});
// router.get("/", async (ctx: any) => {
//   ctx.body = "Hello Word";
// });
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
