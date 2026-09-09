import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Fallback intelligent hint engine when offline or network fails
function getOfflineTutorResponse(message: string, level?: string, currentStep?: number): string {
  const query = message.toLowerCase().trim();

  // Level-specific hints
  if (level === 'c') {
    if (query.includes('hint') || query.includes('answer') || query.includes('help') || query.includes('stuck')) {
      if (currentStep === 1 || query.includes('print') || query.includes('hello')) {
        return "💡 Hint for C: In C, we print text using `printf(\"...\");`! Notice the 'f' at the end stands for 'formatted'!";
      }
      if (currentStep === 2 || query.includes('variable') || query.includes('int') || query.includes('number')) {
        return "💡 Hint for C: Whole numbers in C use the `int` data type, for example: `int score = 100;`! Don't forget the semicolon `;`!";
      }
      if (currentStep === 3 || query.includes('if') || query.includes('condition')) {
        return "💡 Hint for C: To check conditions, write `if (score >= 50)`! Enclose the condition in parentheses `()`!";
      }
    }
    if (query.includes('printf')) {
      return "🚀 `printf()` sends text to the screen console. Don't forget to include `#include <stdio.h>` and put quotes around your words!";
    }
    if (query.includes('semicolon') || query.includes(';')) {
      return "📌 In C, almost every statement ends with a semicolon `;`! It tells the computer that a command is complete.";
    }
  }

  if (level === 'cpp') {
    if (query.includes('hint') || query.includes('answer') || query.includes('help') || query.includes('stuck')) {
      if (currentStep === 1 || query.includes('print') || query.includes('cout')) {
        return "💡 Hint for C++: We print using `std::cout << \"...\";`! Think of `<<` as pushing words out to the screen!";
      }
      if (currentStep === 2 || query.includes('class') || query.includes('object')) {
        return "💡 Hint for C++: A blueprint is declared with the keyword `class Robot { public: ... };`! Remember the closing semicolon `;`!";
      }
      if (currentStep === 3 || query.includes('method') || query.includes('function')) {
        return "💡 Hint for C++: To call a member method on an object `bot`, use the dot operator: `bot.sayHello();`!";
      }
    }
    if (query.includes('cout') || query.includes('stream')) {
      return "✨ `std::cout` is the standard character output stream. The insertion operator `<<` sends data right into it!";
    }
  }

  if (level === 'python') {
    if (query.includes('hint') || query.includes('answer') || query.includes('help') || query.includes('stuck')) {
      if (currentStep === 1 || query.includes('print') || query.includes('string')) {
        return "💡 Hint for Python: In Python, printing is super clean: `print(\"Hello Python!\")` without any semicolons needed!";
      }
      if (currentStep === 2 || query.includes('list') || query.includes('loop') || query.includes('for')) {
        return "💡 Hint for Python: Loops look like `for item in items:` — remember the colon `:` at the end of the line!";
      }
      if (currentStep === 3 || query.includes('def') || query.includes('function')) {
        return "💡 Hint for Python: Define reusable functions using `def function_name():`! Python uses indentation instead of curly braces `{}`.";
      }
    }
    if (query.includes('snake') || query.includes('python')) {
      return "🐍 Python is named after Monty Python's Flying Circus, not the snake! It's famous for its clean, readable syntax.";
    }
  }

  if (level === 'ai') {
    if (query.includes('hint') || query.includes('answer') || query.includes('help') || query.includes('stuck')) {
      if (currentStep === 1 || query.includes('prompt')) {
        return "💡 Hint for AI: A prompt is the instruction you give to the AI model. Clear, specific instructions yield the best answers!";
      }
      if (currentStep === 2 || query.includes('training') || query.includes('dataset')) {
        return "💡 Hint for AI: Machine Learning models learn patterns from examples called 'training data' rather than hardcoded rules!";
      }
      if (currentStep === 3 || query.includes('token') || query.includes('weights')) {
        return "💡 Hint for AI: Neural networks have adjustable numbers called 'weights' that determine how information flows through the artificial neurons!";
      }
    }
  }

  // General questions
  if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
    return "👋 Hi there! I'm Cira, your coding spark companion! Ask me for a hint, explain any code block, or let me know what you're stuck on!";
  }

  if (query.includes('who are you') || query.includes('what is cira')) {
    return "🤖 I'm Cira! An AI tutor designed to make learning C, C++, Python, and AI super fun and easy to understand!";
  }

  if (query.includes('variable')) {
    return "📦 Think of a variable like a labeled box! You put a value inside (like a number or name), and you can open it anytime using its label!";
  }

  if (query.includes('loop')) {
    return "🔄 A loop repeats an action multiple times without you having to copy-paste your code! Like doing 10 jumping jacks in a row!";
  }

  if (query.includes('function')) {
    return "🛠️ A function is a mini-machine: you give it inputs, it does some work, and it can give you back an output! Once made, you can use it anytime!";
  }

  return "✨ Great question! In coding, breaking problems down into tiny pieces is the secret sauce. Take a close look at the prompt, check your spelling and punctuation, and ask me if you want a specific clue!";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;
    const { level, currentStep, userApiKey } = body;

    if (!userMessage || typeof userMessage !== 'string') {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const effectiveApiKey = process.env.GEMINI_API_KEY || userApiKey;

    const prompt = `
You are Cira, a friendly, enthusiastic, and highly supportive AI tutor for a gamified coding platform designed for school students (ages 10-18).
The user is currently stuck or asking a question about a coding concept (C, C++, Python, or AI). 
${level ? `Current Track: ${level.toUpperCase()}` : ''}
${currentStep !== undefined ? `Current Challenge Step: ${currentStep}` : ''}

CRITICAL RULES:
1. Keep your answer SHORT, plain language, and easy to understand (max 3-4 sentences).
2. DO NOT GIVE THE DIRECT ANSWER OR SOLUTION. Instead, give a helpful HINT or explain the concept simply using fun analogies.
3. Be encouraging! Use emojis.
4. If they ask something unrelated to coding, politely remind them you're here to help them learn programming.

Student's question: "${userMessage}"
`;

    if (effectiveApiKey && effectiveApiKey.trim().length > 5) {
      try {
        const ai = new GoogleGenAI({ apiKey: effectiveApiKey.trim() });
        let responseText: string | undefined;

        try {
          const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });
          responseText = result.text;
        } catch (modelErr: any) {
          // If gemini-2.5-flash is not available, fallback to gemini-3.6-flash
          const result = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
          });
          responseText = result.text;
        }

        if (responseText) {
          return NextResponse.json({ reply: responseText, source: "gemini" });
        }
      } catch (genAiErr: any) {
        console.warn("GoogleGenAI call error, falling back to offline tutor:", genAiErr?.message || genAiErr);
      }
    }

    // Offline / fallback tutor response
    const offlineReply = getOfflineTutorResponse(userMessage, level, currentStep);
    return NextResponse.json({ reply: offlineReply, source: "local" });

  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({
      reply: "⚡ Cira is recharging sparks! Try asking: 'Give me a hint for this level!'",
      source: "fallback",
    }, { status: 200 });
  }
}
