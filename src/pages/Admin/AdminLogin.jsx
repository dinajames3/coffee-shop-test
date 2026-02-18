import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useOrder();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Invalidez credentials. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-6 py-20 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark p-12 rounded-3xl w-full max-w-md"
            >
                <h1 className="text-4xl font-serif font-bold text-gradient-gold mb-8 text-center">Admin Access</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label className="block text-white/60 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center italic">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-gold text-midnight font-bold uppercase tracking-widest hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20"
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
