// 获取  WeChat  AccessToken

// 获取  AccessToken https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
const request = require("request");
const fs = require("fs");

const uri: string =
  "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
const baseUri: string = __dirname;
const appId: string = "wx55ecdb143f80c36b";
const secret: string = "88874e40ab2814bce23125cd9e8bc1fa";

const updateAccessToken = async () => {
  let params = {
    url: `${uri}?grant_type=client_credential&appid=${appId}&secret=${secret}`,
    method: "GET",
  };
  const a = await request(params);
};

const getAccessToken = async () => {
  try {
    const localAccessToken = fs.readFileAsync(
      baseUri + "/localAccessToken.json"
    );
    const parseAccessToken = JSON.parse(localAccessToken);
    if (new Date().getTime() > parseAccessToken.exTime) {
      const accessToken = JSON.parse(localAccessToken);
      return accessToken;
    } else {
      await updateAccessToken();
      await getAccessToken();
    }
  } catch (error) {
    await updateAccessToken();
    await getAccessToken();
  }
};

module.exports = getAccessToken;
