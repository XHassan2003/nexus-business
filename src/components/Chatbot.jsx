import React, { useState, useRef, useEffect } from 'react';

// Sample Q&A database
const qaDatabase = [
  { keywords: ['hello', 'hi', 'hey'], answer: 'Hello! How can I help you today?' },
   { keywords: ['hello', 'hi', 'hey'], answer: 'Hello! How can I help you today?' },
  { keywords: ['login', 'sign in',], answer: 'enter your email and password to log in.' },
  { keywords: ['signup',], answer: 'To sign up, click on the Sign Up button and fill the form..' },
  { keywords: ['bye', 'goodbye', 'see you'], answer: 'Goodbye! Have a great day!' },
  { keywords: ['thanks', 'thank you', 'appreciate'], answer: 'You\'re welcome! Glad I could help.' },
  { keywords: ['hours', 'open', 'close'], answer: 'We are open from 9 AM to 6 PM, Monday to Friday.' },
  { keywords: ['contact', 'email', 'phone'], answer: 'You can reach us at support@company.com or (555) 123-4567.' },
  { keywords: ['price', 'cost', 'how much'], answer: 'Our pricing starts at $29.99 per month. Would you like more details?' },
  { keywords: ['refund', 'return', 'cancel'], answer: 'We have a 30-day money-back guarantee. Please contact support for assistance.' },
  { keywords: ['feature', 'what can you do', 'capabilities'], answer: 'I can answer questions about our products, services, pricing, and more. Just ask!' },
  { keywords: ['website', 'site', 'url'], answer: 'Our website is www.example.com. Is there anything specific you\'re looking for?' },
  { keywords: ['account', 'login', 'sign in'], answer: 'You can log in to your account at www.example.com/login.' },
  { keywords: ['shipping', 'delivery', 'ship'], answer: 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.' },
  { keywords: ['product', 'item', 'merchandise'], answer: 'We offer a wide range of products. Could you specify what you\'re looking for?' },
  { keywords: ['support', 'help', 'assistance'], answer: 'Our support team is available 24/7. You can reach them at support@company.com.' },
  { keywords: ['payment', 'pay', 'credit card'], answer: 'We accept all major credit cards, PayPal, and bank transfers.' },
  { keywords: ['warranty', 'guarantee'], answer: 'Our products come with a 1-year warranty. Extended warranties are also available.' },
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: 'Hello! I\'m your assistant. How can I help you today?', 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Find the best matching answer based on keywords
  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check for exact matches first
    for (let item of qaDatabase) {
      for (let keyword of item.keywords) {
        // Create a regex to match whole words only
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(lowerQuestion)) {
          return item.answer;
        }
      }
    }
    
    // If no exact match, check for partial matches
    for (let item of qaDatabase) {
      for (let keyword of item.keywords) {
        if (lowerQuestion.includes(keyword)) {
          return item.answer;
        }
      }
    }
    
    return null;
  };

  // Handle sending a message
  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const newMessage = {
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate bot thinking
    setTimeout(() => {
      const answer = findAnswer(inputText);
      
      const botMessage = {
        text: answer || "Sorry, I don't have an answer for that yet.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Format the timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 focus:outline-none transition-all duration-300"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-auto p-1 rounded hover:bg-indigo-500 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages container */}
          <div className="h-80 overflow-y-auto bg-gray-50 p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === 'user' 
                    ? 'bg-indigo-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span 
                    className={`text-xs block mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={inputText.trim() === ''}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Type your question and press Enter
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;