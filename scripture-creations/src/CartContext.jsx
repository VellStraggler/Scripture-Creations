import { createContext, useContext, useState, useEffect } from "react";
import { roundCurrency } from "./Components";

const CartContext = createContext();
const taxRate = 0.07; //a constant in AWS Lambda

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try { 
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Persist on every change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newProduct, quantity=1) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === newProduct.id);

            if (existing) {
                return prev.map(p =>
                    p.id === newProduct.id
                        ? { ...p, quantity: p.quantity + quantity}
                        : p
                );
            }
            return [...prev, { ...newProduct, quantity: quantity}]
        });
    };
    const adjustQuantity = (newProduct, quantity=1) => {
        quantity = Number(quantity);
        setCart(prev => {
            const existing = prev.find(p => p.id === newProduct.id);

            if (existing) {
                return prev.map(p =>
                    p.id === newProduct.id
                        ? { ...p, quantity: quantity}
                        : p
                );
            }
            return [...prev, { ...newProduct, quantity: quantity}]
        });
    };
    const resetCart = () => {
        setCart([]);
    }

    const removeFromCart = (badProduct) => {
        setCart(prev => prev.filter(p => p.id !== badProduct.id));
    }

    const getTotalQuantity = () => {
        let quantity = 0.0;
        cart.forEach(item => {
            quantity += (Number(item.quantity));
        });
        return quantity;
    }

    const getSubTotal = () => {
        let subTotal = 0.0;
        cart.forEach(item => {
            subTotal += (Number(item.price) * Number(item.quantity));
        });
        return subTotal;
    }
    const getProductIds = () => {
        let productIds = [];
        cart.forEach(item => {
            productIds.push(item.id)
        });
        return productIds;
    }
    const getQuantities = () => {
        let quantities = [];
        cart.forEach(item => {
            quantities.push(item.quantity);
        })
        return quantities;
    }
    const getTaxRates = () => {
        let taxRates = [];
        cart.forEach(_ => {
            taxRates.push(taxRate);
        });
        return taxRates;
    }


    const getTaxRate = () => {
        return taxRate;
    }
    const getTaxRatePrint = () => {
        return (roundCurrency(getTaxRate(cart)*100)) + "%";
    }
    const getTotal = () => {
        return roundCurrency(getSubTotal()*(1+taxRate));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, resetCart, getSubTotal, 
        removeFromCart, getTaxRatePrint, adjustQuantity, getTotalQuantity, getTotal, getTaxRate,
        getProductIds, getQuantities, getTaxRates }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
