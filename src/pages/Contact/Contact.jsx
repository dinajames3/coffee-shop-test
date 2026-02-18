import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [submitted, setSubmitted] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setForm(f => ({ ...f, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.6 }}
			className="container mx-auto px-4 py-12 space-y-12"
		>
			<h1 className="text-4xl font-serif font-bold text-[#3e2723] mb-8 text-center">Contact Us</h1>
			<div className="grid md:grid-cols-2 gap-12">
				{/* Info Section */}
				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-serif font-semibold text-[#e07a5f] mb-2">Location</h2>
						<p className="text-[#3e2723]">123 Via Roma, City Center</p>
					</div>
					<div>
						<h2 className="text-2xl font-serif font-semibold text-[#e07a5f] mb-2">Hours</h2>
						<p className="text-[#3e2723]">Mon-Sun: 12:00 PM - 11:00 PM</p>
					</div>
					<div>
						<h2 className="text-2xl font-serif font-semibold text-[#e07a5f] mb-2">Map</h2>
						<iframe
							title="Bella Notte Location"
							src="https://www.openstreetmap.org/export/embed.html?bbox=12.4924%2C41.8902%2C12.4924%2C41.8902&amp;layer=mapnik"
							className="w-full h-48 rounded border-2 border-[#81b29a]"
							allowFullScreen=""
							loading="lazy"
						></iframe>
					</div>
				</div>
				{/* Contact Form */}
				<div>
					{submitted ? (
						<div className="bg-[#81b29a] text-white rounded-lg p-8 text-center text-xl font-serif shadow-md">
							Thank you, {form.name}! We have received your message.
						</div>
					) : (
						<form onSubmit={handleSubmit} className="bg-[#f4d35e] rounded-lg p-8 shadow-md space-y-6">
							<div>
								<label className="block mb-2 font-semibold text-[#3e2723]">Name</label>
								<input
									type="text"
									name="name"
									value={form.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 rounded border border-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-[#3e2723]">Email</label>
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 rounded border border-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-[#3e2723]">Message</label>
								<textarea
									name="message"
									value={form.message}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 rounded border border-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
									rows="4"
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full bg-[#e07a5f] text-white font-bold py-3 rounded hover:bg-[#81b29a] transition-colors duration-200"
							>
								Send Message
							</button>
						</form>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default Contact;
