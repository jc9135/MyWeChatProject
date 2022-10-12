// 获取  WeChat  AccessToken

const request = require("request-promise");
const fs = require("fs");

const appId = "wx3f70053c39e6d20a";
const secret = "f2d4604a6b903eb74aa9873d05a36078";
const uri = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`;
const filePath = __dirname + "/token_file/accessToken.json";

const updateAccessToken = async () => {
  const resAccessToken = await request(uri);
  const formateToken = JSON.parse(resAccessToken);
  const expireTime = new Date().getTime() + formateToken.expires_in * 1000;
  formateToken.expireTime = expireTime;
  fs.writeFileSync(filePath, JSON.stringify(formateToken));
};

const getWeChartAccessToken = async () => {
  try {
    // 获取本地存储的accessToken
    const localAccessToken = await fs.readFileSync(filePath, "utf8");
    const parseAccessToken = JSON.parse(localAccessToken);
    // 判断accessToken有没有过期
    let resultToken = "";
    if (new Date().getTime() < parseAccessToken.expireTime) {
      resultToken = parseAccessToken.access_token;
    } else {
      await updateAccessToken();
      await getWeChartAccessToken();
    }
    return resultToken;
  } catch (error) {
    await updateAccessToken();
    await getWeChartAccessToken();
  }
};
// setInterval(() => {
//   getWeChartAccessToken().then((res) => console.log(res));
// }, 7200 * 1000);
module.exports = getWeChartAccessToken;
