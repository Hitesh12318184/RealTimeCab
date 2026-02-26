import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HelpCenter = () => {

    const helpTopics = [
        {
            icon: '🎫',
            title: 'Booking',
            questions: [
                'How do I book a ride?',
                'Can I modify my booking?',
                'How do I cancel my booking?',
                'What is the refund policy?'
            ]
        },
        {
            icon: '💳',
            title: 'Payments',
            questions: [
                'What payment methods are accepted?',
                'Is my payment secure?',
                'How do I get my refund?',
                'Can I pay cash?'
            ]
        },
        {
            icon: '🚗',
            title: 'Rides',
            questions: [
                'How do I track my ride?',
                'Can I choose my seat?',
                'What if my ride is delayed?',
                'How do I contact the driver?'
            ]
        },
        {
            icon: '👤',
            title: 'Account',
            questions: [
                'How do I create an account?',
                'How do I reset my password?',
                'How do I update my profile?',
                'Can I delete my account?'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
                    <p className="text-xl text-primary-100">We're here to help you with any questions</p>
                </div>
            </div>

            {/* Help Topics */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse Topics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {helpTopics.map((topic, index) => (
                        <div key={index} className="card">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">{topic.icon}</span>
                                <h3 className="text-2xl font-bold text-gray-900">{topic.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {topic.questions.map((question, qIndex) => (
                                    <li key={qIndex}>
                                        <a href="#" className="text-primary-600 hover:text-primary-700 hover:underline">
                                            {question}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">If you need any help?</h3>
                    <p className="text-gray-600 mb-4">Our support team is available 24/7 to assist you</p>
                    <div className="flex justify-center gap-4">
                        <a href="mailto:hiteshparida614@gmail.com" className="btn-primary">
                            📧 Email Us
                        </a>
                        <a href="tel:+918093815331" className="btn-secondary">
                            📞 Call Us
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HelpCenter;
