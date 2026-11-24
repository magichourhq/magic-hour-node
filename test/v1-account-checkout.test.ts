import { Client, Environment } from "magic-hour";

describe("tests client.v1.account.checkout.create", () => {
  test.concurrent(
    "POST /v1/account/checkout | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.account.checkout
          .create({ creditShortfall: 150.0, packCount: 3, type: "credit_pack" })
          .asResponse(),
        client.v1.account.checkout.create({
          creditShortfall: 150.0,
          packCount: 3,
          type: "credit_pack",
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
