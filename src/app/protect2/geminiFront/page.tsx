"use client";
import { useState } from "react";

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function handleSend() {
    if (!input.trim()) return;

    const res = await fetch("/protect/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input+"keep your response short in just 2 lines " }),
    });

    const data = await res.json();
    setResponse(data.text);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🤖 Gemini Chat</h1>

      <textarea
        className="w-full border rounded p-2 mb-2"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me something..."
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>

      {response && (
        <div className="mt-4 p-3 border rounded bg-red-500">
          <strong>Gemini says:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
