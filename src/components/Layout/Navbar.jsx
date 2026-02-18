import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
	{ to: '/', label: 'Home' },
	{ to: '/menu', label: 'Menu' },
	{ to: '/order', label: 'Order' },
	{ to: '/about', label: 'About' },
	{ to: '/reservations', label: 'Reservations' },
	{ to: '/contact', label: 'Contact' },
];

const Navbar = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:px-12">
			<div className="container mx-auto glass-dark rounded-full px-8 py-3 flex items-center justify-between relative z-[101]">
				<Link to="/" className="text-2xl font-bold tracking-tight font-serif text-gradient-gold">
					Bella Notte
				</Link>

				{/* Desktop Links */}
				<ul className="hidden lg:flex gap-8">
					{navLinks.map(link => (
						<li key={link.to}>
							<Link
								to={link.to}
								className={`text-sm font-medium tracking-wide transition-all duration-300 ${location.pathname === link.to
									? 'text-gold'
									: 'text-white/70 hover:text-white'
									}`}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-4">
					<div className="hidden md:block">
						<button className="bg-gold hover:bg-gold-dark text-midnight px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300">
							Book a Table
						</button>
					</div>

					{/* Mobile Toggle */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="lg:hidden text-gold p-2"
					>
						<div className="w-6 h-5 flex flex-col justify-between items-end">
							<motion.span
								animate={isOpen ? { rotate: 45, y: 8, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
								className="h-0.5 bg-current rounded-full"
							/>
							<motion.span
								animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
								className="h-0.5 w-[70%] bg-current rounded-full"
							/>
							<motion.span
								animate={isOpen ? { rotate: -45, y: -8, width: '100%' } : { rotate: 0, y: 0, width: '60%' }}
								className="h-0.5 bg-current rounded-full"
							/>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="absolute top-20 left-6 right-6 lg:hidden"
					>
						<div className="glass-dark rounded-3xl p-8 shadow-2xl border border-white/5">
							<ul className="space-y-6 text-center">
								{navLinks.map((link, i) => (
									<motion.li
										key={link.to}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.1 }}
									>
										<Link
											to={link.to}
											onClick={() => setIsOpen(false)}
											className={`text-xl font-serif font-bold ${location.pathname === link.to ? 'text-gold' : 'text-white/80'}`}
										>
											{link.label}
										</Link>
									</motion.li>
								))}
								<li className="pt-6 border-t border-white/10">
									<button className="w-full bg-gold text-midnight py-4 rounded-full font-bold uppercase tracking-widest text-sm">
										Book a Table
									</button>
								</li>
							</ul>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
