import { useCart } from "../CartContext.jsx";
import { Header, Title, Navigation, Footer, SmallImage, CurrencyUS, MediumImage, currencyUS, PageLayout} from "../Components.jsx";
import { NavLink } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { createContext, useContext, useState, useEffect } from "react";

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
        <PageLayout title="Where To Ship">
            <Cart />
        </PageLayout>
    );
}

// CURRENTLY IDENTICAL TO CART PAGE, SHOULD BECOME ONLY ADDRESS FORM