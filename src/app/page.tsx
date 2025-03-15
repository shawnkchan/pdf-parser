"use client";
import PromptWindow from "@/components/prompt-window";

function submitFile(e: React.FormEvent) {
  e.preventDefault();
  const formData = new FormData();
  const fileInput = document.querySelector(
    "input[type=file]"
  ) as HTMLInputElement;
  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    console.log("No file uploaded");
    return;
  }
  formData.append("file", fileInput.files[0]);
  fetch("/api/upload", {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok) {
      console.log("File uploaded successfully");
    } else {
      console.error("Failed to upload file");
    }
  });
}

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
        <form className="flex gap-2 flex-row" onSubmit={submitFile}>
          <input
            type="file"
            name="file"
            accept=".pdf"
            className="p-2 pl-6 rounded-full w-[15rem] bg-stone-300 hover:bg-stone-500 hover:text-white"
            required
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-stone-300 hover:bg-stone-500 hover:text-white cursor-grab w-[6rem]"
          >
            Upload
          </button>
        </form>
        <PromptWindow />
      </div>
    </div>
  );
}
