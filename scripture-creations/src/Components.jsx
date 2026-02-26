import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "./CartContext";
import { NavLink } from "react-router-dom";
import sendIcon from "./assets/send_icon.png";
import { useEffect, useRef, useState } from "react";
import products from './catalog.json';

export function AddToCartButton({product, quantity, plus=false}) {
    const { addToCart } = useCart();
    const text = plus ? <h1>+</h1> : "Add to Cart";
    return (
        <button type="button" onClick={() => {
            addToCart(product, quantity);
            showToast(`${quantity} items added to cart`);
        }}>{text}</button>
    );
}

export function PageLayout({title, children}) {
    return (
        <div className="container">
            <Header/>
            <Navigation />
            <div className="content">
                {(title != null) &&
                <Title text={title}/>}
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export function DivDown({children}) {
    return (
        <div className="div-down">
            {children}
        </div>
    )
}
export function DivCols({children}) {
    return (
        <div className="div-cols">
            {children}
        </div>
    )
}

export function Title({text}) {
    return (
        <h1 className='title'>{text}</h1>
    );
}
export function CurrencyUS({price}) {
    const currencyPrice = currencyUS(price);
    return (
        <div className="currency">
            <h4>{currencyPrice.charAt(0)}</h4>
            <h2>{currencyPrice.slice(1, currencyPrice.indexOf("."))}</h2>
            <h4>{currencyPrice.slice(currencyPrice.indexOf("."))}</h4>
        </div>
    );
}
export function currencyUS(price) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
}
export function roundCurrency(amt) {
    return Number((Math.round(amt*100))/100).toFixed(2);
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

function Contact() {
    const formRef = useRef(null);
    const [formSent, setFormSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); //no redirect!
        const form = formRef.current;
        const data = new FormData(form);

        const result = await fetch("https://formspree.io/f/xkoonvej", {
            method: "POST",
            body: data,
            headers: {
                Accept: "applications/json"
            }
        });

        if (result.ok) {
            form.reset();
            setFormSent(true);
        }
    }

    const handleReset = () => {
        setFormSent(false);
        formRef.current?.reset();
    }

    const FormContents = () => {
        return (
            <form className="form-section"
                action="https://formspree.io/f/xkoonvej"
                method="POST"
                ref={formRef}
                onSubmit={handleSubmit}>
                <DivDown>
                    <div className="email-section">
                        <label>Your email</label>
                        <input type="email" name="email" required/>
                    </div>
                    <label>Your message</label>
                    <textarea name="message" rows="3" required ></textarea>
                </DivDown>
                <div>
                    <button type="submit" title="Powered by Formspree">
                        <h3>
                        Send
                        </h3>
                        <span className="expanding-dots">
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                        </span>
                        <img src={sendIcon} height="24px"></img>
                    </button>
                </div>
            </form>
        );
    }
    
    return (
        <div className="contact">
            <div className="contact-head">
                Your feedback is important to us, as are your questions. We often
                respond within 48 hours and will help in any way we can!
            </div>

            <div className="form-wrapper">
                <FormContents/>

                {formSent && (
                    <div className="form-section-overlay">
                        <h2>Thanks for submitting!</h2>
                        <button className="nice-button"
                            onClick={handleReset}
                            >
                            Send something else?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export function getProductImageUrl(product) {
    return getImageUrl(`products/${product.image}`);
}
export function getImageUrl(img) {
    return `${import.meta.env.BASE_URL}images/${img}`;
}

export function LargeImage({product}) {
    return (
        <div className="prod-img-large">
            <img src={getProductImageUrl(product)} alt={product.name}></img>
        </div>
    );
}
export function MediumImage({product}) {
    return (
        <div className="prod-img">
            <img src={getProductImageUrl(product)} alt={product.name}></img>
        </div>
    );
}
export function SmallImage({product}) {
    return (
        <div className="prod-img-small">
            <img src={getProductImageUrl(product)} alt={product.name}></img>
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

export function getCategories() {
    let categories = new Set();
    products.forEach(product => {
        categories.add(product.category);
    });
    categories = [...categories];
    return categories;
}

export function toCapitalized(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Navigation() {
    const categories = getCategories();

    return (
    <div className="nav-container">
      <nav className="main-nav">
        <NavLink to="/products" className="nav-link">All Products</NavLink>
        {categories.map(category => (
            <NavLink key={category} to={`/categories/${category}`} className = "nav-link">
                {toCapitalized(category)}
            </NavLink>
        ))}
        <NavLink to="/about"    className="nav-link">About Us</NavLink>
      </nav>
    </div>
    );
}

export function Footer() {
    return (
        <footer>
            <Contact/>
            <div className="footer-text">
                <NavLink 
                    to="/about" 
                    onClick={() => window.scrollTo(0, 0)}>
                    About Us
                </NavLink>
                Located in Lindon, UT, USA
                <a href="https://www.etsy.com/shop/ScriptureCreateLLC">View Our Etsy Page</a>
                © 2026 Scripture Creations LLC. All images are protected by copyright. Unauthorized use is prohibited.
            </div>
        </footer>
    );
}