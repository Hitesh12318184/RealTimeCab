import { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! 👋 I\'m your BookMyRide assistant. How can I help you today?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const faqs = {
        'how to book': 'To book a ride: 1) Click "Search Rides" 2) Enter source and destination 3) Select a route 4) Choose seats 5) Confirm booking!',
        'payment': 'We accept all major payment methods including cards, UPI, and wallets. Payment is secure and encrypted.',
        'cancel': 'You can cancel your booking from the "My Bookings" page. Click on the booking and select "Cancel Booking".',
        'refund': 'Refunds are processed within 5-7 business days to your original payment method.',
        'offers': 'Check our "Offers" page for the latest discounts! You can also view featured offers on your dashboard.',
        'contact': 'Email: hiteshparida614@gmail.com | Phone: +91 8093815331',
        'track': 'Track your ride in real-time from the "My Bookings" page once your booking is confirmed.',
        'vehicles': 'We offer buses, cars, and SUVs. Choose based on your comfort and budget preferences.',
        'support': 'Our support team is available 24/7. You can email us or call for immediate assistance.'
    };

    const getBotResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        for (const [key, response] of Object.entries(faqs)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! How can I assist you with your booking today?';
        }

        if (lowerMessage.includes('thank')) {
            return 'You\'re welcome! Feel free to ask if you have more questions. 😊';
        }

        return 'I can help you with: booking rides, payments, cancellations, refunds, offers, vehicle types, tracking, and support. What would you like to know?';
    };

    const handleSend = () => {
        if (!inputMessage.trim()) return;

        const userMessage = { type: 'user', text: inputMessage };
        setMessages([...messages, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = { type: 'bot', text: getBotResponse(inputMessage) };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const quickQuestions = [
        '💳 How to book a ride?',
        '🎁 Available offers?',
        '📞 Contact support?',
        '🚗 Vehicle types?'
    ];

    const handleQuickQuestion = (question) => {
        setInputMessage(question.replace(/[💳🎁📞🚗]/g, '').trim());
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all ${isOpen ? 'rotate-180' : ''
                    }`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                🤖
                            </div>
                            <div>
                                <h3 className="font-bold">BookMyRide Assistant</h3>
                                <p className="text-xs text-primary-100">Always here to help</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                                            ? 'bg-primary-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Questions */}
                    <div className="p-3 bg-white border-t border-gray-200">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {quickQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickQuestion(q)}
                                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs whitespace-nowrap hover:bg-primary-100 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
