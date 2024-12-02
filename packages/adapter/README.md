# @tonx/adapter

The TONX.js Adapter allows for an easy transition from popular TON client libraries like [@ton/ton](https://github.com/ton-org/ton), [TonWeb](https://github.com/toncenter/tonweb), and [TonClient4](https://github.com/ton-org/ton/blob/master/src/client/TonClient4.ts). With minimal code changes, you can migrate your project to the [TONX API](https://tonxapi.com/) effortlessly.

Already using existing TON APIs like Ton Center? Migrate to [TONX API](https://tonxapi.com/) effortlessly.

_P.S. Our RESTful migration API is also coming soon—[contact us](https://tonxapi.com/contact-sales) if you'd prefer to migrate that way._

## Features
- Integration with [TONX.js SDK (@tonx/core)](https://www.npmjs.com/package/@tonx/core)
- Compatibility with [@ton/ton](https://github.com/ton-org/ton), [TonWeb](https://github.com/toncenter/tonweb), and [TonClient4](https://github.com/ton-org/ton/blob/master/src/client/TonClient4.ts)
- JSON-RPC method powered by the TONX Supernode with 99.99% uptime, precise indexing, and ultra-low latency
- Full coverage of [TONX API](https://tonxapi.com/) endpoints

## Usage

Before using it, you will need to get a key from TONX API.

### ton/core

```js
import { ToncoreAdapter } from "@tonx/adapter";

const client = new ToncoreAdapter({
  network: "mainnet",
  apiKey: "YOUR_API_KEY",
});
```

### tonweb

```js
import { TonWebAdapter } from "@tonx/adapter";

const client = new TonWebAdapter({
  network: "mainnet",
  apiKey: "YOUR_API_KEY",
});
```

### TonClient4

```js
import { TonClient4Adapter } from "@tonx/adapter";

const client = new TonClient4Adapter({
  network: "mainnet",
  apiKey: "YOUR_API_KEY",
});
```

## Documentation & Resources
- [TONX API](https://tonxapi.com/)
- [API Documentation](https://docs.tonxapi.com/docs/welcome-to-ton-api)
- [TON APIs Reference Overview](https://docs.tonxapi.com/reference/ton-api-overview)
- [Quickstart Guide](https://docs.tonxapi.com/docs/ton-api-quickstart-guide)
- [Dashboard Overview](https://docs.tonxapi.com/docs/dashboard-overview)