import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

const initialMenu = [
    { id: 1, name: 'Risotto alla Milanese', category: 'Main', desc: 'Creamy saffron risotto with parmesan.', price: 24 },
    { id: 2, name: 'Tagliatelle al Tartufo', category: 'Main', desc: 'Fresh pasta with truffle cream sauce.', price: 28 },
    { id: 3, name: 'Bruschetta', category: 'Starter', desc: 'Grilled bread with tomatoes, garlic, and basil.', price: 12 },
    { id: 4, name: 'Caprese Salad', category: 'Starter', desc: 'Tomatoes, mozzarella, basil, olive oil.', price: 14 },
    { id: 5, name: 'Tiramisu', category: 'Dessert', desc: 'Classic Italian dessert with espresso and mascarpone.', price: 10 },
    { id: 6, name: 'Panna Cotta', category: 'Dessert', desc: 'Silky vanilla cream with berry coulis.', price: 9 },
];

const API_BASE = 'http://localhost/bella-notte-api';

export const OrderProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('bella_notte_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        fetchProducts();
        if (user) fetchOrders();
    }, [user]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE}/products.php`);
            const data = await res.json();
            setProducts(data);
        } catch (e) { console.error("Failed to fetch products", e); }
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_BASE}/orders.php`);
            const data = await res.json();
            setOrders(data);
        } catch (e) { console.error("Failed to fetch orders", e); }
    };

    const login = async (username, password) => {
        try {
            const res = await fetch(`${API_BASE}/auth.php`, {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setUser(data.user);
                localStorage.setItem('bella_notte_user', JSON.stringify(data.user));
                return true;
            }
        } catch (e) { console.error("Login failed", e); }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bella_notte_user');
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const submitOrder = async (customerDetails) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        try {
            const res = await fetch(`${API_BASE}/orders.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart, total, customer: customerDetails })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setCart([]);
                return data.orderId;
            } else {
                console.error("Order failed server-side:", data);
            }
        } catch (e) {
            console.error("Order submission network/parse error:", e);
        }
        return null;
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await fetch(`${API_BASE}/orders.php`, {
                method: 'PUT',
                body: JSON.stringify({ id: orderId, status })
            });
            fetchOrders();
        } catch (e) { console.error("Status update failed", e); }
    };

    return (
        <OrderContext.Provider value={{
            products, cart, addToCart, removeFromCart,
            orders, submitOrder, updateOrderStatus,
            user, login, logout, fetchOrders
        }}>
            {children}
        </OrderContext.Provider>
    );
};
