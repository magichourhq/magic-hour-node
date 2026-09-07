# v1.account

## Module Functions

### Get account details <a name="list"></a>

Get the current credit balance and subscription details of the account that owns the API key.

**API Endpoint**: `GET /v1/account`

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.account.list();
```

#### Response

##### Type

[V1AccountListResponse](/src/types/v1-account-list-response.ts)

##### Example

```typescript
{"credits": 12500, "email": "user@example.com", "id": "cuid-example", "subscription": {"billingInterval": "month", "cancelAtPeriodEnd": false, "currentPeriodEnd": "2026-10-01T00:00:00.000Z", "discount": {"amountOff": 123, "percentOff": 20.0}, "name": "Pro", "price": {"amount": 4900, "currency": "usd"}, "status": "active"}, "tier": "pro"}
```
