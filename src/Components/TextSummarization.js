import { useRef, useState } from "react";
import openai from "../utils/openai"; // Adjust the path as needed

const TextSummarization = () => {
  const inputText = useRef(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarizeClick = async () => {
    setLoading(true);
    const textToSummarize = inputText.current.value;

    const gptQuery = `Summarize the following text: ${textToSummarize}`;

    try {
      const gptSummaryResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
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

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <>
      <div className="pt-10 flex justify-center">
        <form
          className="bg-black w-full md:w-1/2 grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <textarea
            ref={inputText}
            rows="10"
            className="p-4 m-4 col-span-12"
            placeholder="Enter text to summarize"
          ></textarea>
          <button
            className="py-2 px-4 rounded-lg bg-red-600 text-white col-span-12 m-4"
            onClick={handleSummarizeClick}
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </form>
      </div>
      <div className="pt-4 flex justify-center">
        <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Summary</h3>
          <p>{summary}</p>
          {summary && (
            <button
              className="py-2 px-4 rounded-lg bg-blue-600 text-white mt-4"
              onClick={handleCopy}
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TextSummarization;