import React, { useState } from "react";
import { getGeminiResponse } from "../gemini";


const EventSuggestions = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const res = await getGeminiResponse(prompt);
      setResponse(res);
    } catch (err) {
      setError("Failed to get response from Gemini API.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-gradient-to-br from-cyan-950/90 to-gray-900/90 rounded-2xl shadow-2xl border border-cyan-700/40">
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold text-cyan-300 tracking-tight">Event Suggestions (Gemini AI)</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-2">
        <input
          type="text"
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
          placeholder="Type your prompt (e.g. Suggest 3 tech events in New York)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 px-6 rounded-lg transition-colors shadow-md"
          disabled={loading}
        >
          {loading ? "Asking Gemini..." : "Ask Gemini"}
        </button>
      </form>
      {error && <div className="text-red-400 mt-4">{error}</div>}
      {response && (
        <div className="mt-6 p-5 bg-cyan-950/60 rounded-xl text-white border border-cyan-700/30 shadow-inner">
          <div className="mb-2">
            <strong className="text-cyan-200">Gemini says:</strong>
          </div>
          <div className="whitespace-pre-line text-cyan-100 leading-relaxed">{response}</div>
        </div>
      )}
    </div>
  );
};

export default EventSuggestions; 