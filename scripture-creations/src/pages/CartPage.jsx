import { useCart } from "../CartContext.jsx";
import { useAddress } from "../AddressContext.jsx";
import { PageLayout, SmallImage, currencyUS } from "../Components.jsx";
import { NavLink } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from "react";

function AddressForms() {
  const { addressInfo, setEmail, setShippingInfo, setBillingInfo } = useAddress();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    shipping: { ...addressInfo.shippingInfoStr },
    billing: { ...addressInfo.billingInfoStr },
    email: addressInfo.email || ""
  });

  // Update context when local formData changes
  useEffect(() => {
    setEmail(formData.email);
    setShippingInfo(formData.shipping);
    setBillingInfo(formData.billing);
  }, [formData, setEmail, setShippingInfo, setBillingInfo]);

  return (
    <div className="addresses">
      <ReceiptEmail formData={formData} setFormData={setFormData} />
      <ShippingAddress formData={formData} setFormData={setFormData} />
      <BillingAddress formData={formData} setFormData={setFormData} />
    </div>
  );
}

function ReceiptEmail({ formData, setFormData, prefix}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [prefix]: {
        ...prev[prefix],
        [name]: value
      },
      ...(name === "email" ? { email: value } : {}) // update email if editing email field
    }));
  };
  return (
      <form>
          <h2>Email Address</h2>
          <div className="address">
            <div>
                <label>Email for Purchase Receipt</label>
                <input name="email" type="email" required 
                    value={formData[prefix]?.email || ""}
                    onChange={handleChange}/>
            </div>
          </div>
      </form>
  );
}

function AddressForm({ formData, setFormData, prefix }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [prefix]: {
        ...prev[prefix],
        [name]: value
      },
      ...(name === "email" ? { email: value } : {}) // update email if editing email field
    }));
  };

  return (
    <form>
      <div className="address">
        <div>
          <label>Addressed to (Name)</label>
          <input name="custName" type="text" required
            value={formData[prefix]?.custName || ""}
            onChange={handleChange} />
        </div>
        {/* <div>
          <label>Email</label>
          <input name="email" type="email" required
            value={formData.email || formData[prefix]?.email || ""}
            onChange={handleChange} />
        </div> */}
        <div>
          <label>Address Line 1</label>
          <input name="line1" type="text" required
            value={formData[prefix]?.line1 || ""}
            onChange={handleChange} />
        </div>
        <div>
          <label>Address Line 2</label>
          <input name="line2" type="text"
            value={formData[prefix]?.line2 || ""}
            onChange={handleChange} />
        </div>
        <div>
          <label>City</label>
          <input name="city" type="text" required
            value={formData[prefix]?.city || ""}
            onChange={handleChange} />
        </div>
        <div>
          <label>State</label>
          <input name="state" type="text" required
            value={formData[prefix]?.state || ""}
            onChange={handleChange} />
        </div>
        <div>
          <label>Zip Code</label>
          <input name="zip" type="text" required
            value={formData[prefix]?.zip || ""}
            onChange={handleChange} />
        </div>
      </div>
    </form>
  );
}

function ShippingAddress({ formData, setFormData }) {
  return (
    <div>
      <h2>Shipping Address</h2>
      <AddressForm prefix="shipping" formData={formData} setFormData={setFormData} />
    </div>
  );
}

function BillingAddress({ formData, setFormData }) {
  const [sameAsShipping, setSameAsShipping] = useState(false);

  useEffect(() => {
    if (sameAsShipping) {
      setFormData(prev => ({ ...prev, billing: { ...prev.shipping } }));
    }
  }, [sameAsShipping, setFormData, formData.shipping]);

  return (
    <div>
      <h2>Billing Address</h2>
      <label>Same as Shipping</label>
      <input type="checkbox" checked={sameAsShipping} onChange={e => setSameAsShipping(e.target.checked)} />
      {!sameAsShipping && (
        <AddressForm prefix="billing" formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
}

function CartItem({ p }) {
  const { adjustQuantity } = useCart();
  return (
    <li className="product-small">
      <SmallImage product={p} />
      <div className="prod-data">
        <div className="prod-info"><h4>{p.name}</h4></div>
        <div className="prod-button">
          {currencyUS(p.price)} x
          <input type="number" min="1" max="100" step="1" value={p.quantity}
            className="prod-quantity"
            onChange={(e) => {
              let newQuantity = Math.max(Math.min(100, Number(e.target.value)), 1);
              adjustQuantity(p, newQuantity);
            }} />
          <RemoveFromCart product={p} />
        </div>
      </div>
    </li>
  );
}

function RemoveFromCart({ product }) {
  const { removeFromCart } = useCart();
  return (
    <button type="button" onClick={() => removeFromCart(product)}>
      <FaTrash size={12} color="gray" />
    </button>
  );
}

function Cart() {
  const { cart, getSubTotal, getTotal, getTaxRatePrint } = useCart();
  const { isComplete } = useAddress();

  if (cart.length === 0) return <div className="text">Your cart is currently empty. Start shopping!</div>;

  return (
    <div>
      <ul>
        {cart.map(item => <CartItem p={item} key={item.id} />)}
      </ul>
      <div className="money-box">
        <div>Subtotal: {currencyUS(getSubTotal())}</div>
        <div>Tax Rate: {getTaxRatePrint()}</div>
        <h4>Total: {currencyUS(getTotal())}</h4>
      </div>
      <AddressForms />
      <div className="centered">
        <NavLink
          to="/token"
          className="nice-button"
          style={{
            pointerEvents: isComplete() ? "auto" : "none",
            opacity: isComplete() ? 1 : 0.5
          }}
        >
          Proceed to Checkout
        </NavLink>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <PageLayout title="Your Cart">
      <Cart />
    </PageLayout>
  );
}