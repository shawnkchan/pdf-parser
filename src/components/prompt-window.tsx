import { fileToGenerativePart } from "@/app/api/gemini/gemini";
import React, { useState } from "react";

export default function PromptWindow({ pdfUrl }: { pdfUrl: string }) {
  const [geminiResponse, setGeminiResponse] = useState("");

  async function callGemini(
    e: React.FormEvent,
    pdfUrl: string,
    prompt: string
  ) {
    e.preventDefault();

    console.log(prompt);
    const res = await fileToGenerativePart(pdfUrl, prompt);
    console.log("Response:", res);
    if (typeof res === "string") {
      setGeminiResponse(res);
      console.log("Gemini response:", geminiResponse);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* output area */}
      <div className="w-[30rem] h-[40rem] overflow-y-scroll ">
        <p className="break-words whitespace-normal w-full max-w-full">
          {geminiResponse}
        </p>
      </div>
      {/* input area */}
      <div>
        <form
          className="h-[3rem] bg-stone-300 rounded-full"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const prompt = formData.get("prompt") as string;
            callGemini(e, pdfUrl, prompt);
          }}
        >
          <label htmlFor="prompt" className="sr-only"></label>
          <input
            type="text"
            name="prompt"
            className="w-full h-full px-4 rounded-full"
            placeholder="Ask about your PDF"
          />
        </form>
      </div>
    </div>
  );
}
