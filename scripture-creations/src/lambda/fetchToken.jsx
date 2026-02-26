import { useEffect, useRef, useState } from "react";
import DropIn from "braintree-web-drop-in";
import { Header, Navigation, Footer, currencyUS, Title } from "../Components.jsx";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const {getTotal, getProductIds, getQuantities, getTaxRates} = useCart();
  const amt = getTotal();
  const productIds = getProductIds();
  const quantities = getQuantities();
  const taxRates = getTaxRates();
  const [clientToken, setClientToken] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Get Braintree token
  useEffect(() => {
    fetch(`${API_BASE}/token`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Received client token:", data.clientToken);
        setClientToken(data.clientToken);
      })
      .catch((err) => console.error("Token fetch error:", err));
  }, []);

  if (!clientToken) return <div className="container">Loading payment options...</div>;

  return <DropInWrapper 
    clientToken={clientToken} 
    amt={amt} 
    productIds={productIds}
    quantities={quantities}
    taxRates={taxRates}/>;
}

function DropInWrapper({ clientToken, amt, productIds, quantities, taxRates }) {
  const dropinContainer = useRef(null);
  const dropinInstance = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const {resetCart} = useCart();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
        dropinInstance.current
          .teardown()
          .catch(() => {});
        dropinInstance.current = null;
        console.log("Drop-In torn down");
      }
    };
  }, [clientToken]);

  // Send payment using token
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
        `${API_BASE}/purchase`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nonce, product_ids: productIds, quantities: quantities, tax_rates: taxRates, amount: amt }),
        }
      );

      const data = await res.json();
      if (data.success) {
        console.log("Transaction result:", data);
        alert("Payment successful");
        resetCart();
        useNavigate("/payment-success");
      } 
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
