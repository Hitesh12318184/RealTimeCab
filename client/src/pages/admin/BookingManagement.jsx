import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useSocket } from '../../context/SocketContext';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();

    useEffect(() => {
        fetchBookings();

        // Listen for new bookings
        if (socket) {
            socket.on('new-booking', () => {
                fetchBookings();
            });
        }

        return () => {
            if (socket) {
                socket.off('new-booking');
            }
        };
    }, [filter, socket]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/bookings?status=${filter}`);
            setBookings(response.data.data.bookings);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId, status, adminNotes = '') => {
        try {
            await api.patch(`/bookings/${bookingId}/status`, { status, adminNotes });
            toast.success(`Booking ${status} successfully`);
            fetchBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update booking');
        }
    };

    const approveBooking = (id) => {
        if (window.confirm('Approve this booking?')) {
            handleStatusUpdate(id, 'approved');
        }
    };

    const rejectBooking = (id) => {
        const notes = prompt('Enter rejection reason (optional):');
        handleStatusUpdate(id, 'rejected', notes || '');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking Management</h1>

                {/* Filter Tabs */}
                <div className="mb-6 flex space-x-2">
                    {['pending', 'approved', 'rejected', 'cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setFilter(status);
                                setLoading(true);
                            }}
                            className={`px-4 py-2 rounded-lg font-medium ${filter === status
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-500">No {filter} bookings found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="card">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">#{booking.bookingNumber}</h3>
                                        <p className="text-sm text-gray-600">{booking.user?.name} ({booking.user?.email})</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Route</p>
                                        <p className="font-medium">{booking.route?.source} → {booking.route?.destination}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Vehicle</p>
                                        <p className="font-medium">{booking.vehicle?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Travel Date</p>
                                        <p className="font-medium">{new Date(booking.travelDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Amount</p>
                                        <p className="font-medium text-primary-600">₹{booking.finalAmount}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Passengers: {booking.numberOfPassengers}</p>
                                    </div>
                                    {booking.selectedSeats.length > 0 && (
                                        <div>
                                            <p className="text-gray-500">Seats: {booking.selectedSeats.join(', ')}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-gray-500">Booked: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {booking.status === 'pending' && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => approveBooking(booking._id)}
                                            className="btn-primary text-sm bg-green-600 hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => rejectBooking(booking._id)}
                                            className="btn-danger text-sm"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingManagement;
