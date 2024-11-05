import TonWeb from "tonweb";
import TonWebAdapter from "./index";

const network = "mainnet";
const tonxApiKey = process.env["TONX_API_KEY"];

const itCond = tonxApiKey ? it : it.skip;

describe("TonWebAdapter", () => {
  let tonWeb!: TonWeb;

  beforeEach(() => {
    tonWeb = new TonWebAdapter({ network, apiKey: tonxApiKey as string });
  });

  itCond("bail out on invalid address", async () => {
    const p = tonWeb.getBalance({ toString: () => "xxx" } as string);

    await p.catch((err: string) => {
      expect(err).toMatch("Incorrect");
    });
  });

  itCond("can get the balance given an address", async () => {
    const addr = new TonWeb.utils.Address("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c");
    const balance = BigInt(await tonWeb.getBalance(addr));
    expect(balance).toBeGreaterThan(0);
  });
});
