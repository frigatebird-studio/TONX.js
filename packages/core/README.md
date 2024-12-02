# TONX.js

TONX.js SDK (`@tonx/core`) makes onboarding to the TON blockchain seamless with TON API tools, leveraging the power of [TONX API](https://tonxapi.com/) to help you launch your dApp quickly.

Whether you're new to the TON ecosystem or an experienced developer, TONX.js simplifies the process and gets you started effortlessly.

For detailed usage instructions and a quickstart guide, visit the https://docs.tonxapi.com/docs/welcome-to-ton-api. To explore the full range of TON API endpoints provided by tonxapi.com, refer to the [TON APIs Reference Overview](https://docs.tonxapi.com/reference/ton-api-overview).


## Features

- JSON-RPC method powered by the TONX Supernode with 99.99% uptime, precise indexing, and ultra-low latency
- Full integration with [TONX API](https://tonxapi.com/) endpoints

In addition, the [TONX.js Adapter (@tonx/adapter)](https://www.npmjs.com/package/@tonx/adapter) allows for an easy transition from popular TON client libraries like [@ton/ton](https://github.com/ton-org/ton), [TonWeb](https://github.com/toncenter/tonweb), and [TonClient4](https://github.com/ton-org/ton/blob/master/src/client/TonClient4.ts). With just a few code changes, you can seamlessly integrate with [TONX API](https://tonxapi.com/).

## Install

```bash
npm install @tonx/core
```

To access the full features of [TONX API](https://tonxapi.com/), including advanced tools, [register here](https://auth.tonxapi.com/signup) for a free TON API key.

There are some basic structures for TON SDK development.

## Example

```js
import { TONXJsonRpcProvider } from "@tonx/core";

const client = new TONXJsonRpcProvider({
  network: "mainnet",
  apiKey: "YOUR_API_KEY",
});

const res = await client.getConsensusBlock();

console.log(res);
```

## Documentation & Resources

- [TONX API](https://tonxapi.com/)
- [API Documentation](https://docs.tonxapi.com/docs/welcome-to-ton-api)
- [TON APIs Reference Overview](https://docs.tonxapi.com/reference/ton-api-overview)
- [Quickstart Guide](https://docs.tonxapi.com/docs/ton-api-quickstart-guide)
- [Dashboard Overview](https://docs.tonxapi.com/docs/dashboard-overview)

## License

MIT
