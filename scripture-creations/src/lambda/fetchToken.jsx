import { useEffect, useRef, useState } from "react";
import DropIn from "braintree-web-drop-in";
import { Header, Navigation, Footer, currencyUS, Title } from "../Components.jsx";
import { useCart } from "../CartContext";
import { useAddress } from "../AddressContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const {getTotal, getProductIds, getQuantities} = useCart();
  const amt = getTotal();
  const productIds = getProductIds();
  const quantities = getQuantities();
  const [clientToken, setClientToken] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const {addressInfo} = useAddress();

  // Get Braintree token
  useEffect(() => {
    fetch(`${API_BASE}/token`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Received client token:", data.clientToken);
        setClientToken(data.clientToken);
      })
      .catch((err) => console.error("Token fetch error:", err));
  }, []);

  if (!clientToken) return <div className="container"><div className="title-basic">Loading payment options...</div></div>;

  return <DropInWrapper 
    clientToken={clientToken} 
    amt={amt} 
    productIds={productIds}
    quantities={quantities}
    addressInfo={addressInfo}/>;
}

function DropInWrapper({ clientToken, amt, productIds, quantities, addressInfo}) {
  const dropinContainer = useRef(null);
  const dropinInstance = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const {resetCart} = useCart();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

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
    alert("HANDLE PAY FIRED");

    if (loading) return;
    alert("HANDLE PAY FINISHED LOADING");
    if (!dropinInstance.current) {
      console.error("Braintree Drop-In instance is not available");
      return;
    }
  
    try {
      setLoading(true);
  
      console.log("1. Starting payment");
  
      console.log("2. Requesting Braintree payment method...");
      const paymentMethod = await dropinInstance.current.requestPaymentMethod();
  
      console.log("3. Braintree payment method returned:", paymentMethod);
  
      const { nonce } = paymentMethod;
  
      console.log("4. Nonce received:", nonce ? "YES" : "NO");
  
      console.log("5. Sending /purchase request...");
  
      const res = await fetch(`${API_BASE}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nonce,
          product_ids: productIds,
          quantities: quantities,
          amount: amt,
          addressInfo: addressInfo,
        }),
      });
  
      console.log("6. /purchase response received");
      console.log("HTTP status:", res.status);
      console.log("HTTP status text:", res.statusText);
  
      const data = await res.json();
  
      console.log("7. /purchase response JSON:", data);
  
      if (res.ok && data.success) {
        console.log("8. Payment successful");
  
        resetCart();
        navigate("/success");
      } else {
        console.error("Payment failed:", data);
      }
  
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
    } finally {
      console.log("9. Payment handler finished");
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Title text="Checkout"/>
      <div className="content">
        {!loading ? (
          <>
          <div ref={dropinContainer} />
            <div className="prod-button">
              <button onClick={handlePay} disabled={loading || !ready}>
                Pay {currencyUS(amt)}
              </button>
            </div>
          </>
        ) : (
          <div className="title-basic">
            Processing payment...
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
