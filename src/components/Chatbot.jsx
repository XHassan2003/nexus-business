// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  
  // Knowledge base with questions and answers
  const knowledgeBase = [
    { 
      keywords: ["services","What services do you provide", "offer", "provide", "solutions" , 
        "What services do you provide?",
        "Can you list your offerings?",
         "Tell me about the solutions you offer.", 
         "What can your platform help me with?",
         "What kind of services are available?",
         "What do you offer to startups?",
          "What kind of business solutions do you provide?",
         "Can you help with business growth?",
         "What support do you offer for entrepreneurs?",
         "What are the main features of your services?", "What services do you provide?",
  "Can you list your offerings?",
  "What kind of business solutions do you offer?",
  "What do you offer to small businesses?",
  "Can you help with company growth?",
  "What can your platform help me with?",
  "What are your main features?",
  "Do you provide customer support tools?",
  "How can your services benefit my company?",
  "What services can I get from you?",
  "Tell me about your top offerings.",
  "Do you offer digital solutions?",
  "How can I use your services?",
  "Are your services helpful for startups?",
  "Do you offer marketing tools?",
  "What kind of automation do you provide?",
  "Can your platform increase business efficiency?",
  "What unique services do you offer?",
  "What kind of industries do you serve?",
  "Do you offer AI-based services?",
  "Do you provide consulting?",
  "How do your services support entrepreneurs?",
  "Can I get custom solutions from you?",
  "What problems can your services solve?",
  "What type of features come with your services?"],
      answer: "Our platform delivers AI-powered business solutions designed to optimize operations and enhance customer experiences. Key features include advanced analytics, automated customer support, and actionable data insights—empowering businesses to make smarter, faster decisions."
    },
    { 
      keywords: ["pricing", "cost", "price", "plan", "What are your pricing plans?",
        "How much do your services cost?",
        "Is there a free plan available?",
        "What is the price for startups?",
        "Can you explain your subscription plans?",
        "How is your service priced?",
        "Do you charge monthly or yearly?",
        "Any hidden fees in your pricing?",
        "Can I upgrade my pricing plan later?", 
        "Is there a discount for students or startups?", "What are your pricing plans?",
  "How much do your services cost?",
  "Is there a free plan available?",
  "What is the price for startups?",
  "Can you explain your subscription plans?",
  "How is your service priced?",
  "Do you charge monthly or yearly?",
  "Any hidden fees in your pricing?",
  "Can I upgrade my pricing plan later?",
  "Is there a discount for students or startups?",
  "How affordable are your services?",
  "What is your most popular pricing plan?",
  "Do you offer a trial period?",
  "Are your plans flexible?",
  "Can I cancel my subscription anytime?",
  "Do you offer any seasonal discounts?",
  "Are there any setup costs?",
  "Is billing automatic?",
  "Do you offer refunds?",
  "Can I pay annually to save more?",
  "What payment methods do you accept?",
  "Do you charge based on usage?",
  "What’s the difference between each plan?",
  "Can I switch plans easily?",
  "Is VAT or tax included in your pricing?"],
      answer:"We offer three tailored plans to suit different business needs: Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing). Each plan includes a 14-day free trial—no credit card required."
    },
    { 
      keywords: ["contact", "support", "help", "email",
  "How can I contact your team?",
  "Do you offer live support?",
  "Is there an email for customer service?",
  "How do I reach out for help?",
  "Can I talk to someone from your team?",
  "What’s your support email?",
  "Is support available on weekends?",
  "How fast is your response time?",
  "Where can I send my query?",
  "Can I call your support number?", "How can I contact your team?",
  "Do you offer live support?",
  "Is there an email for customer service?",
  "How do I reach out for help?",
  "Can I talk to someone from your team?",
  "What’s your support email?",
  "Is support available on weekends?",
  "How fast is your response time?",
  "Where can I send my query?",
  "Can I call your support number?",
  "Do you have a contact form?",
  "Is support available 24/7?",
  "Can I chat with your support team?",
  "What’s the best way to get help quickly?",
  "Do you provide phone support?",
  "Is there a WhatsApp number for support?",
  "How do I report a problem?",
  "Where can I give feedback?",
  "Can I schedule a support call?",
  "Is technical support available?",
  "What if I don't get a response?",
  "Do you have a help center or FAQ?",
  "Is there a support portal?",
  "Can I email screenshots of my issue?",
  "Do you respond on social media too?"],
      answer:"For assistance, please reach out to our support team at support@business-ai.com or call us at 03362468938 Our team is available Monday to Friday, from 9:00 AM to 6:00 PM (EST)."
    },
    { 
      keywords: [" account", "how to sign up", "register", "create account", "How do I sign up?",
  "Where can I register?",
  "How to create a new account?",
  "Do I need a credit card to sign up?",
  "Is signing up free?",
  "Can I create an account now?",
  "I want to register — how?",
  "How to get started with your platform?",
  "Can I register using Google?",
  "How do I log into my account?","How do I sign up?",
  "Where can I register?",
  "How to create a new account?",
  "Do I need a credit card to sign up?",
  "Is signing up free?",
  "Can I create an account now?",
  "I want to register — how?",
  "How to get started with your platform?",
  "Can I register using Google?",
  "How do I log into my account?",
  "Can I sign up using my email?",
  "Is there a guest login option?",
  "How do I verify my account?",
  "I forgot my password — how to reset?",
  "Is account creation secure?",
  "Can I use social login to register?",
  "Where is the sign-up button?",
  "Is registration available on mobile?",
  "Can I create multiple accounts?",
  "Do I need to activate my account?",
  "How long does registration take?",
  "Is my data safe when I register?",
  "Do I have to confirm via email?",
  "What happens after I sign up?",
  "How to update my account info?"],
      answer:"To get started, simply click the 'Sign Up' button located at the top-right corner of our website. You’ll be asked to enter your full name, a valid email address, and create a secure password to complete the registration process."


    },
    { 
      keywords: ["integration", "connect", "api", "zapier",  "Can I connect your platform to other tools?",
  "Do you support integrations?",
  "Is there an API available?",
  "Does it work with Zapier?",
  "Can I link this to Slack or Notion?",
  "How do I integrate my CRM?",
  "Is it possible to connect with Google Sheets?",
  "What integrations are available?",
  "Can I use webhooks?",
  "Is Salesforce integration supported?", "Can I connect your platform to other tools?",
  "Do you support integrations?",
  "Is there an API available?",
  "Does it work with Zapier?",
  "Can I link this to Slack or Notion?",
  "How do I integrate my CRM?",
  "Is it possible to connect with Google Sheets?",
  "What integrations are available?",
  "Can I use webhooks?",
  "Is Salesforce integration supported?",
  "Do you offer third-party integrations?",
  "Can I connect your API with my app?",
  "How to set up an integration?",
  "Is the Zapier connection free?",
  "Do you have a public API?",
  "Can I automate tasks with Zapier?",
  "Is API documentation available?",
  "Can I integrate with Microsoft Teams?",
  "What tools can I connect this with?",
  "Do I need coding knowledge to integrate?",
  "Is integration setup easy?",
  "Can I test the API for free?",
  "How many tools can I connect?",
  "Do you offer native integrations?",
  "Is integration real-time or delayed?"],
      answer: "Our platform seamlessly integrates with leading tools such as Salesforce, Slack, Microsoft Teams, and Zapier. Comprehensive integration guides are available in our documentation, and our support team is always ready to assist you with setup and customization."


    },
    { 
      keywords: ["security", "safe", "privacy", "data protection", "Is my data safe with you?",
  "How secure is your platform?",
  "Do you comply with GDPR?",
  "How is user privacy protected?",
  "What security measures are in place?",
  "Is this a secure website?",
  "Can I trust you with my data?",
  "What is your data protection policy?",
  "Do you encrypt user data?",
  "Is 2FA available?", "Is my data safe with you?",
  "How secure is your platform?",
  "Do you comply with GDPR?",
  "How is user privacy protected?",
  "What security measures are in place?",
  "Is this a secure website?",
  "Can I trust you with my data?",
  "What is your data protection policy?",
  "Do you encrypt user data?",
  "Is 2FA available?",
  "What steps do you take for user security?",
  "Is my information private?",
  "Do you sell user data?",
  "How do you handle data breaches?",
  "What happens if your system gets hacked?",
  "Do you use SSL encryption?",
  "Is payment info securely stored?",
  "How often do you update security?",
  "Do you follow any privacy laws?",
  "Can I delete my data anytime?",
  "Who has access to my data?",
  "Is user activity tracked?",
  "Do you store passwords securely?",
  "Can I use biometric login?",
  "Is your site protected from hackers?"],
      answer: "Security is a core pillar of our platform. We employ bank-grade encryption (AES-256), conduct regular third-party security audits, and fully comply with global data protection regulations including GDPR and CCPA. All user data is securely stored in ISO-certified AWS data centers with strict access controls and real-time monitoring."


    },
    { 
      keywords: ["free trial", "trial period", "demo", "Do you offer a free trial?",
  "How long is the trial period?",
  "Is any payment required for the trial?",
  "Can I try before buying?",
  "Is there a demo account?",
  "How do I access the demo?",
  "What is included in the trial?",
  "Can I extend the trial?",
  "Is onboarding free during the trial?",
  "Do I need to cancel the trial manually?", "Do you offer a free trial?",
  "How long is the trial period?",
  "Is any payment required for the trial?",
  "Can I try before buying?",
  "Is there a demo account?",
  "How do I access the demo?",
  "What is included in the trial?",
  "Can I extend the trial?",
  "Is onboarding free during the trial?",
  "Do I need to cancel the trial manually?",
  "Will my card be charged after the trial?",
  "Can I use all features in the trial?",
  "Do I get support during the trial?",
  "How do I upgrade after the trial?",
  "Can I switch to a paid plan anytime?",
  "Is the trial available for teams?",
  "Can I restart the trial if I missed it?",
  "Is the demo live or recorded?",
  "How do I schedule a demo call?",
  "Do I need to install anything for the demo?",
  "Is there any limit on usage during the trial?",
  "Do I need to enter credit card details for trial?",
  "Can I cancel anytime during trial?",
  "What happens after my trial ends?",
  "Is trial available in my country?"],
      answer: "We provide a 14-day free trial that grants full access to all features—no credit card required. This allows you to explore the platform risk-free. At the end of the trial, you can seamlessly upgrade to a paid plan that best fits your needs to continue using our services."


    },
    { 
      keywords: ["feature", "functionality", "what can it do", "What features does your platform have?",
  "What can your platform do?",
  "Can you list the core functionalities?",
  "What problems does your service solve?",
  "How does this work for businesses?",
  "Does it support automation?",
  "What are the top benefits?",
  "Is analytics part of your feature set?",
  "Can I customize the platform?",
  "What makes your product unique?", "What features does your platform have?",
  "What can your platform do?",
  "Can you list the core functionalities?",
  "What problems does your service solve?",
  "How does this work for businesses?",
  "Does it support automation?",
  "What are the top benefits?",
  "Is analytics part of your feature set?",
  "Can I customize the platform?",
  "What makes your product unique?",
  "Does it have mobile support?",
  "Can I integrate it with other tools?",
  "Is real-time tracking available?",
  "Do you offer reporting features?",
  "Can I manage multiple users?",
  "Is there role-based access control?",
  "Are notifications or alerts available?",
  "Can it handle large-scale data?",
  "Does it support multilingual use?",
  "Can I schedule tasks or workflows?"],
      answer: "Our platform delivers a comprehensive suite of AI-powered solutions, including advanced analytics, automated customer support, predictive insights, real-time data visualization, and fully customizable dashboards. For a complete overview, please visit our Features page."


    },

    { 
      keywords: [ "two-factor authentication (2FA)",
  "role-based access control",
  "SSO (Single Sign-On)",
  "user permissions",
  "access logs",
  "secure login",
  "audit trail",
  "Who can access my data?",
  "What is two-factor authentication (2FA)?",
  "Does your platform support 2FA?",
  "How can I enable two-factor authentication?",
  "Is two-factor authentication mandatory?",
  "What is role-based access control?",
  "Can I assign roles to team members?",
  "How do user roles affect permissions?",
  "Does your system support SSO?",
  "What is Single Sign-On (SSO) and how does it work?",
  "Can I integrate my identity provider with your SSO?",
  "How are user permissions managed?",
  "Can I restrict access based on user roles?",
  "Can permissions be customized for each user?",
  "What are access logs?",
  "Can I monitor user login history?",
  "Do you store IP addresses in access logs?",
  "What does secure login mean?",
  "Is my login information encrypted?",
  "Do you provide an audit trail for activities?",
  "What is an audit trail and how can I access it?",
  "Can I track changes made by users?",
  "How do you ensure account security?",
  "Who can access my data?",
  "Can I control which users see which data?",
  "Do you notify me about suspicious login attempts?"],
      answer: "Our platform delivers a comprehensive suite of AI-powered solutions, including advanced analytics, automated customer support, predictive insights, real-time data visualization, and fully customizable dashboards. For a complete overview, please visit our Features page."


    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      handleBotResponse(inputValue);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleBotResponse = (userInput) => {
    // Convert to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      const botMessage = {
        id: messages.length + 2,
        text: "Hello there! How can I help you today?",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }
    
    // Check for thank you
    if (input.includes('thank') || input.includes('thanks')) {
      const botMessage = {
        id: messages.length + 2,
        text: "You're welcome! Is there anything else I can help with?",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }
    
    // Check for goodbye
    if (input.includes('bye') || input.includes('goodbye')) {
      const botMessage = {
        id: messages.length + 2,
        text: "Goodbye! Feel free to chat again if you have more questions.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }
    
    // Find the best matching response from knowledge base
    let bestMatch = null;
    let maxMatches = 0;
    
    for (const item of knowledgeBase) {
      let matches = 0;
      for (const keyword of item.keywords) {
        if (input.includes(keyword)) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = item;
      }
    }
    
    // If we found a good match
    if (bestMatch && maxMatches > 0) {
      const botMessage = {
        id: messages.length + 2,
        text: bestMatch.answer,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } else {
      // Default response
      const botMessage = {
        id: messages.length + 2,
        text: "I'm here to help! For more specific questions, you can contact our support team at support@business-ai.com",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const quickQuestions = [
    "What services do you offer?",
    "How much does it cost?",
    "Can I try for free?",
    "How do I contact support?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md h-[500px] flex flex-col transform transition-all duration-300">
          {/* Chat header */}
          <div className="bg-indigo-600 text-white rounded-t-xl p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white p-1 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Assistant</h3>
                <p className="text-xs text-indigo-200">Online • Ready to help</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-indigo-200 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="mr-2 mt-1">
                    <div className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-indigo-500 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick questions */}
          <div className="px-4 pt-2 pb-1 bg-gray-50 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Quick questions:</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full px-3 py-1 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`bg-indigo-600 text-white rounded-r-lg px-4 py-2 ${
                  inputValue.trim() ? 'hover:bg-indigo-700' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;