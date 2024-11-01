import axios from "axios";
import { TonClient, HttpApi } from "@ton/ton";
import { z } from "zod";
import { version } from "../../package.json";
import { version as tonClientVersion } from "@ton/ton/package.json";
import { isPostMethod, appendSearchParam } from "../common";

// duplicating the logic of HttpApi.#doCall since we need to branch at axios sending GET/POST requests
async function httpApiDoCall<T>(this: HttpApi, method: string, body: any, codec: z.ZodType<T>) {
  const headers = {
    "Content-Type": "application/json",
    "X-Ton-Client-Version": tonClientVersion,
  };

  // private member
  const parameters = (this as any).parameters;
  const axiosConfig = {
    headers,
    timeout: parameters.timeout,
    adapter: parameters.adapter,
  };

  const endpoint = this.endpoint.replace("@@METHOD@@", method);
  const shouldSendPost = isPostMethod(method);

  type Result = { ok: boolean; result: T };
  const p =
    shouldSendPost ?
      axios.post<Result>(endpoint, JSON.stringify(body), axiosConfig)
    : axios.get<Result>(appendSearchParam(endpoint, body), axiosConfig);

  const res = await p;
  if (res.status !== 200 || !res.data.ok) {
    throw new Error("Received error: " + JSON.stringify(res.data));
  }

  const decoded = codec.safeParse(res.data.result);
  if (decoded.success) {
    return decoded.data;
  } else {
    throw Error("Malformed response: " + decoded.error.format()._errors.join(", "));
  }
}

const ProxiedHttp = new Proxy(HttpApi, {
  construct(target, args) {
    const instance = Reflect.construct(target, args);
    instance.doCall = httpApiDoCall.bind(instance);

    return instance;
  },
});

class ToncoreAdapter extends TonClient {
  // #api: any;
  // prettier-ignore
  constructor({
    apiKey,
    network,
  }: {
    apiKey: string;
    network: "mainnet" | "testnet";
  }) {
    super({
      endpoint: "",
    });
    this.api = new ProxiedHttp(
      // for maintainers: make sure the user cannot take control of the string before "@@METHOD@@"
      `https://${network}-rpc.tonxapi.com/v2/api/@@METHOD@@/${apiKey}`,
      {
        adapter: async (config) => {
          const adapter = axios.getAdapter("http");
          config.headers = config.headers.concat({
            "x-source": "toncore-adapter",
            "x-adapter-version": version,
          });
          const r = await adapter(config);
          if (r.status !== 200) {
            throw r;
          }

          r.data = JSON.stringify({
            ...JSON.parse(r.data),
            ok: true,
          });
          return r;
        },
      }
    );
  }
}

export default ToncoreAdapter;
