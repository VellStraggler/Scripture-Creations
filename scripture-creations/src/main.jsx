import {createRoot } from "react-dom/client";
import { CartProvider } from "./CartContext.jsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import './styles.css';

import WelcomePage from "./WelcomePage.jsx";
import ProductsPage from "./ProductsPage.jsx";
import CartPage from "./CartPage";
import AddressPage from "./AddressPage.jsx";
import ContactPage from "./ContactPage.jsx";
import Checkout from "./lambda/fetchToken.jsx";
import AboutPage from "./AboutPage.jsx";

export function Routing() {
    return (
      <Routes className="main-nav">
        <Route index            element={<WelcomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/cart"     element={<CartPage/>}/>
        <Route path="/address"  element={<AddressPage/>}/>
        <Route path="/contact"  element={<ContactPage/>}/>
        <Route path="/about"    element={<AboutPage />}/> 
        <Route path="/token"    element={<Checkout />}/> 
      </Routes>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(
        <BrowserRouter basename="/Scripture-Creations/">
            <CartProvider>
                <Routing/>
            </CartProvider>
        </BrowserRouter>);