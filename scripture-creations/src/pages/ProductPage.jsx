import {useParams} from "react-router-dom";
import products from '../catalog.json';
import { useState } from "react";
import { PageLayout, CurrencyUS, MediumImage, showToast, AddToCartButton } from '../Components.jsx';

function ProductPageLinks({product}) {
    return (
        <div>
            products {">"} categories {">"} {product.category} {">"} {product.name}
        </div>
    );
}

function ProductSubPage({product}) {
    const [quantity, setQuantity] = useState(1);
    return (
        <div>
            <ProductPageLinks product={product}/>
            <div className="product">
                <MediumImage product={product} />
                <div className="prod-data">
                    <div className="prod-info">
                        <h2>{product.name}</h2>
                        <CurrencyUS price={product.price} />
                    </div>
                    <div className="prod-button">
                        Buy:
                        <input type="number" min="1" step="1" max="100" value={quantity} 
                            pattern="[0-9]*" className="prod-quantity" onChange={(e) => {
                                let val = Number(e.target.value);
                                val = Math.min(100, val);
                                setQuantity((val >= 1) ? val : 1);
                            }}></input>
                        <AddToCartButton product={product} quantity={quantity}/>
                    </div>
                </div>
            </div>
                <h2>About this Product</h2>
                <p>{product.Description}</p>
        </div>
    );
}

export default function ProductPage() {
    const {productId} = useParams();

    const product = products.find(p => p.id === productId);

    if (!product) {
        return <PageLayout>Product not found</PageLayout>;
    }
    return (
        <PageLayout>
            <ProductSubPage product={product} />
        </PageLayout>
    );
}