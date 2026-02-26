import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setIsSubscribing(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Thank you for subscribing to our newsletter!');
            setEmail('');
            setIsSubscribing(false);
        }, 1000);
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2">Stay Updated!</h3>
                            <p className="text-primary-50">Subscribe to get special offers, free giveaways, and updates.</p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-lg text-gray-900 flex-1 md:w-80 focus:outline-none focus:ring-2 focus:ring-white"
                                disabled={isSubscribing}
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-3xl">🚌</span>
                            BookMyRide
                        </h2>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Your trusted travel companion. Book buses and cars with ease, travel with comfort,
                            and reach your destination safely.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-400">
                                <span>📧</span>
                                <a href="mailto:hiteshparida614@gmail.com" className="hover:text-white transition-colors">
                                    hiteshparida614@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span>📞</span>
                                <a href="tel:+918093815331" className="hover:text-white transition-colors">
                                    +91 8093815331
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <span>📍</span>
                                <span>Punjab, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link to="/how-it-works" className="text-gray-400 hover:text-primary-400 transition-colors">How It Works</Link></li>
                            <li><Link to="/safety" className="text-gray-400 hover:text-primary-400 transition-colors">Safety</Link></li>
                            <li><Link to="/careers" className="text-gray-400 hover:text-primary-400 transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><Link to="/search" className="text-gray-400 hover:text-primary-400 transition-colors">Bus Booking</Link></li>
                            <li><Link to="/search" className="text-gray-400 hover:text-primary-400 transition-colors">Car Rental</Link></li>
                            <li><Link to="/offers" className="text-gray-400 hover:text-primary-400 transition-colors">Special Offers</Link></li>
                            <li><Link to="/corporate" className="text-gray-400 hover:text-primary-400 transition-colors">Corporate</Link></li>
                            <li><Link to="/partner" className="text-gray-400 hover:text-primary-400 transition-colors">Partner With Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/help" className="text-gray-400 hover:text-primary-400 transition-colors">Help Center</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors">FAQs</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</Link></li>
                            <li><Link to="/refund" className="text-gray-400 hover:text-primary-400 transition-colors">Refund Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social Media & App Downloads */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Social Media */}
                        <div>
                            <h4 className="text-sm font-semibold mb-3 text-center md:text-left">Follow Us</h4>
                            <div className="flex items-center gap-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/_hit.eshhh_?igsh=bnRsNm43enkzcXNp" target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/hiteshhh-kumar/" target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* App Downloads */}
                        <div>
                            <h4 className="text-sm font-semibold mb-3 text-center md:text-right">Download Our App</h4>
                            <div className="flex gap-3">
                                <a href="#" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs">Download on</div>
                                        <div className="text-sm font-semibold">App Store</div>
                                    </div>
                                </a>
                                <a href="#" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.24-.16-.39-.408-.39-.696V2.51c0-.288.15-.536.389-.696zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.591.341.591 1.17 0 1.511l-2.808 1.626-2.564-2.564 2.565-2.199zm-3.199-.693L5.864 2.483l10.937 6.333-2.302 2.302z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs">GET IT ON</div>
                                        <div className="text-sm font-semibold">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                            <span className="text-gray-600">•</span>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                            <span className="text-gray-600">•</span>
                            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
                            <span className="text-gray-600">•</span>
                            <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link>
                        </div>
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} BookMyRide Technologies Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
