import axios from "axios";
import { TonClient, HttpApi } from "@ton/ton";
import { z } from "zod";
import { isPostMethod, appendSearchParam } from "../common";

async function httpApiDoCall<T>(this: HttpApi, method: string, body: any, codec: z.ZodType<T>) {
  const parameters = (this as any).parameters;
  const apiKey = parameters.apiKey;

  const headers = {
    "Content-Type": "application/json",
    "API_KEY": apiKey
  };

  const axiosInstance = axios.create({
    headers,
    timeout: parameters.timeout || 10000,
    transformResponse: [(data) => {
      try {
        const parsedData = JSON.parse(data);
        return {
          ...parsedData,
          ok: true
        };
      } catch (error) {
        return { ok: false, error: "Failed to parse response" };
      }
    }]
  });

  const endpoint = this.endpoint.replace("@@METHOD@@", method);
  const shouldSendPost = isPostMethod(method);

  try {
    type Result = {
      error: string; ok: boolean; result: T
    };
    const response = shouldSendPost
      ? await axiosInstance.post<Result>(endpoint, JSON.stringify(body))
      : await axiosInstance.get<Result>(appendSearchParam(endpoint, body));

    if (response.status !== 200 || !response.data.ok) {
      const error = new Error("Received error: " + JSON.stringify(response.data));
      (error as any).response = {
        data: { ok: false, error: response.data.error || "Unknown error" }
      };
      throw error;
    }

    const decoded = codec.safeParse(response.data.result);
    if (!decoded.success) {
      const error = new Error("Malformed response: " + decoded.error.format()._errors.join(", "));
      (error as any).response = {
        data: { ok: false, error: "Invalid response format" }
      };
      throw error;
    }

    return decoded.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = {
        ok: false,
        error: error.response?.data?.error || error.message
      };
      const newError = new Error(JSON.stringify(errorData));
      (newError as any).response = { data: errorData };
      throw newError;
    }
    if (error instanceof Error && (error as any).response) {
      throw error;
    }
    const newError = new Error(JSON.stringify({
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }));
    (newError as any).response = {
      data: { ok: false, error: error instanceof Error ? error.message : "Unknown error" }
    };
    throw newError;
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

    const endpoint = `https://${network}-rpc.tonxapi.com/migration/ton-center/@@METHOD@@`;

    this.api = new ProxiedHttp(endpoint, {
      timeout: 10000,
      apiKey
    });
  }
}

export default ToncoreAdapter;