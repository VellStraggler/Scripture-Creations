import braintree from "braintree";

// PURPOSE:
// Generate a client token for the front-end.
// Allows you to enter checkout with Braintree.

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export async function handler(event) {
    try {
        const response = await gateway.clientToken.generate({});
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clientToken: response.clientToken }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: e.message}),
        };
    }
}