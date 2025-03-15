import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from()
        }
    }
}