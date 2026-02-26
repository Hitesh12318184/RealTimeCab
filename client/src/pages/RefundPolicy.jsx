import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
                    <p className="text-xl text-primary-100">Clear and fair refund guidelines</p>
                </div>
            </div>

            {/* Policy Content */}
            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="card prose max-w-none">
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Cancellation and Refund Policy</h2>
                            <p className="text-gray-700">
                                At BookMyRide, we understand that plans can change. Our refund policy is designed to be fair to both our customers and service providers.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancellation Charges</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                    <span className="font-semibold">Cancellation Time</span>
                                    <span className="font-semibold">Refund Amount</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>More than 24 hours before departure</span>
                                    <span className="text-green-600 font-semibold">100% refund</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>12-24 hours before departure</span>
                                    <span className="text-yellow-600 font-semibold">75% refund</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>6-12 hours before departure</span>
                                    <span className="text-orange-600 font-semibold">50% refund</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Less than 6 hours before departure</span>
                                    <span className="text-red-600 font-semibold">No refund</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">How to Cancel</h3>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                <li>Log in to your BookMyRide account</li>
                                <li>Navigate to "My Bookings"</li>
                                <li>Select the booking you wish to cancel</li>
                                <li>Click "Cancel Booking" button</li>
                                <li>Confirm your cancellation</li>
                            </ol>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Refund Processing Time</h3>
                            <p className="text-gray-700">
                                Refunds will be processed within 5-7 business days from the date of cancellation approval.
                                The refund will be credited to the original payment method used during booking.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Special Circumstances</h3>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                                <h4 className="font-semibold text-blue-900 mb-2">Service Cancellation by Operator</h4>
                                <p className="text-blue-800">
                                    If the service is cancelled by the operator or due to unforeseen circumstances beyond your control,
                                    you will receive a 100% refund regardless of the cancellation time.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No-Show Policy</h3>
                            <p className="text-gray-700">
                                If you fail to board the vehicle at the scheduled departure time without prior cancellation,
                                no refund will be provided.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Partial Cancellations</h3>
                            <p className="text-gray-700">
                                For group bookings, partial cancellations (cancelling some seats while keeping others) follow
                                the same refund policy based on the cancellation time.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h3>
                            <p className="text-gray-700">
                                For any questions regarding cancellations or refunds, please contact our customer support team:
                            </p>
                            <div className="mt-2 space-y-1">
                                <p className="text-gray-700">📧 Email: <a href="mailto:hiteshparida614@gmail.com" className="text-primary-600 hover:underline">hiteshparida614@gmail.com</a></p>
                                <p className="text-gray-700">📞 Phone: <a href="tel:+918093815331" className="text-primary-600 hover:underline">+91 8093815331</a></p>
                            </div>
                        </section>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> This refund policy is subject to change. Please check this page regularly for updates.
                                The policy in effect at the time of booking will apply to your reservation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RefundPolicy;
