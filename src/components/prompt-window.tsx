import { fileToGenerativePart } from "@/app/api/gemini/gemini";
import React, { useState } from "react";

export default function PromptWindow({ pdfUrl }: { pdfUrl: string }) {
  const [geminiResponse, setGeminiResponse] = useState("");
  const [waiting, setWaiting] = useState(false);

  async function callGemini(
    e: React.FormEvent,
    pdfUrl: string,
    prompt: string
  ) {
    e.preventDefault();
    setGeminiResponse("");
    setWaiting(true);
    const res = await fileToGenerativePart(pdfUrl, prompt);
    if (typeof res === "string") {
      setGeminiResponse(res);
      setWaiting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* output area */}
      <div className="w-[30rem] h-[40rem] overflow-y-scroll ">
        {waiting && (
          <div className="animate-pulse flex justify-center items-center h-full text-xl font-extrabold">
              <p>Scanning document...</p>
          </div>
        )}
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
            placeholder="Search for insights"
          />
        </form>
      </div>
    </div>
  );
}
