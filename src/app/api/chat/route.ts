import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://your-site.com",
          "X-Title": "Money Map",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: "Chat API failed" }, { status: 500 });
  }
}
