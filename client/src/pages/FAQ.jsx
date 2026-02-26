import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: 'Booking',
            questions: [
                {
                    q: 'How do I book a ride?',
                    a: 'Simply enter your source and destination on the search page, select your preferred vehicle type, choose a route, and complete the booking process with your passenger details and payment.'
                },
                {
                    q: 'Can I cancel my booking?',
                    a: 'Yes, you can cancel your booking from the My Bookings page. Refund policies apply based on the cancellation time.'
                },
                {
                    q: 'How far in advance can I book?',
                    a: 'You can book rides up to 30 days in advance.'
                }
            ]
        },
        {
            category: 'Payment',
            questions: [
                {
                    q: 'What payment methods do you accept?',
                    a: 'We accept credit/debit cards, UPI, net banking, and digital wallets. Cash payment options may be available for select routes.'
                },
                {
                    q: 'Is my payment information secure?',
                    a: 'Yes, all payments are processed through secure, encrypted channels. We do not store your card information on our servers.'
                },
                {
                    q: 'How do refunds work?',
                    a: 'Refunds are processed to your original payment method within 5-7 business days after cancellation approval.'
                }
            ]
        },
        {
            category: 'Vehicle & Rides',
            questions: [
                {
                    q: 'What types of vehicles are available?',
                    a: 'We offer both buses (AC/Non-AC, Sleeper/Seater) and cars (Sedan, SUV, Luxury) depending on your route and preferences.'
                },
                {
                    q: 'Can I choose my seat?',
                    a: 'Yes, you can select your preferred seats during the booking process.'
                },
                {
                    q: 'How do I track my ride?',
                    a: 'You can track your ride in real-time from your booking confirmation page or the My Bookings section.'
                }
            ]
        },
        {
            category: 'Account',
            questions: [
                {
                    q: 'Do I need an account to book?',
                    a: 'Yes, you need to create an account to make bookings and track your ride history.'
                },
                {
                    q: 'How do I reset my password?',
                    a: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
                },
                {
                    q: 'Can I update my profile information?',
                    a: 'Yes, you can update your profile information anytime from the Dashboard settings.'
                }
            ]
        },
        {
            category: 'Offers & Discounts',
            questions: [
                {
                    q: 'How do I use promo codes?',
                    a: 'Enter your promo code in the offer code field during booking checkout. The discount will be applied automatically if valid.'
                },
                {
                    q: 'Can I use multiple offers?',
                    a: 'No, only one offer code can be applied per booking.'
                },
                {
                    q: 'Where can I find current offers?',
                    a: 'Check the Offers page for all current promotions and discount codes.'
                }
            ]
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-primary-100">Find answers to common questions</p>
                </div>
            </div>

            {/* FAQs */}
            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {faqs.map((category, catIndex) => (
                    <div key={catIndex} className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            {category.category}
                        </h2>
                        <div className="space-y-3">
                            {category.questions.map((faq, faqIndex) => {
                                const globalIndex = `${catIndex}-${faqIndex}`;
                                const isOpen = openIndex === globalIndex;

                                return (
                                    <div key={faqIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <button
                                            onClick={() => toggleFAQ(globalIndex)}
                                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-semibold text-gray-900">{faq.q}</span>
                                            <span className={`text-2xl transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                                                ⌄
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                                <p className="text-gray-700">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Still Have Questions */}
                <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                    <p className="text-gray-600 mb-4">Can't find what you're looking for? Contact our support team.</p>
                    <a href="/contact" className="btn-primary inline-block">
                        Contact Support
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FAQ;
