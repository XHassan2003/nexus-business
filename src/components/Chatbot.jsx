// src/components/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("idle");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setApiStatus("loading");

    try {
      const botReply = await sendMessageToGemini(input);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      setApiStatus("success");
    } catch (err) {
      console.error("API Error:", err);
      setMessages((prev) => [...prev, { 
        role: "bot", 
        text: `⚠️ ${err.message || "Please check your API key and try again"}`
      }]);
      setApiStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-[28rem] bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <h2 className="text-sm font-semibold">Gemini Assistant</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === "success" ? "bg-green-400" : 
                apiStatus === "error" ? "bg-red-400" : "bg-yellow-400"
              }`}></div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto text-sm bg-gray-50 flex flex-col">
            <div className="space-y-3 flex-1">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[90%] ${
                    msg.role === "user"
                      ? "bg-indigo-500 text-white self-end ml-auto"
                      : "bg-white border text-gray-700 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="p-3 bg-white border rounded-lg self-start w-16 flex justify-center">
                  <Loader2 className="animate-spin text-indigo-600" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-2 border-t flex gap-2 bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        >
          <MessageSquare className="stroke-white" />
        </button>
      )}
    </div>
  );
}

// src/gemini.js
export async function sendMessageToGemini(message) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!API_KEY) {
    throw new Error("API key not found. Please add VITE_GEMINI_API_KEY to your .env file");
  }

  try {
    // Updated API endpoint with correct model name
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": window.location.origin
        },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{ text: message }]
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        }),
      }
    );

    const data = await response.json();
    
    // Check for API errors
    if (!response.ok) {
      const errorMsg = data?.error?.message || "API request failed";
      throw new Error(`Gemini API Error: ${errorMsg}`);
    }
    
    // Check for blocked content
    if (data?.promptFeedback?.blockReason) {
      return `⚠️ Content blocked: ${data.promptFeedback.blockReason}`;
    }
    
    // Extract response text
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (responseText) {
      return responseText;
    }
    
    // If no valid response found
    throw new Error("Unexpected response format from Gemini API");

  } catch (err) {
    console.error("API Error:", err);
    throw new Error(`Failed to get response from Gemini: ${err.message}`);
  }
}