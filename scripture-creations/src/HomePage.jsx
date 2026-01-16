import {FaShoppingCart} from 'react-icons/fa';
import products from './catalog.json';

function NavItem({href, label}) {
    return (
        <a href={href} className="nav-link">
            {label}
        </a>
    );
}

function Header() {
    return (
        <header className="site-header">
            <img src="images/other/logolong.gif" alt="Scripture Creations Logo" height="50px"/>
            <div className="header-edge">
                <a href="sign-in.html">Sign In</a>
                <div className="cart-section">
                    <FaShoppingCart size={24} color="black" />
                    1
                </div>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer>
            Scripture Creations LLC, 2026
        </footer>
    );
}

function MissionStatement() {
    return (
        <div className="text">
            <h3><em>"Strengthening Families in Jesus Christ"</em></h3>
            <h2>Mission Statement:</h2>
            <h3>
            To create and distribute products that will strengthen the knowledge
            and testimonies of those who use them and move the work of the Lord
            forward in new and creative ways.
            </h3>
        </div>
    );
}

function Product({p}) {
    return (
        <li key={p.id} className="product">
            <div className="prod-img">
                <img src={`images/products/${p.image}`} alt={p.name}></img>
            </div>
            <div className="prod-data">
                <div className="prod-info">
                    <h2>{p.name}</h2>
                    <p>{p.Description}</p>
                    <p>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(p.price)}</p>
                </div>
                <div className="prod-button">
                    <button>Add to Cart</button>
                </div>
            </div>
        </li>
    );
}

function ProductList() {
    return (
        <ul>
            {products.map(product => (
                <Product p={product} />
            ))}
        </ul>
    );
}

function Navigation() {
    return (
      <nav className="main-nav">
        <NavItem href="/catalog.pdf" label="Products" />
        <NavItem href="/info.html" label="About Us" />
        <NavItem href="/links.html" label="LDS Links" />
        <NavItem href="/order.html" label="Order Form" />
      </nav>
    );
}

export default function HomePage() {
    return (
        <div className="container">
            <Header />
            <Navigation />
            <div className="content">
                <ProductList />
                <MissionStatement />
            </div>
            <Footer/>
        </div>
    );
}