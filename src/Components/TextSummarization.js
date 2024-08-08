import { useRef, useState } from "react";
import openai from "../utils/openai"; // Adjust the path as needed

const TextSummarization = () => {
  const inputText = useRef(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  const handleSummarizeClick = async () => {
    setLoading(true);
    const textToSummarize = inputText.current.value;

    const gptQuery = `Summarize the following text: ${textToSummarize}`;

    try {
      const gptSummaryResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery + " Don't give any summary if the input is empty. Just say there is no text to summarize in case of empty box. And only give the text summary according to the text but not any other text."}],
        model: "gpt-3.5-turbo",
      });

      if (gptSummaryResults.choices[0]?.message?.content) {
        setSummary(gptSummaryResults.choices[0]?.message?.content);
      } else {
        setSummary("Error in summarizing the text.");
      }
    } catch (error) {
      console.error("Error in summarizing the text:", error);
      setSummary("Error in summarizing the text.");
    }
    setLoading(false);
  };

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(summary);
  // };

  return (
    <>
    <div className="bg-gray-100 p-6" >
    <div className="flex flex-col items-center justify-center md:flex-grow pt-4">
  <form
    className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4"
    onSubmit={(e) => e.preventDefault()}
  >
    <div className="w-full max-w-xl bg-white border border-gray-300 p-4 mb-4">
      <textarea
        ref={inputText}
        rows="10"
        className="w-full h-64 p-2 border border-gray-400 rounded-md outline-none resize-none"
        placeholder="Enter text to summarize"
      ></textarea>
    </div>
    <button
      className={`w-full px-4 py-2 rounded-md text-white mb-4 ${
        loading ? "bg-gray-500" : "bg-red-500"
      }`}
      onClick={handleSummarizeClick}
      disabled={loading}
    >
      {loading ? "Summarizing..." : "Summarize"}
    </button>
  </form>
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 className="text-gray-700 font-medium mb-2">Summary</h3>
    <div className="bg-gray-100 p-2 rounded-md max-h-28 overflow-y-auto">
      <p>{summary}</p>
    </div>
    {summary && (
       <button
       className={`py-2 px-4 rounded-lg mt-4 text-white ${
         copyButtonText === "Copied!" ? "bg-green-600" : "bg-blue-600"
       }`}
       onClick={handleCopy}
     >
       {copyButtonText}
     </button>
    )}
  </div>
</div>
</div>
    </>
  );
};

export default TextSummarization;