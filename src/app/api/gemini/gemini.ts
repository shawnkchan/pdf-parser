import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fileToGenerativePart(path: string, prompt: string) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const pdfResp = await fetch(path).then((res) => res.arrayBuffer());

  await model
    .generateContent([
      {
        inlineData: {
          data: Buffer.from(pdfResp).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      prompt,
    ])
    .then((res) => {
      if (res.response) {
        console.log(res.response.text());
        return res.response.text();
      } else {
        return "No response";
      }
    });
}
