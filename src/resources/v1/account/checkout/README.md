# v1.account.checkout

## Module Functions

### Create checkout <a name="create"></a>

Create a Stripe Checkout link for the account that owns the API key. Nothing is charged until the checkout is completed in a browser.

**API Endpoint**: `POST /v1/account/checkout`

#### Parameters

| Parameter         | Required | Description                                                                                                                                                 | Example         |
| ----------------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `type`            |    ✓     | What to buy. `credit_pack` is a one-time credit purchase.                                                                                                   | `"credit_pack"` |
| `creditShortfall` |    ✗     | Credits a blocked request is missing, e.g. `credit_shortfall` from a 402 response. The checkout starts with enough packs to cover it. Defaults to one pack. | `150.0`         |
| `packCount`       |    ✗     | Number of credit packs the checkout starts with. Takes priority over `credit_shortfall`.                                                                    | `3`             |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.account.checkout.create({
  creditShortfall: 150.0,
  packCount: 3,
  type: "credit_pack",
});
```

#### Response

##### Type

[V1AccountCheckoutCreateResponse](/src/types/v1-account-checkout-create-response.ts)

##### Example

```typescript
{"checkoutUrl": "https://pay.magichour.ai/c/pay/cs_live_..."}
```
