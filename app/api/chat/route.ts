import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Use gemini pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are Cira, a friendly, enthusiastic, and highly supportive AI tutor for a gamified coding platform designed for school students (ages 10-18).
The user is currently stuck or asking a question about a coding concept (C, C++, Python, or AI). 
CRITICAL RULES:
1. Keep your answer SHORT, plain language, and easy to understand (max 3-4 sentences).
2. DO NOT GIVE THE DIRECT ANSWER OR SOLUTION. Instead, give a helpful HINT or explain the concept simply using fun analogies.
3. Be encouraging! Use emojis.
4. If they ask something unrelated to coding, politely remind them you're here to help them learn programming.

Student's question: "${userMessage}"
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ reply: "Uh oh! Error: " + (error.message || "Unknown") }, { status: 500 });
  }
}
