import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fileToGenerativePart(path: string, prompt: string) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const pdfResp = await fetch(path).then((res) => res.arrayBuffer());

  try {
    const response = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(pdfResp).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      prompt,
    ]);

    if (response.response) {
      const text = await response.response.text();
      return text;
    } else {
      console.log("Invalid response:", response);
      return "Invalid response";
    }
  } catch (error) {
    console.error("Failed to generate content", error);
    return "Failed to generate content";
  }
}
