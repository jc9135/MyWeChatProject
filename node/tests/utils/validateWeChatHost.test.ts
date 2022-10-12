const validateWeChatHostTest = require("../../utils/validateWeChatHost");

describe("validateWeChatHost", () => {
  it("检查是否是来自微信服务器的请求", () => {
    const ctx = {
      query: {},
    };
    expect(validateWeChatHostTest(ctx).isWeChatHost).toBe(false);
  });
});
