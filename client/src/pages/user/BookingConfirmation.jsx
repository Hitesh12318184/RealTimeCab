import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle, 
  FaBus, 
  FaUser, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaMoneyBillWave 
} from 'react-icons/fa';

const BookingConfirmation = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const { socket } = useSocket();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const fetchBooking = async () => {
            try {
                const response = await api.get(`/bookings/${bookingId}`);
                if (isMounted.current) {
                    setBooking(response.data.data.booking);
                }
            } catch (error) {
                console.error('Error fetching booking:', error);
                toast.error('Failed to load booking details');
                if (isMounted.current) {
                    navigate('/my-bookings');
                }
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchBooking();

        const handleStatusUpdate = (data) => {
            if (data.bookingId === bookingId && isMounted.current) {
                setBooking(prev => ({
                    ...prev,
                    status: data.status,
                    ...data.booking
                }));
                
                if (data.status === 'approved') {
                    toast.success('Your booking has been approved!');
                } else if (data.status === 'rejected') {
                    toast.error('Your booking was rejected. Please contact support for more information.');
                }
            }
        };

        if (socket) {
            socket.on('booking-status-updated', handleStatusUpdate);
            socket.emit('join', `booking:${bookingId}`);
        }

        return () => {
            isMounted.current = false;
            if (socket) {
                socket.off('booking-status-updated', handleStatusUpdate);
                socket.emit('leave', `booking:${bookingId}`);
            }
        };
    }, [bookingId, navigate, socket]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <FaCheckCircle className="mr-1" /> Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <FaTimesCircle className="mr-1" /> Rejected
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <FaTimesCircle className="mr-1" /> Cancelled
                    </span>
                );
            case 'completed':
                return (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <FaCheckCircle className="mr-1" /> Completed
                    </span>
                );
            default:
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <FaClock className="mr-1" /> Pending Approval
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h2>
                    <p className="text-gray-600 mb-4">The requested booking could not be found.</p>
                    <button
                        onClick={() => navigate('/my-bookings')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View My Bookings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                        <h1 className="text-2xl font-bold">Booking Confirmation</h1>
                        <p className="mt-1 text-blue-100">
                            Your booking has been received and is {booking.status}.
                        </p>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Booking Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
                                    {booking.bookingNumber}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <FaBus className="mr-2" /> Status
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {getStatusBadge(booking.status)}
                                    {booking.status === 'pending' && (
                                        <p className="mt-2 text-gray-600 text-sm">
                                            Your booking is being processed. You'll be notified once it's confirmed.
                                        </p>
                                    )}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" /> Route
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {booking.route?.source} to {booking.route?.destination}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <FaCalendarAlt className="mr-2" /> Travel Date
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {new Date(booking.travelDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        weekday: 'long',
                                    })}
                                </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <FaUser className="mr-2" /> Passengers
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {booking.numberOfPassengers} passenger{booking.numberOfPassengers !== 1 ? 's' : ''}
                                </dd>
                            </div>
                            {booking.selectedSeats?.length > 0 && (
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Selected Seats</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {booking.selectedSeats.join(', ')}
                                    </dd>
                                </div>
                            )}
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <FaMoneyBillWave className="mr-2" /> Payment Summary
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="flex justify-between mb-1">
                                        <span>Base Fare ({booking.numberOfPassengers} × ₹{booking.route?.price})</span>
                                        <span>₹{booking.route?.price * booking.numberOfPassengers}</span>
                                    </div>
                                    {booking.discountAmount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-₹{booking.discountAmount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold border-t border-gray-200 mt-2 pt-2">
                                        <span>Total Amount</span>
                                        <span>₹{booking.finalAmount}</span>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900">What's Next?</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        {booking.status === 'pending' && (
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">
                                        Your booking is being reviewed by our team. This usually takes a few minutes.
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">
                                        You'll receive an email notification once your booking is confirmed.
                                    </p>
                                </div>
                            </div>
                        )}
                        {booking.status === 'approved' && (
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 text-green-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">
                                        Your booking has been confirmed! Please arrive at the boarding point at least 30 minutes before departure.
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 text-green-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">
                                        Your e-ticket has been sent to your registered email address.
                                    </p>
                                </div>
                            </div>
                        )}
                        {booking.status === 'rejected' && (
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 text-red-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">
                                        We're sorry, but your booking could not be confirmed. {booking.adminNotes || 'Please contact our support team for more information.'}
                                    </p>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-5 w-5 text-red-500">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-sm text-gray-700">
                                        Any amount paid will be refunded within 5-7 business days.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => navigate('/my-bookings')}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        View All Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
