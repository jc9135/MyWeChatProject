import validateWeChatHostTest from "../../utils/validateWeChatHost";

describe("validateWeChatHost", () => {
  it("检查是否是来自微信服务器的请求", async () => {
    const ctx = {
      query: {},
    };
    const validateDate = await validateWeChatHostTest(ctx);
    expect(validateDate.isWeChatHost).toBe(false);
  });
});
