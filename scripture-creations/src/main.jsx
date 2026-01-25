import {createRoot } from "react-dom/client"
import { StrictMode } from 'react'
import HomePage from "./HomePage";
import CartPage from "./CartPage";
import Checkout from "./lambda/fetchToken.jsx";
import { CartProvider } from "./CartContext.jsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import './styles.css';
import ContactPage from "./ContactPage.jsx";
import AboutPage from "./AboutPage.jsx";

export function Routing() {
    return (
      <Routes className="main-nav">
        <Route index element={<HomePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/token" element={<Checkout />}/> 
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