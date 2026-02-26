import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Thank you for contacting us! We\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-primary-100">We'd love to hear from you</p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="card">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="input-field"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="card">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">📧</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <a href="mailto:hiteshparida614@gmail.com" className="text-primary-600 hover:underline">
                                            hiteshparida614@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">📞</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Phone</h3>
                                        <a href="tel:+918093815331" className="text-primary-600 hover:underline">
                                            +91 8093815331
                                        </a>
                                        <p className="text-sm text-gray-600">24/7 Support Available</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">📍</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Office</h3>
                                        <p className="text-gray-600">Punjab, India</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="text-3xl">⏰</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                        <p className="text-gray-600">Monday - Sunday: 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-primary-50 to-primary-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Response</h3>
                            <p className="text-gray-700 mb-4">
                                Need immediate assistance? Our team typically responds within 2-4 hours during business hours.
                            </p>
                            <a href="/help" className="btn-primary inline-block">
                                Visit Help Center
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactUs;
