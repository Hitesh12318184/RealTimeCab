import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { login } = useAuth();
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
            const user = await login(formData.email, formData.password);

            // Redirect based on role
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
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
                            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                            <p className="text-sm text-primary-100">
                                Sign in to continue your journey
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

                {/* Right Side - Login Form */}
                <div className="lg:w-1/2 bg-white rounded-2xl shadow-xl border border-white overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    className="input-field"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                                    Create Account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-700 font-semibold mb-2">🔐 Demo Credentials:</p>
                            <p className="text-xs text-gray-600">Admin: admin@example.com / admin123</p>
                            <p className="text-xs text-gray-600">User: user@example.com / user123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
