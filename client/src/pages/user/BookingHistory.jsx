import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useSocket } from '../../context/SocketContext';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();

    useEffect(() => {
        fetchBookings();

        // Listen for real-time booking updates
        if (socket) {
            socket.on('booking-status-updated', (data) => {
                toast.success(`Booking ${data.status}!`);
                fetchBookings(); // Refresh bookings
            });
        }

        return () => {
            if (socket) {
                socket.off('booking-status-updated');
            }
        };
    }, [socket]);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings/my-bookings');
            setBookings(response.data.data.bookings);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await api.patch(`/bookings/${bookingId}/cancel`);
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800',
            completed: 'bg-blue-100 text-blue-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-500 mb-4">No bookings found</p>
                        <a href="/search" className="btn-primary inline-block">
                            Search Rides
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking, index) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 overflow-hidden"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Gradient Header */}
                                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                {booking.vehicle?.type === 'bus' ? '🚌' : '🚗'}
                                                {booking.route?.source} → {booking.route?.destination}
                                            </h3>
                                            <p className="text-sm text-primary-100 mt-1">Booking #{booking.bookingNumber}</p>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(booking.status)} shadow-lg`}>
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 mb-1">🚙 Vehicle</p>
                                            <p className="font-semibold text-gray-900">{booking.vehicle?.name}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 mb-1">📅 Travel Date</p>
                                            <p className="font-semibold text-gray-900">{new Date(booking.travelDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="text-xs text-gray-500 mb-1">👥 Passengers</p>
                                            <p className="font-semibold text-gray-900">{booking.numberOfPassengers}</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                                            <p className="text-xs text-green-600 mb-1">💰 Amount</p>
                                            <p className="font-bold text-green-700 text-lg">₹{booking.finalAmount}</p>
                                        </div>
                                    </div>

                                    {booking.selectedSeats && booking.selectedSeats.length > 0 && (
                                        <div className="mb-4 bg-primary-50 p-3 rounded-lg border border-primary-100">
                                            <p className="text-xs text-primary-600 font-medium mb-1">💺 Selected Seats</p>
                                            <p className="font-semibold text-primary-700">{booking.selectedSeats.join(', ')}</p>
                                        </div>
                                    )}

                                    {booking.status === 'pending' || booking.status === 'approved' ? (
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="btn-danger text-sm w-full md:w-auto flex items-center justify-center gap-2"
                                        >
                                            ❌ Cancel Booking
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BookingHistory;
