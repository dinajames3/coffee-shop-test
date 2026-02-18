import { useState } from 'react';
import { motion } from 'framer-motion';

const Reservations = () => {
	const [form, setForm] = useState({ name: '', date: '', time: '', guests: 2 });
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
			className="container mx-auto px-4 py-12"
		>
			<h1 className="text-4xl font-serif font-bold text-[#3e2723] mb-8 text-center">Reserve a Table</h1>
			{submitted ? (
				<div className="bg-[#81b29a] text-white rounded-lg p-8 text-center text-xl font-serif shadow-md">
					Thank you, {form.name}! Your reservation for {form.guests} on {form.date} at {form.time} is confirmed.
				</div>
			) : (
				<form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#f4d35e] rounded-lg p-8 shadow-md space-y-6">
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
						<label className="block mb-2 font-semibold text-[#3e2723]">Date</label>
						<input
							type="date"
							name="date"
							value={form.date}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded border border-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-[#3e2723]">Time</label>
						<input
							type="time"
							name="time"
							value={form.time}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded border border-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-[#3e2723]">Guests</label>
						<input
							type="number"
							name="guests"
							min="1"
							max="20"
							value={form.guests}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded border border-[#e07a5f] focus:outline-none focus:ring-2 focus:ring-[#81b29a]"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[#e07a5f] text-white font-bold py-3 rounded hover:bg-[#81b29a] transition-colors duration-200"
					>
						Book Now
					</button>
				</form>
			)}
		</motion.div>
	);
};

export default Reservations;
