import PromptWindow from "@/components/prompt-window";

export default function Home() {
  return (
    <div className="flex flex-row p-2 gap-4 justify-evenly h-screen">
      {/* PDF preview area */}
      <div className="border-2 rounded-md w-full">
        <iframe
          src="/pdfs/1626711790000-sample.pdf"
          className="w-full h-full"
        ></iframe>
      </div>
      {/* User input area */}
      <div className="w-1/3 flex flex-col gap-4 justify-center">
        {/* Upload PDF */}
        <form className="flex gap-2 flex-row">
          <input
            type="file"
            name="file"
            className="border-2 p-2 rounded-md w-[15rem] hover: cursor-grab"
            required
          />
          <button
            type="submit"
            className="border-2 p-2 rounded-md hover: cursor-grab w-[6rem] bg-stone-300"
          >
            Upload
          </button>
        </form>
        <PromptWindow />
      </div>
    </div>
  );
}
