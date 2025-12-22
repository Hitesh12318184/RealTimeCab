import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const features = [
        { icon: '🚌', title: 'Wide Fleet', description: 'Choose from buses, cars, and SUVs' },
        { icon: '💰', title: 'Best Prices', description: 'Competitive rates with great offers' },
        { icon: '🔒', title: 'Safe & Secure', description: 'Verified vehicles and drivers' },
        { icon: '⚡', title: 'Quick Booking', description: 'Book in just a few clicks' },
        { icon: '📱', title: 'Easy Tracking', description: 'Real-time ride tracking' },
        { icon: '🎁', title: 'Exclusive Offers', description: 'Special discounts for you' }
    ];

    const stats = [
        { number: '10,000+', label: 'Happy Customers' },
        { number: '500+', label: 'Vehicles' },
        { number: '100+', label: 'Routes' },
        { number: '24/7', label: 'Support' }
    ];

    const images = ['/login-bus.png', '/login-car.png', '/login-suv.png'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-primary-600">
                            🚌 BookMyRide
                        </div>
                        <div className="flex gap-4">
                            <Link to="/login" className="btn-secondary">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center md:text-left space-y-6 animate-fade-in" >
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Travel in <span className="text-yellow-300">Comfort</span> & Style
                            </h1>
                            <p className="text-xl text-primary-100">
                                Book buses, cars, and SUVs for your journey. Safe, affordable, and reliable transportation at your fingertips.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                                    🚀 Start Booking Now
                                </Link>
                                <Link to="/login" className="bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all border-2 border-white/30">
                                    Sign In
                                </Link>
                            </div>
                        </div>

                        {/* Right Image Slider */}
                        <div className="relative h-96 flex items-center justify-center">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Vehicle"
                                    className={`absolute max-w-full max-h-full object-contain transition-opacity duration-1000 drop-shadow-2xl
                                        ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                            {/* Slide Indicators */}
                            <div className="absolute bottom-0 flex gap-2">
                                {images.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-2 rounded-full transition-all ${index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose BookMyRide?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Experience the best in comfortable and reliable transportation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Join thousands of satisfied customers and experience hassle-free travel
                    </p>
                    <Link
                        to="/register"
                        className="bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg inline-block text-lg"
                    >
                        Create Free Account →
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">🚌 BookMyRide</h3>
                            <p className="text-gray-400">Your trusted travel companion</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <Link to="/login" className="block text-gray-400 hover:text-white">Login</Link>
                                <Link to="/register" className="block text-gray-400 hover:text-white">Register</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <p className="text-gray-400">📧 hiteshparida614@gmail.com</p>
                            <p className="text-gray-400">📞 +91 8093815331</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-white text-2xl">📘</a>
                                <a href="#" className="text-gray-400 hover:text-white text-2xl">📷</a>
                                <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} BookMyRide. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
