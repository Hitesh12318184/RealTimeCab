import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { register } = useAuth();
    const navigate = useNavigate();

    const images = [
        { src: '/login-bus.png', alt: 'Luxury Bus' },
        { src: '/login-car.png', alt: 'Modern Car' },
        { src: '/login-suv.png', alt: 'Premium SUV' }
    ];

    // Auto-slide images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            {/* Centered Logo/Branding */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-primary-800">
                    🚌 BookMyRide
                </h1>
                <p className="text-gray-600 mt-2">Your trusted travel companion</p>
            </div>

            {/* Two Container Layout */}
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
                {/* Left Side - Image Slider */}
                <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden border border-white">
                    <div className="relative w-full h-[500px] bg-gradient-to-br from-primary-50 to-primary-100">
                        {/* Image Slider */}
                        <div className="relative w-full h-full flex items-center justify-center p-8">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center p-12
                                        ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary-900/80 to-transparent text-white">
                            <h2 className="text-2xl font-bold mb-2">Join Us Today!</h2>
                            <p className="text-sm text-primary-100">
                                Create an account and start booking
                            </p>

                            {/* Slide Indicators */}
                            <div className="flex gap-2 mt-4">
                                {images.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-1 rounded-full transition-all duration-300 
                                            ${index === currentImageIndex ? 'w-8 bg-white' : 'w-4 bg-white/50'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl border border-white overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    className="input-field"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{10}"
                                    className="input-field"
                                    placeholder="10-digit phone number"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="input-field"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
