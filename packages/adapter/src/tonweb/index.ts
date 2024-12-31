import TonWeb from "tonweb";
import { isPostMethod, appendSearchParam } from "../common";
import { version } from "../../package.json";

// @ts-expect-error: overriding the private method `sendImpl`
class TonWebWrappedHttpProvider extends TonWeb.HttpProvider {
  private apiKey: string;

  constructor(props: ConstructorParameters<typeof TonWeb.HttpProvider>[0], apiKey: string) {
    super(props);
    this.apiKey = apiKey;
  }

  override sendImpl = async (apiUrl: string, request: any) => {
    const method = request.method;
    const endpoint = apiUrl.replace("@@METHOD@@", method);
    const shouldSendPost = isPostMethod(method);

    const headers = {
      "Content-Type": "application/json",
      "API_KEY": this.apiKey
    };

    let call: ReturnType<typeof fetch>;

    if (shouldSendPost) {
      call = fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(request.params),
      });
    } else {
      const url = appendSearchParam(endpoint, request.params);
      call = fetch(url, {
        method: "GET",
        headers: headers
      });
    }

    return call
      .then((response) => response.json())
      .then(({ result, error }) => result || Promise.reject(error));
  };
}

class TonWebAdapter extends TonWeb {
  constructor({
    network,
    apiKey,
  }: {
    network: "mainnet" | "testnet";
    apiKey: string;
  }) {
    super(
      //@ts-ignore
      new TonWebWrappedHttpProvider(
        `https://${network}-rpc.tonxapi.com/migration/ton-center/@@METHOD@@`,
        apiKey
      )
    );
  }
}

export default TonWebAdapter;