import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { question } = await req.json();

        // Ensure the question is not empty
        if (!question.trim()) {
            return NextResponse.json({ answer: "Please ask a question!" }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ answer: "API key missing!" }, { status: 500 });
        }

        const openAiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Or you can use "gpt-4" if you have access
                messages: [{ role: "user", content: question }],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json({
            answer: openAiResponse.data.choices[0].message.content,
        });
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return NextResponse.json(
            { answer: "Something went wrong! Please try again later." },
            { status: 500 }
        );
    }
}
