import dtkSdk from "dtk-nodejs-api-sdk";
import { appKey, appSecret } from "../config";
/*
 *  @checkSign: 1 默认老版本验签  2 新版验签
 *  @appKey: 用户填写 appkey
 *  @appSecret: 用户填写 appSecret
 */
const sdk = new dtkSdk({
  appKey,
  appSecret,
  checkSign: 2,
});

const uri = `https://openapi.dataoke.com/api/tb-service/twd-to-twd`;
const taoBaoProInfo = {
  couponInfo: 0, // 优惠券
  price: 0, // 券后价格
  retrunMoney: "", //额外返现
  longTpwd: "", // 淘口令
};

const getTaoBaoPro = async (content: string) => {
  const { data: productInfo } = await sdk.request(uri, {
    method: "GET",
    /* 注意:form 里面就不用传appKey与appSecret  */
    form: { content, version: "v1.0.0" },
  });
  if (productInfo) {
    taoBaoProInfo.couponInfo =
      productInfo?.originalPrice - productInfo?.actualPrice;
    taoBaoProInfo.price = productInfo?.actualPrice;
    taoBaoProInfo.retrunMoney = (
      productInfo?.actualPrice *
      (productInfo?.maxCommissionRate / 100) *
      0.9
    ).toFixed(2);
    taoBaoProInfo.longTpwd = productInfo?.longTpwd;
  }
  return taoBaoProInfo;
};
export default getTaoBaoPro;
