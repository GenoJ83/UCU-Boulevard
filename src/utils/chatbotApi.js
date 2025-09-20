


const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
// Optionally, set up a proxy endpoint for production security
// const PROXY_URL = "/api/chat/completions";

let conversationHistory = [
  {
    role: "system",
    content: `You are a helpful AI assistant for a university marketplace. Guide users about common items and recommend items based on their budget.`
  }
];

// Clear conversation history except system prompt
export function clearChatbotHistory() {
  conversationHistory = conversationHistory.filter(msg => msg.role === "system");
}

// Main chat function
export async function fetchChatbotResponse(userMessage) {
  // Add user message to history
  conversationHistory.push({ role: "user", content: userMessage });

  const body = {
    model: "qwen/qwen1.5-72b-chat",
    messages: conversationHistory,
    temperature: 0.7,
    max_tokens: 500
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "UCU Boulevard"
  };

  // Try direct API call first
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Direct API call failed");
    const data = await res.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    if (aiResponse) {
      conversationHistory.push({ role: "assistant", content: aiResponse });
    }
    return aiResponse || "Sorry, I couldn't understand that.";
  } catch (error) {
    // Optionally, try a proxy endpoint here if you have one set up
    // try {
    //   const proxyRes = await fetch(PROXY_URL, { method: "POST", headers, body: JSON.stringify(body) });
    //   if (!proxyRes.ok) throw new Error("Proxy API call failed");
    //   const proxyData = await proxyRes.json();
    //   const aiResponse = proxyData.choices?.[0]?.message?.content;
    //   if (aiResponse) {
    //     conversationHistory.push({ role: "assistant", content: aiResponse });
    //   }
    //   return aiResponse || "Sorry, I couldn't understand that.";
    // } catch (proxyError) {
    //   throw proxyError;
    // }
    throw error;
  }
}
