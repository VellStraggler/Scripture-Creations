import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

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

    return (
        <CartContext.Provider value={{ cart, addToCart, resetCart, getSubTotal, removeFromCart, adjustQuantity, getTotalQuantity }}>
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
