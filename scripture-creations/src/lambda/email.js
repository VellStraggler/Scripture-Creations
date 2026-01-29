async function sendEmail() {

    await fetch("https://your-api.execute-api.amazonaws.com/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId,
            email: customerEmail,
            items: cart,
            subtotal,
            tax,
            total,
            shippingInfoStr,
            billingInfoStr
        })
    });
}
    