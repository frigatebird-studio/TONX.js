import TonWeb from "tonweb";
import TonWebAdapter from "./index";

const network = "mainnet";
const tonxApiKey = process.env["TONX_API_KEY"];

const describeCond = tonxApiKey ? describe : describe.skip;

describeCond("TonWebAdapter", () => {
  const adapter = new TonWebAdapter({ network, apiKey: tonxApiKey as string });

  it("can get the balance given an address", async () => {
    const addr = new TonWeb.utils.Address("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c");
    const balance = BigInt(await adapter.getBalance(addr));
    expect(balance).toBeGreaterThan(0);
  });
});
