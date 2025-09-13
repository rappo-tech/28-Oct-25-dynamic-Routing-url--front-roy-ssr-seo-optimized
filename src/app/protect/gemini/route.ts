// app/api/gemini/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
  console.log(`question: ${message}`);

  const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    }
  );

  const data = await res.json();
  console.log("Full Gemini response:", JSON.stringify(data, null, 2));

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  return NextResponse.json({ text }); // ✅ return only the answer
}
























