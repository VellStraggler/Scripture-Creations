import {useParams} from "react-router-dom";
import products from '../catalog.json';
import { useState } from "react";
import { Link } from "react-router";
import { PageLayout, CurrencyUS, LargeImage, showToast, AddToCartButton, DivCols } from '../Components.jsx';

function ProductPageLinks({product}) {
    return (
        <div className="product-page-links">
            <Link to="/products">
                Products
            </Link>
            {" > "}
            <Link to={`/categories/${product.category}`}>
                {product.category}
            </Link> 
            {" > "}
            <Link to={`/products/${product.id}`}>
                {product.name}
            </Link>
        </div>
    );
}

function ProductSubPage({product}) {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="product-page">
            <ProductPageLinks product={product}/>
            <div className="product-large">
                    <DivCols>

                        <LargeImage product={product} />
                        <div className="prod-data">
                            <div className="prod-info">
                                <h2>{product.name}</h2>
                                <CurrencyUS price={product.price} />
                            </div>
                            <div className="prod-button">
                                Amount:
                                <input type="number" min="1" step="1" max="100" value={quantity} 
                                    pattern="[0-9]*" className="prod-quantity" onChange={(e) => {
                                        let val = Number(e.target.value);
                                        val = Math.min(100, val);
                                        setQuantity((val >= 1) ? val : 1);
                                    }}></input>
                                <AddToCartButton product={product} quantity={quantity}/>
                            </div>
                        </div>
                    </DivCols>
                </div>
                <div className="large-desc">
                    <h2>About this Product</h2>
                    <p>{product.description}</p>
                </div>
        </div>
    );
}

export default function ProductPage() {
    const {productId} = useParams();

    const product = products.find(p => String(p.id) === String(productId));

    if (!product) {
        return <PageLayout>Product not found</PageLayout>;
    }
    return (
        <PageLayout>
            <ProductSubPage product={product} />
        </PageLayout>
    );
}