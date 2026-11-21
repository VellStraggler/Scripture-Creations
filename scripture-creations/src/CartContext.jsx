import { createContext, useContext, useState, useEffect } from "react";
import { roundCurrency } from "./Components";
import { calculateShipping, isValidShippingConfig } from "./shipping";

const CartContext = createContext();
const taxRate = 0.07; //a constant in AWS Lambda

export function CartProvider({ children }) {
    const [shippingConfig, setShippingConfig] = useState(null);
    const [shippingStatus, setShippingStatus] = useState("loading");
    const [shippingAttempt, setShippingAttempt] = useState(0);
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

    useEffect(() => {
        const controller = new AbortController();
        fetch(`${import.meta.env.VITE_API_BASE_URL}/shipping-rates`, { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error("Could not load shipping rates");
                return response.json();
            })
            .then(config => {
                if (!isValidShippingConfig(config)) throw new Error("Invalid shipping rates");
                setShippingConfig(config);
                setShippingStatus("ready");
            })
            .catch(error => {
                if (error.name !== "AbortError") setShippingStatus("error");
            });
        return () => controller.abort();
    }, [shippingAttempt]);

    const retryShipping = () => {
        setShippingConfig(null);
        setShippingStatus("loading");
        setShippingAttempt(attempt => attempt + 1);
    };

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
    const getShipping = () => calculateShipping(cart, shippingConfig);
    const getTotal = () => {
        const shipping = getShipping();
        if (shipping === null) return null;
        const subtotal = getSubTotal();
        return roundCurrency(subtotal + subtotal * taxRate + shipping);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, resetCart, getSubTotal, 
        removeFromCart, getTaxRatePrint, adjustQuantity, getTotalQuantity, getTotal, getTaxRate,
        getProductIds, getQuantities, getTaxRates, getShipping, shippingStatus, retryShipping }}>
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
