import { fileToGenerativePart } from "@/app/api/gemini/gemini";

async function callGemini(e: React.FormEvent, pdfUrl: string, prompt: string) {
  e.preventDefault();
  await fileToGenerativePart(pdfUrl, prompt).then((res) => {
    console.log(res);
  });
}

export default function PromptWindow({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="flex flex-col gap-4">
      {/* output area */}
      <div className="w-[30rem] h-[40rem] overflow-y-scroll ">
        <p className="break-words whitespace-normal w-full max-w-full"></p>
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
