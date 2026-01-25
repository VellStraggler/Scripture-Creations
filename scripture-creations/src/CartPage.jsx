import { useCart } from "./CartContext";
import { Header, Title, Navigation, Footer, SmallImage, CurrencyUS, MediumImage, currencyUS} from "./Components.jsx";
import { NavLink } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';

const lambdaUrl = "https://hxvuuzq676.execute-api.us-east-2.amazonaws.com/token/";

function CartItem({p}) {
    const { adjustQuantity } = useCart();
    return (
        <li className="product-small">
            <SmallImage product={p} />
            <div className="prod-data">
                <div className="prod-info">
                    <h2>{p.name}</h2>
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
    const { cart, getSubTotal } = useCart();
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
            <div className="centered">
                <h2>Subtotal: {currencyUS(getSubTotal(cart))}</h2>
                <NavLink to="/token" className="nice-button">Proceed to Checkout</NavLink>
            </div>
        </div>
    );
}

export default function CartPage() {
    return (
        <div className="container">
            <Header/>
            <Navigation />
            <Title text="Your Cart"/>
            <div className="content">
                <Cart/>
            </div>
            <Footer/>
        </div>
    );
}