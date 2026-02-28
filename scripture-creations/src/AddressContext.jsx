import { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [email, setEmail] = useState("");
  const [shippingInfoStr, setShippingInfo] = useState({
    custName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: ""
  });
  const [billingInfoStr, setBillingInfo] = useState({
    custName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: ""
  });

  // Persist to localStorage
  useEffect(() => {
    const data = { email, shippingInfoStr, billingInfoStr };
    localStorage.setItem("addressInfo", JSON.stringify(data));
  }, [email, shippingInfoStr, billingInfoStr]);

  // Helper to check if all required fields are filled
  const isComplete = () => {
    if (!email.trim()) return false;

    const checkFields = (obj) =>
      Object.entries(obj).every(([k, v]) => k !== "line2" ? v?.trim() !== "" : true);

    return checkFields(shippingInfoStr) && checkFields(billingInfoStr);
  };

  return (
    <AddressContext.Provider value={{
      addressInfo: { email, shippingInfoStr, billingInfoStr },
      setEmail,
      setShippingInfo,
      setBillingInfo,
      isComplete
    }}>
      {children}
    </AddressContext.Provider>
  );
}

// Custom hook to access the context
export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) throw new Error("useAddress must be used within an AddressProvider");
  return context;
}