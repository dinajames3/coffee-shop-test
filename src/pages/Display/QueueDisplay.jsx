import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../../context/OrderContext';

const QueueDisplay = () => {
    const { orders, fetchOrders } = useOrder();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            await fetchOrders();
            setLoading(false);
        };
        load();
        const interval = setInterval(fetchOrders, 8000);
        return () => clearInterval(interval);
    }, []);

    // Active orders prioritized by status (Ready > Preparing > Pending) and age
    const activeOrders = orders.filter(o =>
        o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready'
    ).sort((a, b) => {
        const statusOrder = { 'Ready': 0, 'Preparing': 1, 'Pending': 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
            return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(a.created_at) - new Date(b.created_at);
    });

    if (loading) return <div className="min-h-screen bg-midnight flex items-center justify-center text-gold/40">Initializing Display...</div>;

    return (
        <div className="min-h-screen bg-midnight text-white overflow-hidden flex flex-col">
            {/* Header fixed at top */}
            <header className="p-8 border-b border-white/5 bg-midnight/80 backdrop-blur-xl z-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gradient-gold">Bella Notte Queue Status</h1>
                    <p className="text-white/40 text-sm font-medium tracking-widest uppercase mt-1">Live Kitchen Status</p>
                </div>
                <div className="flex gap-12">
                    <div className="text-right">
                        <span className="block text-white/20 text-[10px] font-bold uppercase tracking-widest mb-1">Time</span>
                        <span className="text-xl font-serif text-gold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Main Focused View */}
                <div className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar bg-black/20">
                    <AnimatePresence mode="popLayout">
                        {activeOrders.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center opacity-20"
                            >
                                <span className="text-6xl md:text-8xl mb-4">✨</span>
                                <h2 className="text-xl md:text-2xl font-serif">All orders served.</h2>
                            </motion.div>
                        ) : (
                            <div className="space-y-8 md:space-y-12">
                                {activeOrders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
                                        className={`glass-dark p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-l-8 ${order.status === 'Ready' ? 'border-green-500 shadow-green-500/10' :
                                            order.status === 'Preparing' ? 'border-blue-500 shadow-blue-500/10' : 'border-gold shadow-gold/10'
                                            } shadow-2xl`}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                                    <h2 className="text-5xl md:text-7xl font-serif font-bold italic">Table {order.table_number || '??'}</h2>
                                                    <span className={`px-4 py-1 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest ${order.status === 'Ready' ? 'bg-green-500 text-white' :
                                                        order.status === 'Preparing' ? 'bg-blue-500 text-white' : 'bg-gold text-midnight'
                                                        }`}>
                                                        {order.status === 'Ready' ? 'Service!' : order.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl">
                                                    {order.items.map((item, i) => (
                                                        <div key={i} className="flex justify-between items-center text-lg md:text-2xl font-light text-white/80">
                                                            <span>{item.name}</span>
                                                            <span className="text-gold font-serif">x{item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-left md:text-right">
                                                <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-2">Order Token</div>
                                                <div className="text-3xl md:text-5xl font-serif text-white/40">#{order.id.toString().slice(-4)}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Queue Summary / Next Up Sidebar (Visible only on Desktop/Tablet) */}
                <div className="hidden md:flex w-80 bg-midnight/40 border-l border-white/5 p-8 flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-8">In Queue</h3>
                    <div className="flex-1 space-y-4">
                        <AnimatePresence>
                            {activeOrders.length <= 1 ? (
                                <p className="text-white/10 text-sm italic">Queue clear.</p>
                            ) : (
                                activeOrders.slice(1).map((order, idx) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 rounded-2xl glass border border-white/5 flex justify-between items-center"
                                    >
                                        <div>
                                            <div className="text-white font-bold">T{order.table_number}</div>
                                            <div className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Next Up #{idx + 1}</div>
                                        </div>
                                        <div className="text-gold/60 text-xs font-serif italic">
                                            {order.status}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2">Service Standard</div>
                        <p className="text-[10px] leading-relaxed text-white/40 italic">Quality takes time. Our chefs are crafting your experience with love.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueueDisplay;
