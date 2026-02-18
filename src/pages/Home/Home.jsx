import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const featuredDishes = [
	{ name: 'Risotto alla Milanese', desc: 'Creamy saffron risotto with parmesan.' },
	{ name: 'Tagliatelle al Tartufo', desc: 'Fresh pasta with truffle cream sauce.' },
	{ name: 'Tiramisu', desc: 'Classic Italian dessert with espresso and mascarpone.' },
];

const testimonials = [
	{ name: 'Giulia R.', text: 'A magical evening! The food and ambiance were perfect.' },
	{ name: 'Marco D.', text: 'Best Italian in town. The risotto is a must-try.' },
];

const Home = () => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.8 }}
		className="pb-20 space-y-24"
	>
		{/* Hero Section */}
		<section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full -z-10" />
			<motion.h1
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="text-5xl md:text-8xl font-serif font-bold mb-6 tracking-tighter text-gradient-gold"
			>
				Welcome
			</motion.h1>
			<motion.p
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed"
			>
				Experience the timeless essence of Italian culinary artistry,
				crafted with passion and served with elegance.
			</motion.p>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.6 }}
				className="mt-10"
			>
				<Link to="/order" className="inline-block px-10 py-4 rounded-full border border-gold/40 text-gold font-medium hover:bg-gold hover:text-midnight transition-all duration-500 tracking-widest uppercase text-sm">
					Make an order
				</Link>
			</motion.div>
		</section>

		{/* Featured Dishes */}
		<section className="container mx-auto px-6">
			<div className="flex items-center justify-between mb-12">
				<h2 className="text-4xl font-serif font-bold text-white">Chef's Selection</h2>
				<div className="h-[1px] flex-1 bg-gradient-to-r from-gold/50 to-transparent ml-8 hidden md:block" />
			</div>
			<div className="grid md:grid-cols-3 gap-10">
				{featuredDishes.map((dish, index) => (
					<motion.div
						key={dish.name}
						initial={{ y: 30, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="glass p-8 group hover:border-gold/30 transition-all duration-500 cursor-default"
					>
						<div className="mb-4 text-xs font-bold text-gold tracking-widest uppercase">Signature Dishes</div>
						<h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-gold transition-colors">{dish.name}</h3>
						<p className="text-white/50 leading-relaxed font-light">{dish.desc}</p>
					</motion.div>
				))}
			</div>
		</section>

		{/* Testimonials */}
		<section className="relative py-24 px-6 overflow-hidden">
			<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full -z-10" />
			<div className="container mx-auto text-center">
				<h2 className="text-4xl font-serif font-bold mb-16 italic">Voices of Bella Notte</h2>
				<div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
					{testimonials.map((t, index) => (
						<motion.div
							key={t.name}
							initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							className="glass-dark p-12 text-left relative"
						>
							<div className="absolute top-8 left-8 text-6xl text-gold/20 font-serif leading-none">“</div>
							<p className="text-xl font-light text-white/80 italic leading-relaxed mb-8 relative z-10">
								{t.text}
							</p>
							<div className="flex items-center gap-4">
								<div className="h-[1px] w-8 bg-gold" />
								<div className="font-serif text-gold tracking-wider">{t.name}</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	</motion.div>
);

export default Home;
