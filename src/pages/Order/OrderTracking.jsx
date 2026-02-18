import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';

const statusMap = {
    'Pending': { icon: '⏳', label: 'Order Received', desc: 'Our kitchen is reviewing your order.' },
    'Preparing': { icon: '👨‍🍳', label: 'In the Kitchen', desc: 'Our chefs are crafting your meal with passion.' },
    'Ready': { icon: '🛎️', label: 'Ready for Service', desc: 'Your order is hot and ready to be served.' },
    'Completed': { icon: '✔️', label: 'Enjoy Your Meal', desc: 'Thank you for dining with Bella Notte.' },
    'Cancelled': { icon: '❌', label: 'Order Cancelled', desc: 'Please contact our staff for more details.' }
};

const OrderTracking = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`http://localhost/bella-notte-api/orders.php?id=${id}`);
                const data = await res.json();
                setOrder(data);
                setLoading(false);
            } catch (e) {
                console.error("Failed to fetch order status", e);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [id]);

    if (loading) return <div className="container mx-auto px-6 py-20 text-center text-white/40">Searching for your order...</div>;
    if (!order) return (
        <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl font-serif text-white mb-4">Order Not Found</h1>
            <Link to="/order" className="text-gold hover:underline">Return to Ordering</Link>
        </div>
    );

    const currentStatus = statusMap[order.status] || statusMap['Pending'];

    return (
        <div className="container mx-auto px-6 py-24 md:py-32 flex justify-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-dark p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl text-center h-fit border border-white/5 shadow-2xl"
            >
                <div className="text-5xl md:text-6xl mb-8">{currentStatus.icon}</div>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-gradient-gold mb-4 leading-tight">
                    {currentStatus.label}
                </h1>
                <p className="text-base md:text-xl text-white/60 mb-12 max-w-md mx-auto leading-relaxed font-light italic">
                    {currentStatus.desc}
                </p>

                <div className="space-y-4 mb-12">
                    <div className="flex items-center gap-4 max-w-xs mx-auto">
                        <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gold"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: order.status === 'Pending' ? '25%' :
                                        order.status === 'Preparing' ? '50%' :
                                            order.status === 'Ready' ? '75%' : '100%'
                                }}
                            />
                        </div>
                        <span className="text-xs font-bold text-gold uppercase tracking-tighter">
                            {order.status === 'Completed' ? '100%' : 'Tracking...'}
                        </span>
                    </div>
                </div>

                <div className="glass p-6 text-left max-w-sm mx-auto">
                    <h3 className="text-white font-bold mb-3 border-b border-white/10 pb-2">Order Summary #{id}</h3>
                    <ul className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                            <li key={i} className="text-white/60 text-sm flex justify-between">
                                <span>{item.name} x{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center text-white font-bold">
                        <span>Paid Total</span>
                        <span className="text-gold">${order.total_price}</span>
                    </div>
                </div>

                <Link
                    to="/"
                    className="mt-12 inline-block text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    Return to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default OrderTracking;
