import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../../context/OrderContext';

const Admin = () => {
    const { orders, updateOrderStatus, fetchOrders, logout } = useOrder();

    useEffect(() => {
        const interval = setInterval(fetchOrders, 10000); // Refresh every 10s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto px-6 py-24">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-2 leading-none">Kitchen Console</h1>
                    <p className="text-white/40 text-sm font-medium tracking-widest uppercase">Real-time Order Flux</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="glass px-6 py-2 rounded-full text-[10px] font-bold text-gold uppercase tracking-widest flex-1 md:flex-none text-center">
                        Active: {orders.length}
                    </div>
                    <button
                        onClick={logout}
                        className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors py-2"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="grid gap-8">
                {orders.length === 0 ? (
                    <div className="h-[40vh] flex flex-col items-center justify-center opacity-20">
                        <span className="text-6xl mb-4">🍝</span>
                        <p className="text-xl font-serif italic italic text-white">Quiet in the kitchen...</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-dark border-l-4 border-gold p-6 md:p-10 flex flex-col lg:flex-row justify-between gap-10"
                        >
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${order.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                        order.status === 'Preparing' ? 'bg-blue-500/10 text-blue-500' :
                                            order.status === 'Ready' ? 'bg-green-500/10 text-green-500' :
                                                'bg-gold/10 text-gold'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase">
                                        #{order.id.toString().slice(-4)} • {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-4">Command Items</h3>
                                        <ul className="space-y-3">
                                            {order.items.map((item, i) => (
                                                <li key={i} className="text-white/80 text-base md:text-lg font-serif italic flex justify-between">
                                                    <span>{item.name} <span className="text-gold/60 ml-2 font-sans not-italic text-sm">x{item.quantity}</span></span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-4">Recipient</h3>
                                        <p className="text-white text-xl md:text-2xl font-serif italic">{order.customer_name}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="w-1 h-1 bg-gold rounded-full"></span>
                                            <p className="text-white/60 text-sm font-medium tracking-tight">Table {order.table_number}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-end gap-6 sm:gap-12 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
                                <div className="text-4xl md:text-5xl font-serif font-bold text-gold italic">${order.total_price}</div>
                                <div className="flex flex-wrap lg:flex-col gap-3 w-full sm:w-auto">
                                    {order.status === 'Pending' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'Preparing')}
                                            className="px-6 py-3 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300 border border-blue-500/20 active:scale-95 flex-1 sm:flex-none"
                                        >
                                            Start Preparation
                                        </button>
                                    )}
                                    {order.status === 'Preparing' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'Ready')}
                                            className="px-6 py-3 rounded-full bg-green-500/10 text-green-400 text-[10px) font-bold uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all duration-300 border border-green-500/20 active:scale-95 flex-1 sm:flex-none"
                                        >
                                            Ready for Service
                                        </button>
                                    )}
                                    {order.status === 'Ready' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'Completed')}
                                            className="px-6 py-3 rounded-full bg-gold text-midnight text-[10px) font-bold uppercase tracking-widest hover:bg-gold-light transition-all duration-300 active:scale-95 shadow-xl shadow-gold/5 flex-1 sm:flex-none"
                                        >
                                            Complete Service
                                        </button>
                                    )}
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                                        className="px-6 py-3 rounded-full border border-red-500/20 text-red-500/50 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 flex-1 sm:flex-none"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Admin;
