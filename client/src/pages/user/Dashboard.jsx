import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
    const [routes, setRoutes] = useState([]);
    const [offers, setOffers] = useState([]);
    const [bookingStats, setBookingStats] = useState({ total: 0, pending: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchRoutes();
        fetchOffers();
        fetchBookingStats();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await api.get('/routes?isActive=true');
            setRoutes(response.data.data.routes.slice(0, 6));
        } catch (error) {
            toast.error('Failed to load routes');
        } finally {
            setLoading(false);
        }
    };

    const fetchOffers = async () => {
        try {
            const response = await api.get('/offers/active');
            setOffers(response.data.data.offers.slice(0, 3));
        } catch (error) {
            console.error('Failed to load offers');
        }
    };

    const fetchBookingStats = async () => {
        try {
            const response = await api.get('/bookings/my-bookings');
            const bookings = response.data.data.bookings;
            setBookingStats({
                total: bookings.length,
                pending: bookings.filter(b => b.status === 'pending').length,
                completed: bookings.filter(b => b.status === 'completed').length
            });
        } catch (error) {
            console.error('Failed to load booking stats');
        }
    };

    const copyOfferCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Offer code copied!');
    };

    const greetingTime = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <Navbar />

            {/* Hero Section with Background */}
            <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url(/hero-bus.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>

                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {greetingTime()}, {user?.name || 'Traveler'}! 👋
                        </h1>
                        <p className="text-lg md:text-xl text-primary-100">
                            Ready for your next adventure?
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Bookings</p>
                                <p className="text-4xl font-bold mt-2">{bookingStats.total}</p>
                            </div>
                            <div className="text-5xl opacity-80">📊</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-100 text-sm font-medium">Pending</p>
                                <p className="text-4xl font-bold mt-2">{bookingStats.pending}</p>
                            </div>
                            <div className="text-5xl opacity-80">⏳</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Completed</p>
                                <p className="text-4xl font-bold mt-2">{bookingStats.completed}</p>
                            </div>
                            <div className="text-5xl opacity-80">✅</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link to="/search" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Rides</h3>
                        <p className="text-gray-600 text-sm">Find cars and buses for your journey</p>
                    </Link>

                    <Link to="/bookings" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                        <div className="text-5xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">My Bookings</h3>
                        <p className="text-gray-600 text-sm">View and manage your bookings</p>
                    </Link>

                    <Link to="/offers" className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                        <div className="text-5xl mb-4">🎁</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Offers</h3>
                        <p className="text-gray-600 text-sm">Check out available discounts</p>
                    </Link>
                </div>

                {/* Featured Offers */}
                {offers.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">🎉 Special Offers</h2>
                            <Link to="/offers" className="text-primary-600 hover:text-primary-700 font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {offers.map((offer) => (
                                <div
                                    key={offer._id}
                                    className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="text-4xl">🎁</div>
                                        <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {offer.discountType === 'percentage'
                                                ? `${offer.discountValue}% OFF`
                                                : `₹${offer.discountValue} OFF`}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{offer.title}</h3>
                                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{offer.description}</p>
                                    <div className="bg-white rounded-lg p-2 flex justify-between items-center">
                                        <code className="text-sm font-bold text-primary-600">{offer.code}</code>
                                        <button
                                            onClick={() => copyOfferCode(offer.code)}
                                            className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Featured Routes */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Routes</h2>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        </div>
                    ) : routes.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md text-center py-12">
                            <p className="text-gray-500">No routes available at the moment</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {routes.map((route) => (
                                <div key={route._id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl">
                                            {route.vehicle?.type === 'bus' ? '🚌' : '🚗'}
                                        </span>
                                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                                            ₹{route.price}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {route.source} → {route.destination}
                                    </h3>

                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <p>📍 Distance: {route.distance} km</p>
                                        <p>⏱️ Duration: {route.duration}</p>
                                        <p>🚙 Vehicle: {route.vehicle?.name}</p>
                                    </div>

                                    <Link
                                        to={`/search?source=${route.source}&destination=${route.destination}`}
                                        className="block text-center btn-primary text-sm"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Chatbot />
            <Footer />
        </div>
    );
};

export default UserDashboard;
