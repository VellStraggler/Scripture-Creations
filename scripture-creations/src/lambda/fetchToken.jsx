import { useEffect, useRef, useState } from "react";
import DropIn from "braintree-web-drop-in";
import { Header, Navigation, Footer, currencyUS, Title } from "../Components.jsx";
import { useCart } from "../CartContext";

export default function Checkout() {
  const {getSubTotal} = useCart();
  const amt = getSubTotal();
  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    fetch("https://hxvuuzq676.execute-api.us-east-2.amazonaws.com/token")
      .then((res) => res.json())
      .then((data) => {
        console.log("Received client token:", data.clientToken);
        setClientToken(data.clientToken);
      })
      .catch((err) => console.error("Token fetch error:", err));
  }, []);

  if (!clientToken) return <div className="container">Loading payment options...</div>;

  return <DropInWrapper clientToken={clientToken} amt={amt} />;
}

function DropInWrapper({ clientToken, amt }) {
  const dropinContainer = useRef(null);
  const dropinInstance = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!clientToken) return;

    console.log("Mounting Braintree Drop-In...");
    DropIn.create(
      {
        authorization: clientToken,
        container: dropinContainer.current,
      },
      (err, instance) => {
        if (err) {
          console.error("Drop-In create error:", err);
          return;
        }
        dropinInstance.current = instance;
        setReady(true);
        console.log("Drop-In mounted successfully");
      }
    );

    return () => {
      if (dropinInstance.current) {
        dropinInstance.current.teardown().then(() => console.log("Drop-In torn down"));
      }
    };
  }, [clientToken]);

  async function handlePay() {
    if (!dropinInstance.current) {
      console.error("Drop-In not ready yet");
      return;
    }
    try {
      setLoading(true);
      const { nonce } = await dropinInstance.current.requestPaymentMethod();
      console.log("Payment method nonce:", nonce);

      const res = await fetch(
        "https://hxvuuzq676.execute-api.us-east-2.amazonaws.com/purchase",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nonce, amount: amt }),
        }
      );

      const data = await res.json();
      console.log("Transaction result:", data);
      if (data.success) alert("Payment successful");
      else console.error("Payment failed", data);
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Title text="Checkout"/>
      <div className="content">
        <div ref={dropinContainer} />
          <div className="prod-button">
            <button onClick={handlePay} disabled={loading || !ready}>
              Pay {currencyUS(amt)}
            </button>
          </div>
      </div>
      <Footer />
    </div>
  );
}
