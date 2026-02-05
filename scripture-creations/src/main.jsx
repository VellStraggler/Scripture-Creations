import {createRoot } from "react-dom/client";
import { CartProvider } from "./CartContext.jsx";
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

export function Routing() {
    return (
      <Routes className="main-nav">
        <Route index                element={<WelcomePage/>}/>
        <Route path="/products"     element={<ProductsPage/>}/>
        <Route path="/products/:productId" element={<ProductPage/>}/>
        <Route path="/cart"         element={<CartPage/>}/>
        <Route path="/address"      element={<AddressPage/>}/>
        <Route path="/about"        element={<AboutPage />}/> 
        <Route path="/token"        element={<Checkout />}/> 
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