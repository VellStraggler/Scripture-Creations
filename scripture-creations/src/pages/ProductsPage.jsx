import products from '../catalog.json';
import { useState } from "react";
import {useParams} from "react-router-dom";
import { PageLayout, CurrencyUS, MediumImage, getCategories, showToast, AddToCartButton } from '../Components.jsx';
import { Link } from "react-router";


function Product({p}) {
    const descriptionShort = p.description.length < 100 ? p.description : p.description.slice(0, 100) + "...";

    return (
        <li className="product">
            <Link to={`/products/${p.id}`}>
                <MediumImage product={p} />
            </Link>
            <div className="prod-data">
                <Link to={`/products/${p.id}`}>
                    <div className="prod-info">
                        <h2>{p.name}</h2>
                        <p>{descriptionShort}</p>
                    </div>
                </Link>
                <div className="prod-button-simple">
                    <CurrencyUS price={p.price} />
                    <AddToCartButton product={p} quantity={1} plus={true}/>
                </div>
            </div>
        </li>
    );
}

function ProductList({category}) {
    let count = products.filter(product => (product.category === category || category==null)).length;
    return (
        <div>
            <ul className="products">
                {products.filter(product => (product.category === category || category==null))
                    .map(product => (
                        <Product key={product.id} p={product}/>))}
            </ul>
            <div className="page-bottom-desc">showing 1-{count} of {count} products</div>
        </div>
    );
}

export default function ProductsPage() {
    const {category} = useParams();
    const title = (category==null) ? "Products Page" : category + " Products"
    return (
        <PageLayout title={title} description="All our products. All in one place.">
            <ProductList category={category}/>
        </PageLayout>
    );
}