import { motion } from 'framer-motion';

const chefs = [
	{ name: 'Chef Lucia Romano', bio: 'Master of traditional Milanese cuisine with 20 years of experience.' },
	{ name: 'Chef Enzo Bianchi', bio: 'Expert in handmade pasta and regional Italian flavors.' },
];

const timeline = [
	{ year: 2010, event: 'Bella Notte opens its doors in the heart of the city.' },
	{ year: 2015, event: 'Awarded Best Italian Restaurant by City Magazine.' },
	{ year: 2022, event: 'Renovated with a new menu and expanded dining area.' },
];

const About = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -20 }}
		transition={{ duration: 0.6 }}
		className="container mx-auto px-4 py-12 space-y-16"
	>
		{/* Story */}
		<section>
			<h1 className="text-4xl font-serif font-bold text-[#3e2723] mb-4">Our Story</h1>
			<p className="text-lg text-[#3e2723] max-w-2xl">
				Bella Notte was born from a passion for authentic Italian cuisine and a love for bringing people together. Our bistro blends tradition with creativity, offering a warm, elegant atmosphere and unforgettable flavors.
			</p>
		</section>

		{/* Chef Profiles */}
		<section>
			<h2 className="text-3xl font-serif font-semibold text-[#e07a5f] mb-6">Meet Our Chefs</h2>
			<div className="grid md:grid-cols-2 gap-8">
				{chefs.map(chef => (
					<div key={chef.name} className="bg-[#f4d35e] rounded-lg p-6 shadow-md">
						<h3 className="text-xl font-bold text-[#3e2723] mb-2">{chef.name}</h3>
						<p className="text-[#3e2723]">{chef.bio}</p>
					</div>
				))}
			</div>
		</section>

		{/* Timeline */}
		<section>
			<h2 className="text-3xl font-serif font-semibold text-[#81b29a] mb-6">Our Journey</h2>
			<ol className="border-l-4 border-[#81b29a] pl-6 space-y-4">
				{timeline.map(item => (
					<li key={item.year} className="relative">
						<span className="absolute -left-3 top-1 w-4 h-4 bg-[#e07a5f] rounded-full border-2 border-white"></span>
						<span className="font-bold text-[#e07a5f]">{item.year}</span>: <span className="text-[#3e2723]">{item.event}</span>
					</li>
				))}
			</ol>
		</section>
	</motion.div>
);

export default About;
