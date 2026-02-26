import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
                    <p className="text-xl text-primary-100">Please read these terms carefully</p>
                </div>
            </div>

            {/* Terms Content */}
            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="card prose max-w-none">
                    <div className="space-y-6">
                        <p className="text-gray-600">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p className="text-gray-700">
                                By accessing and using BookMyRide's services, you accept and agree to be bound by the terms and provision of this agreement.
                                If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Service Description</h2>
                            <p className="text-gray-700">
                                BookMyRide provides an online platform for booking bus and car rides. We act as an intermediary between customers and
                                transportation service providers. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>You must create an account to use our booking services</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You must provide accurate and complete information during registration</li>
                                <li>You must be at least 18 years old to create an account</li>
                                <li>One person may not maintain more than one account</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Booking and Payment</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>All bookings are subject to availability</li>
                                <li>Prices displayed are in Indian Rupees (INR) and include applicable taxes</li>
                                <li>Payment must be completed at the time of booking</li>
                                <li>We accept various payment methods including cards, UPI, and net banking</li>
                                <li>Booking confirmation will be sent via email and SMS</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Cancellation and Refunds</h2>
                            <p className="text-gray-700">
                                Cancellations and refunds are governed by our <a href="/refund" className="text-primary-600 hover:underline">Refund Policy</a>.
                                Please review the refund policy carefully before making a booking.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. User Responsibilities</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Arrive at the pick-up point at least 15 minutes before departure</li>
                                <li>Carry a valid government-issued photo ID during travel</li>
                                <li>Provide accurate passenger information during booking</li>
                                <li>Follow the transportation provider's rules and regulations</li>
                                <li>Behave appropriately and respect other passengers and staff</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Prohibited Conduct</h2>
                            <p className="text-gray-700 mb-2">You agree not to:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Use our services for any illegal purpose</li>
                                <li>Harass, abuse, or harm other users or service providers</li>
                                <li>Provide false or misleading information</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Use automated systems to access our services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
                            <p className="text-gray-700">
                                BookMyRide acts only as an intermediary platform. We are not responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                                <li>Delays, cancellations, or changes made by transportation providers</li>
                                <li>Loss or damage to personal belongings during travel</li>
                                <li>Personal injuries or accidents during travel</li>
                                <li>Quality of service provided by transportation operators</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Intellectual Property</h2>
                            <p className="text-gray-700">
                                All content on the BookMyRide platform, including text, graphics, logos, and software, is the property of
                                BookMyRide Technologies Inc. and is protected by copyright and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Privacy</h2>
                            <p className="text-gray-700">
                                Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy to
                                understand our practices regarding your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Modifications</h2>
                            <p className="text-gray-700">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.
                                Your continued use of our services after any changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Governing Law</h2>
                            <p className="text-gray-700">
                                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from
                                these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Punjab, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">13. Contact Information</h2>
                            <p className="text-gray-700">
                                If you have any questions about these terms, please contact us:
                            </p>
                            <div className="mt-2 space-y-1">
                                <p className="text-gray-700">📧 Email: <a href="mailto:hiteshparida614@gmail.com" className="text-primary-600 hover:underline">hiteshparida614@gmail.com</a></p>
                                <p className="text-gray-700">📞 Phone: <a href="tel:+918093815331" className="text-primary-600 hover:underline">+91 8093815331</a></p>
                                <p className="text-gray-700">📍 Address: Punjab, India</p>
                            </div>
                        </section>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                            <p className="text-sm text-blue-800">
                                By using BookMyRide's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
