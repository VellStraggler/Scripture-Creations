import { useCart } from "./CartContext.jsx";
import { Header, Title, Navigation, Footer, SmallImage, CurrencyUS, MediumImage, currencyUS, PageLayout} from "./Components.jsx";
import { NavLink } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { createContext, useContext, useState, useEffect } from "react";

const lambdaUrl = "https://hxvuuzq676.execute-api.us-east-2.amazonaws.com/token/";
const tax = 0.03;

function AddressForms() {
    const [formData, setFormData] = useState({ shipping:{}, billing:{}});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final JSON: ", JSON.stringify(formData));
        // FIXME: Eventual lambda endpoint request
    };

    return (
        <div className="addresses">
            <ShippingAddress formData={formData} setFormData={setFormData} />
            <BillingAddress formData={formData} setFormData={setFormData} />

            <button onClick={handleSubmit}>Submit Form</button>
        </div>
    );
}

function AddressForm({ formData, setFormData, prefix }) {

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [prefix]: {
                ...prev[prefix],
                [name]: type === "checkbox" ? checked : value
            }
        }));
    };

    return (
        <form>
            <div className="address">
                <div>
                    <label>Addressed to (Name)</label>
                    <input name="custName" type="text" required 
                        value={formData[prefix]?.custName || ""}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" type="email" required 
                        value={formData[prefix]?.email || ""}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Address Line 1</label>
                    <input name="line1" type="text" required 
                        value={formData[prefix]?.line1 || ""}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Address Line 2</label>
                    <input name="line2" type="text" 
                        value={formData[prefix]?.line2 || ""}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>City</label>
                    <input name="city" type="text" required 
                        value={formData[prefix]?.city || ""}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>State</label>
                    <input name="state" type="text" required 
                        value={formData[prefix]?.state || ""}
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Zip Code</label>
                    <input name="zip" type="number" value={formData[prefix]?.zip || ""}
                        onChange={handleChange}/>
                </div>
                </div>

        </form>
    );
}

function ShippingAddress({ formData, setFormData}) {
    return (
        <div>
            <h2>Shipping Address</h2>
            <AddressForm prefix="shipping" formData={formData}
                setFormData={setFormData}/>
        </div>
    );
}
function BillingAddress({ formData, setFormData }) {
    const [sameAsShipping, setSameAsShipping] = useState(false);

    // Copy data from shipping info if checked as equal
    useEffect(() => {
        if (sameAsShipping) {
            setFormData(prev => ({ ...prev, billing: { ...prev.shipping } }));
        }
    }, [sameAsShipping]);

    return (
        <div>
            <h2>Billing Address</h2>
            <label>Same as Shipping</label>
            <input type="checkbox" onChange={e => setSameAsShipping(e.target.checked)}/>
            {!sameAsShipping && (
                <AddressForm prefix="billing" formData={formData} setFormData={setFormData}/>
            )}
        </div>
    );
}

function CartItem({p}) {
    const { adjustQuantity } = useCart();
    return (
        <li className="product-small">
            <SmallImage product={p} />
            <div className="prod-data">
                <div className="prod-info">
                    <h4>{p.name}</h4>
                </div>
                <div className="prod-button">
                    {currencyUS(p.price)} x
                    <input type="number" min="1" step="1" max="100" value={p.quantity} 
                        pattern="[0-9]*" className="prod-quantity" onChange={(e) => {
                            let newQuantity = Number(e.target.value);
                            newQuantity = Math.max(Math.min(100, newQuantity),1);
                            adjustQuantity(p, newQuantity);
                        }}></input>
                    <RemoveFromCart product={p}/>
                </div>
            </div>
        </li>
    );
}

function RemoveFromCart({product}) {
    const { removeFromCart } = useCart();
    return (
        <button type="button" onClick={() => removeFromCart(product)}>
            <FaTrash size={12} color="gray" />
        </button>
    );
}

function Cart() {
    const { cart, getSubTotal, getTotal, getTaxRate } = useCart();
    if (cart.length == 0) {
        return (
            <div className="text">
                Your cart is currently empty. Start shopping!
            </div>
        )
    }

    return (
        <div>
            <ul>
                {cart.map((item, index) => (
                    <CartItem p={item} index={index} key={item.id}/>
                ))}
            </ul>
            <div>
                <div className="money-box">
                    <div>Subtotal: {currencyUS(getSubTotal(cart))}</div>
                    <div>Tax Rate: {getTaxRate(cart)*100}%</div>
                    <h4>Total:    {currencyUS(getTotal(cart))}</h4>
                </div>
                <AddressForms />
                <div className="centered">
                    <NavLink to="/token" className="nice-button">Proceed to Checkout</NavLink>
                </div>
            </div>
        </div>
    );
}

export default function AddressPage() {
    return (
        <PageLayout title="Where To Ship" SubPage={Cart}/>
    );
}

// CURRENTLY IDENTICAL TO CART PAGE, SHOULD BECOME ONLY ADDRESS FORM