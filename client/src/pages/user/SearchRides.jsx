import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../services/api';
import toast from 'react-hot-toast';

const SearchRides = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        source: '',
        destination: '',
        vehicleType: '',
    });
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [bookingData, setBookingData] = useState({
        numberOfPassengers: 1,
        passengerDetails: [{ name: '', age: '', gender: 'male' }],
        selectedSeats: [],
        offerCode: '',
    });
    const [discount, setDiscount] = useState(0);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const params = new URLSearchParams();
            if (filters.source) params.append('source', filters.source);
            if (filters.destination) params.append('destination', filters.destination);
            if (filters.vehicleType) params.append('vehicleType', filters.vehicleType);

            const response = await api.get(`/routes/search?${params.toString()}`);
            setRoutes(response.data.data.routes);

            if (response.data.data.routes.length === 0) {
                toast.info('No routes found matching your criteria');
            }
        } catch (error) {
            toast.error('Failed to search routes');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        try {
            // Validate required fields
            if (!selectedRoute || !selectedRoute._id || !selectedRoute.vehicle?._id) {
                throw new Error('Invalid route or vehicle information');
            }

            if (!bookingData.selectedSeats || bookingData.selectedSeats.length === 0) {
                throw new Error('Please select at least one seat');
            }

            // Create proper passenger details
            const passengerDetails = bookingData.selectedSeats.map((seat, index) => ({
                name: `Passenger ${index + 1}`,
                age: 25,
                gender: 'male',
                seatNumber: seat
            }));

            // Create a proper travel date - combine tomorrow's date with the departure time
            const travelDate = new Date();
            travelDate.setDate(travelDate.getDate() + 1); // Set to tomorrow

            // If schedule and departureTime exist, use them to set the time
            if (selectedRoute.schedule?.departureTime) {
                const [hours, minutes] = selectedRoute.schedule.departureTime.split(':');
                travelDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            }

            const bookingPayload = {
                route: selectedRoute._id,
                vehicle: selectedRoute.vehicle._id,
                travelDate: travelDate.toISOString(),
                selectedSeats: bookingData.selectedSeats,
                numberOfPassengers: bookingData.numberOfPassengers,
                passengerDetails: passengerDetails,
                totalAmount: selectedRoute.price * bookingData.numberOfPassengers,
                ...(bookingData.offerCode && { offerCode: bookingData.offerCode })
            };

            console.log('Sending booking payload:', JSON.stringify(bookingPayload, null, 2));

            const response = await api.post('/bookings', bookingPayload);

            if (!response.data?.data?.booking?._id) {
                throw new Error('Invalid response from server');
            }

            const bookingId = response.data.data.booking._id;

            // Navigate to booking confirmation page
            navigate(`/bookings/${bookingId}`);

            // Reset form
            setSelectedRoute(null);
            setBookingData({
                numberOfPassengers: 1,
                passengerDetails: [{ name: '', age: '', gender: 'male' }],
                selectedSeats: [],
                offerCode: '',
            });
            setDiscount(0);
        } catch (error) {
            console.error('Booking error:', error);
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to create booking. Please try again.';
            console.error('Error details:', error.response?.data);
            toast.error(errorMessage);
        }
    };

    const validateOffer = async () => {
        if (!bookingData.offerCode) {
            toast.error('Please enter an offer code');
            return;
        }

        try {
            const response = await api.post('/offers/validate', {
                code: bookingData.offerCode,
                bookingAmount: selectedRoute.price * bookingData.numberOfPassengers,
                vehicleType: selectedRoute.vehicle.type,
            });

            setDiscount(response.data.data.discountAmount);
            toast.success('Offer applied successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid offer code');
            setDiscount(0);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url(/vehicles-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 to-primary-900/95"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Ride</h1>
                    <p className="text-primary-100">Search and book buses & cars for your journey</p>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        🔍 Search for Rides
                    </h2>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                📍 From
                            </label>
                            <input
                                type="text"
                                name="source"
                                value={filters.source}
                                onChange={handleFilterChange}
                                className="input-field"
                                placeholder="e.g., Delhi"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                🎯 To
                            </label>
                            <input
                                type="text"
                                name="destination"
                                value={filters.destination}
                                onChange={handleFilterChange}
                                className="input-field"
                                placeholder="e.g., Mumbai"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                🚗 Vehicle Type
                            </label>
                            <select
                                name="vehicleType"
                                value={filters.vehicleType}
                                onChange={handleFilterChange}
                                className="input-field"
                            >
                                <option value="">All Vehicles</option>
                                <option value="car">🚗 Car</option>
                                <option value="bus">🚌 Bus</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                                {loading ? '⏳ Searching...' : '🔍 Find Rides'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    {routes.map((route) => (
                        <div key={route._id} className="card">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <span className="text-3xl">
                                            {route.vehicle.type === 'bus' ? '🚌' : '🚗'}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {route.source} → {route.destination}
                                            </h3>
                                            <p className="text-sm text-gray-600">{route.vehicle.name}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Distance</p>
                                            <p className="font-medium">{route.distance} km</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Duration</p>
                                            <p className="font-medium">{route.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Capacity</p>
                                            <p className="font-medium">{route.vehicle.capacity} seats</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Price</p>
                                            <p className="font-semibold text-primary-600 text-lg">₹{route.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedRoute(route)}
                                    className="btn-primary ml-4"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Booking Modal */}
                {selectedRoute && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">Book Your Ride</h2>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Number of Passengers
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={selectedRoute.vehicle.capacity}
                                        value={bookingData.numberOfPassengers}
                                        onChange={(e) => {
                                            const count = parseInt(e.target.value);
                                            const details = Array(count).fill().map((_, i) =>
                                                bookingData.passengerDetails[i] || { name: '', age: '', gender: 'male' }
                                            );
                                            // Clear selected seats when passenger count changes
                                            setBookingData({
                                                ...bookingData,
                                                numberOfPassengers: count,
                                                passengerDetails: details,
                                                selectedSeats: []
                                            });
                                        }}
                                        className="input-field"
                                        required
                                    />
                                </div>

                                {/* Seat Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Seats ({bookingData.selectedSeats.length}/{bookingData.numberOfPassengers} selected)
                                    </label>
                                    <div className="grid grid-cols-5 gap-2 p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto">
                                        {Array.from({ length: selectedRoute.vehicle.capacity }, (_, i) => i + 1).map((seatNum) => {
                                            const isSelected = bookingData.selectedSeats.includes(seatNum);
                                            const canSelect = bookingData.selectedSeats.length < bookingData.numberOfPassengers;

                                            return (
                                                <button
                                                    key={seatNum}
                                                    type="button"
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            // Deselect seat
                                                            setBookingData({
                                                                ...bookingData,
                                                                selectedSeats: bookingData.selectedSeats.filter(s => s !== seatNum)
                                                            });
                                                        } else if (canSelect) {
                                                            // Select seat
                                                            setBookingData({
                                                                ...bookingData,
                                                                selectedSeats: [...bookingData.selectedSeats, seatNum]
                                                            });
                                                        }
                                                    }}
                                                    className={`
                                                        p-2 rounded text-sm font-medium transition-all
                                                        ${isSelected
                                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                            : canSelect
                                                                ? 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400'
                                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        }
                                                    `}
                                                    disabled={!isSelected && !canSelect}
                                                >
                                                    {seatNum}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Click on seats to select them. You can select up to {bookingData.numberOfPassengers} seat(s).
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Offer Code (Optional)
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={bookingData.offerCode}
                                            onChange={(e) => setBookingData({ ...bookingData, offerCode: e.target.value })}
                                            className="input-field flex-1"
                                            placeholder="Enter code"
                                        />
                                        <button type="button" onClick={validateOffer} className="btn-secondary">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between mb-2">
                                        <span>Base Amount:</span>
                                        <span>₹{selectedRoute.price * bookingData.numberOfPassengers}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between mb-2 text-green-600">
                                            <span>Discount:</span>
                                            <span>-₹{discount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total Amount:</span>
                                        <span>₹{(selectedRoute.price * bookingData.numberOfPassengers) - discount}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <button type="submit" className="btn-primary flex-1">
                                        Confirm Booking
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRoute(null)}
                                        className="btn-secondary flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SearchRides;
