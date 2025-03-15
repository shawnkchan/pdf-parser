


export default function PromptWindow() {
    return (
      <div className="flex flex-col gap-4">
        {/* output area */}
        <div className="w-[30rem] h-[40rem] overflow-y-scroll ">
          <p className="break-words whitespace-normal w-full max-w-full">
          </p>
        </div>
        {/* input area */}
        <div>
          <form className="h-[3rem] bg-stone-300 rounded-full">
            <input
              type="text"
              className="w-full h-full px-4 rounded-full"
              placeholder="Ask about your PDF"
            />
          </form>
        </div>
      </div>
    );
  }
  