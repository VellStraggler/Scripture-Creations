import {createRoot } from "react-dom/client";
import { CartProvider } from "./CartContext.jsx";
import { AddressProvider } from "./AddressContext.jsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import './styles.css';
import './carousel.css';

import WelcomePage from "./pages/WelcomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage";
import AddressPage from "./pages/AddressPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Checkout from "./lambda/fetchToken.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

export function Routing() {
    return (
      <Routes className="main-nav">
        <Route index                        element={<WelcomePage/>}/>
        <Route path="/products"             element={<ProductsPage/>}/>
        <Route path="/products/:productId"  element={<ProductPage/>}/>
        <Route path="/categories/:category" element={<ProductsPage/>}/>
        <Route path="/cart"                 element={<CartPage/>}/>
        <Route path="/address"              element={<AddressPage/>}/>
        <Route path="/about"                element={<AboutPage/>}/> 
        <Route path="/token"                element={<Checkout/>}/> 
        <Route path="/success"              element={<SuccessPage/>}/> 
      </Routes>
    );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/Scripture-Creations/">
      <CartProvider>
        <AddressProvider>

            <Routing/>

        </AddressProvider>
      </CartProvider>
  </BrowserRouter>);