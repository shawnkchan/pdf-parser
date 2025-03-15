"use client";
import PromptWindow from "@/components/prompt-window";
import { useState } from "react";

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  function submitFile(e: React.FormEvent, setPdfUrl: (url: string) => void) {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;

    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      console.error("No file uploaded");
      return;
    }

    formData.append("file", fileInput.files[0]);
    setUploading(true);

    setTimeout(() => {
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setPdfUrl(data.url);
            setUploading(false);
          } else {
            console.error("Invalid response:", data);
          }
        })
        .catch((error) => console.error("Failed to upload file", error));
    }, 2000);
  }

  return (
    <div className="flex flex-row p-2 gap-4 justify-evenly h-screen">
      {/* PDF preview area */}
      <div className="border-2 rounded-md w-full">
        {pdfUrl !== "" ? (
          <iframe src={pdfUrl} className="w-full h-full"></iframe>
        ) : (
          <p className="flex justify-center items-center h-full text-xl font-bold">
            No PDF uploaded. Choose a file and click Upload
          </p>
        )}
      </div>
      {/* User input area */}
      <div className="w-1/3 flex flex-col gap-4 justify-center">
        {/* Upload PDF */}
        <form
          className="flex gap-2 flex-row"
          onSubmit={(e) => submitFile(e, setPdfUrl)}
        >
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
            {uploading ? (
              <div className="flex justify-center items-center transition-transform">
                <svg
                  className="w-6 h-6 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                    fill="#000000"
                  />
                  <path
                    d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                    fill="#000000"
                  />
                </svg>
              </div>
            ) : (
              <p className="transition-transform">Upload</p>
            )}
          </button>
        </form>
        <PromptWindow pdfUrl={pdfUrl} />
      </div>
    </div>
  );
}
