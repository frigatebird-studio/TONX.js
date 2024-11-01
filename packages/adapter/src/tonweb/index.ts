import TonWeb from "tonweb";
import { isPostMethod, appendSearchParam } from "../common";
import { version } from "../../package.json";

// @ts-expect-error: overriding the private method `sendImpl`
class TonWebWrappedHttpProvider extends TonWeb.HttpProvider {
  constructor(props: ConstructorParameters<typeof TonWeb.HttpProvider>[0]) {
    super(props);
  }
  override sendImpl = async (apiUrl: string, request: any) => {
    const method = request.method;
    const endpoint = apiUrl.replace("@@METHOD@@", method);
    const shouldSendPost = isPostMethod(method);

    const headers: Record<string, string> = {
      "x-source": "tonweb-adapter",
      "x-adapter-version": version,
    };

    let call: ReturnType<typeof fetch>;

    if (shouldSendPost) {
      call = fetch(endpoint, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(request.params),
      });
    } else {
      call = fetch(appendSearchParam(endpoint, request.params), {
        headers,
      });
    }

    return call
      .then((response) => response.json())
      .then(({ result, error }) => result || Promise.reject(error));
  };
}

class TonWebAdapter extends TonWeb {
  // prettier-ignore
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
        // for maintainers: make sure the user cannot take control of the string before "@@METHOD@@"
        `https://${network}-rpc.tonxapi.com/v2/api/@@METHOD@@/${apiKey}`
      )
    );
  }
}
export default TonWebAdapter;
