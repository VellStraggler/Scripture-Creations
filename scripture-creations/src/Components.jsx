import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "./CartContext";
import { NavLink } from "react-router-dom";

export function Title({text}) {
    return (
        <h1 className='title'>{text}</h1>
    );
}
export function CurrencyUS({price}) {
    const currencyPrice = currencyUS(price);
    return (
        <p>
            {currencyPrice}
        </p>
    );
}
export function currencyUS(price) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
}

export function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    // Force reflow so the transition applies
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    // Hide after duration
    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hide");

        // Remove from DOM after fade completes
        toast.addEventListener("transitionend", () => {
            toast.remove();
        }, { once: true });
    }, duration);
}


export function MediumImage({product}) {
    return (
        <div className="prod-img">
            <img src={`${import.meta.env.BASE_URL}images/products/${product.image}`} alt={product.name}></img>
        </div>
    );
}
export function SmallImage({product}) {
    return (
        <div className="prod-img-small">
            <img src={`${import.meta.env.BASE_URL}images/products/${product.image}`} alt={product.name}></img>
        </div>
    );
}

export function Header() {
    const { cart, getTotalQuantity } = useCart();

    return (
        <header className="site-header">
            <NavLink to="/" title="Home Page">
                <img src={`${import.meta.env.BASE_URL}images/other/logolong.gif`} alt="Scripture Creations Logo" height="50px"/>
            </NavLink>
            <div className="header-edge">
                {/* <a href="sign-in.html">Sign In</a> */}
                <div className="cart-section">
                    <NavLink title={`View Cart (${cart.length} items)`} to="/cart" className="nice-button">
                        <FaShoppingCart size={24} color="black" />
                        {getTotalQuantity()}
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
export function Navigation() {
    return (
      <nav className="main-nav">
        <NavLink to="/" className="nav-link">
            Home
        </NavLink>
        <NavLink to="/about" className="nav-link">About Us</NavLink>
        <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
        <NavLink to="/cart" className="nav-link">
            Your Cart
        </NavLink>
      </nav>
    );
}

export function Footer() {
    return (
        <footer>
            Scripture Creations LLC, 2026
        </footer>
    );
}