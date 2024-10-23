# TONX.js

A simple developer tool for Ton ecosystem which contains specialized function with [TONX](https://tonxapi.com/) rpc provider.

## Features

- TONX rpc method
- Signed typed data

## Install

```bash
npm install @tonx/core
```

If you want to use TONX's rich function to build up your dapp. You can [register](https://auth.tonxapi.com/signup) an account and get a free API key.

There are some basic structures for sdk development.

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

## Documents

[Documentation](https://docs.tonxapi.com/docs/welcome-to-tonxapi)

## License

MIT
