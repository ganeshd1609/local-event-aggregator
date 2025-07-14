const API_KEY = "AIzaSyADhZDSTVRx0mC1bTy5HyMcdlbPE8a5pgs"; // 🔁 Replace with your Gemini API key from Google AI Studio

export async function getGeminiResponse(prompt) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  // If you're using 2.0 Flash, still use 1.5-flash as endpoint (as of July 2025)

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts
    ) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.warn("No valid response from Gemini:", data);
      return "No suggestions found.";
    }
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "Failed to get response from Gemini.";
  }
}
