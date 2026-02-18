import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const { products, cart, addToCart, removeFromCart, submitOrder } = useOrder();
    const [tableNumber, setTableNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [isCartOpen, setIsCartOpen] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = async () => {
        if (cart.length === 0 || isSubmitting) return;
        if (!tableNumber) {
            alert("Please enter your table number.");
            return;
        }
        setIsSubmitting(true);
        const orderId = await submitOrder({ name: 'Guest User', table: tableNumber });
        if (orderId) {
            navigate(`/order-tracking/${orderId}`);
        } else {
            setIsSubmitting(false);
            alert("Order failed. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-6 py-24 md:py-32 grid lg:grid-cols-3 gap-12 relative">
            <div className="lg:col-span-2 space-y-12">
                <header>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gradient-gold mb-4 leading-tight">Symphony of Flavors</h1>
                    <p className="text-white/50 text-base md:text-lg max-w-xl">Curated daily by our chefs, each dish tells a story of tradition and innovation.</p>
                </header>

                <div className="grid sm:grid-cols-2 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ y: -5 }}
                            className="glass p-6 flex flex-col justify-between group h-fit"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors">{product.name}</h3>
                                    <span className="text-gold font-bold font-serif">${product.price}</span>
                                </div>
                                <p className="text-white/40 text-sm mb-6 leading-relaxed font-light">{product.desc || product.description}</p>
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full py-3 rounded-full border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-midnight transition-all duration-300"
                            >
                                Add to Order
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Cart Desktop Sidebar */}
            <aside className="hidden lg:block">
                <div className="glass-dark p-8 sticky top-32 border border-white/5 shadow-2xl">
                    <h2 className="text-2xl font-serif font-bold text-white mb-6 italic">Your Selection</h2>
                    <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {cart.length === 0 ? (
                                <p className="text-white/30 italic text-sm">Awaiting your first choice...</p>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="flex justify-between items-center group"
                                    >
                                        <div>
                                            <div className="text-white text-sm font-medium">{item.name} x{item.quantity}</div>
                                            <div className="text-gold/60 text-[10px] font-bold uppercase tracking-tighter">${item.price * item.quantity}</div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-white/10 hover:text-red-400 transition-colors p-2"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="6 18L18 6M6 6l12 12"></path></svg>
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mb-8">
                        <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">Table Registration</label>
                        <input
                            type="text"
                            placeholder="EX: T15"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                        />
                    </div>

                    <div className="border-y border-white/5 py-6 mb-8">
                        <div className="flex justify-between items-center mb-2 text-white/30 text-xs">
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-white font-serif italic">
                            <span>Total</span>
                            <span className="text-gold">${total}</span>
                        </div>
                    </div>

                    <button
                        disabled={cart.length === 0 || isSubmitting}
                        onClick={handleSubmit}
                        className="w-full py-5 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest hover:bg-gold-light disabled:opacity-10 disabled:grayscale transition-all duration-500 shadow-xl shadow-gold/10 text-xs"
                    >
                        {isSubmitting ? 'Confirming...' : 'Place Order'}
                    </button>
                </div>
            </aside>

            {/* Mobile Floating Cart Trigger */}
            <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="bg-gold text-midnight px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl shadow-gold/40 border border-white/20 active:scale-95 transition-transform"
                >
                    <span className="bg-midnight/20 px-2 py-0.5 rounded-full font-serif italic">{cart.length}</span>
                    View Order
                    <span className="text-midnight/40">•</span>
                    ${total}
                </button>
            </div>

            {/* Mobile Cart Overlay Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="lg:hidden fixed inset-0 bg-midnight/90 backdrop-blur-md z-[200]"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed bottom-0 left-0 right-0 z-[201] p-6"
                        >
                            <div className="glass-dark rounded-[2.5rem] p-8 border border-white/10 shadow-2xl max-h-[85vh] flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-serif font-bold text-white italic">Order Detail</h2>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-white/30 p-2"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-8 custom-scrollbar">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                                            <div>
                                                <div className="text-white text-lg font-serif italic">{item.name}</div>
                                                <div className="text-gold/60 text-xs font-bold uppercase tracking-widest">{item.quantity} Servings</div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="text-white font-serif">${item.price * item.quantity}</span>
                                                <button onClick={() => removeFromCart(item.id)} className="text-red-400/50 p-1">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="6 18L18 6M6 6l12 12"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 ml-1">Table Assignment</label>
                                        <input
                                            type="text"
                                            placeholder="EX: T15"
                                            value={tableNumber}
                                            onChange={(e) => setTableNumber(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors text-base"
                                        />
                                    </div>
                                    <div className="border-t border-white/10 pt-6">
                                        <div className="flex justify-between items-end mb-6">
                                            <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Grand Total</span>
                                            <span className="text-4xl font-serif text-gold font-bold italic">${total}</span>
                                        </div>
                                        <button
                                            disabled={cart.length === 0 || isSubmitting}
                                            onClick={handleSubmit}
                                            className="w-full py-6 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest shadow-2xl shadow-gold/20 text-xs"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Confirm Order'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Order;
