import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../../context/OrderContext';

const Menu = () => {
	const { products } = useOrder();
	const [filter, setFilter] = useState('All');

	const menuData = products;
	const categories = ['All', ...Array.from(new Set(menuData.map(d => d.category)))];

	const filteredMenu = filter === 'All' ? menuData : menuData.filter(d => d.category === filter);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.6 }}
			className="container mx-auto px-4 py-12"
		>
			<h1 className="text-4xl font-serif font-bold text-[#3e2723] mb-8 text-center">Our Menu</h1>
			<div className="flex justify-center gap-4 mb-8">
				{categories.map(cat => (
					<button
						key={cat}
						onClick={() => setFilter(cat)}
						className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${filter === cat ? 'bg-[#e07a5f] text-white' : 'bg-[#f4d35e] text-[#3e2723] hover:bg-[#e07a5f] hover:text-white'}`}
					>
						{cat}
					</button>
				))}
			</div>
			<div className="grid md:grid-cols-2 gap-8">
				{filteredMenu.map(dish => (
					<div key={dish.name} className="bg-[#fff] rounded-lg shadow-md p-6 border-l-4 border-[#81b29a]">
						<h2 className="text-2xl font-serif font-bold text-[#e07a5f] mb-2">{dish.name}</h2>
						<div className="text-sm text-[#81b29a] mb-1">{dish.category}</div>
						<p className="text-[#3e2723]">{dish.desc}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default Menu;
