import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider, useOrder } from './context/OrderContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import Reservations from './pages/Reservations/Reservations';
import Contact from './pages/Contact/Contact';
import Order from './pages/Order/Order';
import Admin from './pages/Admin/Admin';
import AdminLogin from './pages/Admin/AdminLogin';
import OrderTracking from './pages/Order/OrderTracking';
import QueueDisplay from './pages/Display/QueueDisplay';

const ProtectedAdmin = ({ children }) => {
	const { user } = useOrder();
	return user ? children : <Navigate to="/admin/login" />;
};

function App() {
	return (
		<OrderProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="menu" element={<Menu />} />
						<Route path="about" element={<About />} />
						<Route path="reservations" element={<Reservations />} />
						<Route path="contact" element={<Contact />} />
						<Route path="order" element={<Order />} />
						<Route path="order-tracking/:id" element={<OrderTracking />} />
						<Route path="display" element={<QueueDisplay />} />
						<Route path="admin" element={
							<ProtectedAdmin>
								<Admin />
							</ProtectedAdmin>
						} />
						<Route path="admin/login" element={<AdminLogin />} />
					</Route>
				</Routes>
			</Router>
		</OrderProvider>
	);
}

export default App;
