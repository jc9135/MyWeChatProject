// 调用微信生成公众号菜单接口
import request from "request-promise";
import { MENU_LIST } from "../config";
import getAccessToken from "./getWeChartAccessToken";
const uri = "https://api.weixin.qq.com/cgi-bin/menu/create";
const createMenu = async () => {
  const accessToken = await getAccessToken();
  const params = {
    method: "POST",
    uri: `${uri}?access_token=${accessToken}`,
    body: MENU_LIST,
    json: true,
  };
  await request.post(params);
};
export default createMenu;
