// src/gemini.js
export async function sendMessageToGemini(message) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=YOUR_API_KEY
=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": window.location.origin // Required for security
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
    
    // Improved error handling
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else if (data?.promptFeedback?.blockReason) {
      return "⚠️ Content blocked: " + data.promptFeedback.blockReason;
    } else {
      console.error("Unexpected response:", data);
      return "❌ Could not process response";
    }
  } catch (err) {
    console.error("API Error:", err);
    return "⚠️ Network error. Please try again.";
  }
}