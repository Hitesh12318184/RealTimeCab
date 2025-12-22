import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await api.get('/offers/active');
            setOffers(response.data.data.offers);
        } catch (error) {
            toast.error('Failed to load offers');
        } finally {
            setLoading(false);
        }
    };

    const copyOfferCode = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Offer code copied!');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'url(/vehicles-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/95 to-orange-500/95"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">🎁 Special Offers & Deals</h1>
                    <p className="text-yellow-50">Save big on your next journey with our exclusive offers!</p>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    </div>
                ) : offers.length === 0 ? (
                    <div className="card text-center py-12">
                        <div className="text-6xl mb-4">🎁</div>
                        <p className="text-gray-500 text-lg">No active offers at the moment</p>
                        <p className="text-gray-400 text-sm mt-2">Check back soon for exciting deals!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {offers.map((offer) => (
                            <div
                                key={offer._id}
                                className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 rounded-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-4xl">🎁</div>
                                    <span className="bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        {offer.discountType === 'percentage'
                                            ? `${offer.discountValue}% OFF`
                                            : `₹${offer.discountValue} OFF`}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                                <p className="text-gray-700 mb-4">{offer.description}</p>

                                <div className="bg-white rounded-lg p-3 mb-4 border-2 border-dashed border-primary-300">
                                    <div className="flex justify-between items-center">
                                        <code className="text-lg font-bold text-primary-600">{offer.code}</code>
                                        <button
                                            onClick={() => copyOfferCode(offer.code)}
                                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                                        >
                                            📋 Copy
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-700">
                                    <div className="flex items-center">
                                        <span className="mr-2">💰</span>
                                        <strong>Discount:</strong>
                                        <span className="ml-auto">
                                            {offer.discountType === 'percentage'
                                                ? `${offer.discountValue}%`
                                                : `₹${offer.discountValue}`}
                                        </span>
                                    </div>
                                    {offer.maxDiscount && (
                                        <div className="flex items-center">
                                            <span className="mr-2">🎯</span>
                                            <strong>Max Discount:</strong>
                                            <span className="ml-auto">₹{offer.maxDiscount}</span>
                                        </div>
                                    )}
                                    {offer.minBookingAmount > 0 && (
                                        <div className="flex items-center">
                                            <span className="mr-2">📊</span>
                                            <strong>Min Booking:</strong>
                                            <span className="ml-auto">₹{offer.minBookingAmount}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <span className="mr-2">📅</span>
                                        <strong>Valid Till:</strong>
                                        <span className="ml-auto">{new Date(offer.validTill).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2">🚗</span>
                                        <strong>Applicable On:</strong>
                                        <span className="ml-auto">
                                            {offer.applicableOn === 'all' ? 'All Vehicles' : offer.applicableOn.toUpperCase()}
                                        </span>
                                    </div>
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

export default Offers;
