const createResponse = (xmlJson: Record<string, any>) => {
  const commonData = `<xml>
  <ToUserName><![CDATA[${xmlJson.FromUserName}]]></ToUserName>
  <FromUserName><![CDATA[${xmlJson.ToUserName}]]></FromUserName>
  <CreateTime>${new Date().getTime()}</CreateTime>
  <MsgType><![CDATA[${xmlJson.type}]]></MsgType>`;
  let newsItem = "";
  if (xmlJson.type === "news") {
    xmlJson.content.forEach((item: Record<string, string>) => {
      newsItem += `
      <item>
        <Title><![CDATA[${item.title}]]></Title>
        <Description><![CDATA[${item.description}]]></Description>
        <PicUrl><![CDATA[${item.picur}]]></PicUrl>
        <Url><![CDATA[${item.url}]]></Url>
      </item>`;
    });
  }

  const typemap: Record<string, string> = {
    text: `<Content><![CDATA[${xmlJson.content}]]></Content>`,
    news: `<ArticleCount>${xmlJson.count}</ArticleCount><Articles>${newsItem}</Articles>`,
  };

  return commonData + typemap[xmlJson.type] + "</xml>";
};
export default createResponse;
