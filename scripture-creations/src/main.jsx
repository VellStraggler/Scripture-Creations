import {createRoot } from "react-dom/client";
import { CartProvider } from "./CartContext.jsx";
import { AddressProvider } from "./AddressContext.jsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react"; 
import './styles.css';
import './carousel.css';

import WelcomePage from "./pages/WelcomePage.jsx";

const ProductsPage = lazy(() => import("./pages/ProductsPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const AddressPage = lazy(() => import("./pages/AddressPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const SuccessPage = lazy(() => import("./pages/SuccessPage.jsx"));

const Checkout = lazy(() => import("./lambda/fetchToken.jsx"));

export function Routing() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
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