import products from './catalog.json';
import { useCart } from "./CartContext.jsx";
import { useState } from "react";
import { PageLayout, CurrencyUS, MediumImage, showToast } from './Components.jsx';

function Product({p}) {
    const [quantity, setQuantity] = useState(1);
    return (
        <li className="product">
            <MediumImage product={p} />
            <div className="prod-data">
                <div className="prod-info">
                    <h2>{p.name}</h2>
                    <p>{p.Description}</p>
                    <CurrencyUS price={p.price} />
                </div>
                <div className="prod-button">
                    Quantity:
                    <input type="number" min="1" step="1" max="100" value={quantity} 
                        pattern="[0-9]*" className="prod-quantity" onChange={(e) => {
                            let val = Number(e.target.value);
                            val = Math.min(100, val);
                            setQuantity((val >= 1) ? val : 1);
                        }}></input>
                    <AddToCartButton product={p} quantity={quantity}/>
                </div>
            </div>
        </li>
    );
}

function AddToCartButton({product, quantity}) {
    const { addToCart } = useCart();
    return (
        <button type="button" onClick={() => {
            addToCart(product, quantity);
            showToast(`${quantity} items added to cart`);
        }}>Add to Cart</button>
    );
}

function ProductList() {
    return (
        <ul>
            {products.map(product => (
                <Product key={product.id} p={product}/>))}
        </ul>
    );
}

export default function ProductsPage() {
    return (
        <PageLayout title="Products Page" SubPage={ProductList}/>
    );
}