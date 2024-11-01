import { Address, TonClient } from "@ton/ton";
import axios, { AxiosError, type AxiosAdapter } from "axios";
import ToncoreAdapter from "./index";

const network = "mainnet";
const tonxApiKey = process.env["TONX_API_KEY"];

const itCond = tonxApiKey ? it : it.skip;

const addr = Address.parse("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c");

let axiosHttpAdapter: jest.MockedFunction<AxiosAdapter>;

{
  let mockedAxiosGetAdapter: jest.SpyInstance<AxiosAdapter, Parameters<typeof axios.getAdapter>>;

  beforeAll(() => {
    const getAdapterOrig = axios.getAdapter;
    axiosHttpAdapter = jest.fn(getAdapterOrig("http"));

    mockedAxiosGetAdapter = jest.spyOn(axios, "getAdapter");
    mockedAxiosGetAdapter.mockImplementation((conf) => {
      if (conf == "http") {
        return axiosHttpAdapter;
      }
      return getAdapterOrig(conf);
    });
  });

  afterAll(() => {
    mockedAxiosGetAdapter.mockRestore();
  });
}

describe("ToncoreAdapter", () => {
  let tonClient!: TonClient;

  beforeEach(() => {
    tonClient = new ToncoreAdapter({ network, apiKey: tonxApiKey as string });
  });

  itCond("bail out on invalid address", async () => {
    // @ts-expect-error: xxx is not of Address type
    const p = tonClient.getBalance("xxx");

    await p.catch((err: AxiosError) => {
      expect(err).toBeInstanceOf(AxiosError);
      expect(err.response).toBeDefined();
      expect(err.response!.data).toMatchObject({ ok: false });
    });
  });

  itCond("can get the balance given an address", async () => {
    const balance = await tonClient.getBalance(addr);

    expect(axiosHttpAdapter.mock.lastCall![0].headers.get("x-source") == "toncore-adapter");
    expect(balance).toBeGreaterThan(0);
  });

  itCond("can get transactions", async () => {
    const txs = await tonClient.getTransactions(addr, { limit: 1 });
    expect(txs).toHaveLength(1);
  });
});
