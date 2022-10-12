const { createHash } = require("crypto");
const validateWeChatHost = async (ctx: any) => {
  try {
    const token = "adcdef";
    const { signature, echostr, timestamp, nonce } = ctx.query;
    // 1. 将token、timestamp、nonce三个参数进行字典序排序
    const stringArray = [timestamp, nonce, token];
    const resultArray = stringArray.sort();
    // 2. 将三个参数字符串拼接成一个字符串进行sha1加密
    const resultString = resultArray.join("");
    const hashResult = createHash("sha1").update(resultString).digest("hex");
    // 开发者获得加密后的字符串可与 signature 对比，标识该请求来源于微信
    return {
      echostr,
      isWeChatHost: hashResult === signature,
    };
  } catch (error) {
    return {
      echostr: "",
      isWeChatHost: false,
    };
  }
};
module.exports = validateWeChatHost;
