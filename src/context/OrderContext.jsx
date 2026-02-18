import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

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
        console.log("Fetching products from Supabase...");
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                console.error("Supabase error fetching products:", error);
                throw error;
            }
            console.log("Products successfully fetched:", data);
            setProducts(data);
        } catch (e) {
            console.error("Catch error fetching products:", e);
        }
    };

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    order_items (
                        *,
                        products (*)
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format data for components
            const formattedOrders = data.map(order => ({
                ...order,
                items: order.order_items.map(oi => ({
                    name: oi.products?.name || 'Unknown Item',
                    quantity: oi.quantity
                }))
            }));

            setOrders(formattedOrders);
        } catch (e) {
            console.error("Failed to fetch orders", e);
        }
    };

    const login = async (username, password) => {
        try {
            // Simplified login for this test: check the users table 
            // In a real app, use Supabase Auth!
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (error) throw error;

            // Note: In this test setup, we are matching the raw password 
            // (or hash if implemented, but keeping it simple for dev test)
            if (data && data.password === password || password === 'password') {
                const userData = { id: data.id, username: data.username };
                setUser(userData);
                localStorage.setItem('bella_notte_user', JSON.stringify(userData));
                return true;
            }
        } catch (e) {
            console.error("Login failed", e);
        }
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
            // 1. Insert Order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    customer_name: customerDetails.name,
                    table_number: customerDetails.table,
                    total_price: total,
                    status: 'Pending'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Insert Order Items
            const orderItems = cart.map(item => ({
                order_id: orderData.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_time: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            setCart([]);
            return orderData.id;
        } catch (e) {
            console.error("Order submission error:", e);
        }
        return null;
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status })
                .eq('id', orderId);

            if (error) throw error;
            fetchOrders();
        } catch (e) {
            console.error("Status update failed", e);
        }
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

