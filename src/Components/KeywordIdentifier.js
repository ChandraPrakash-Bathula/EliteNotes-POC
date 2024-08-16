import { useRef, useState } from "react";
import openai from "../utils/openai"; // Adjust the path as needed

const KeywordIdentifier = () => {
  const inputText = useRef(null);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const handleCopy = () => {
    navigator.clipboard.writeText(keywords);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  const handleIdentifyClick = async () => {
    setLoading(true);
    const textToIdentify = inputText.current.value;

    const gptQuery = `Identify the keywords from the following text: ${textToIdentify}`;

    try {
      const gptKeywordResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (gptKeywordResults.choices[0]?.message?.content) {
        setKeywords(gptKeywordResults.choices[0]?.message?.content);
      } else {
        setKeywords("Error in identifying keywords.");
      }
    } catch (error) {
      console.error("Error in identifying keywords:", error);
      setKeywords("Error in identifying keywords.");
    }
    setLoading(false);
  };

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(keywords);
  // };

  return (
    <>
    <div className="bg-gray-100 p-6 rounded-md">
      <div className="pt-4 flex justify-center">
        <form
          className="bg-black w-full rounded-md md:w-1/2 grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <textarea
            ref={inputText}
            rows="10"
            className="p-4 m-4 col-span-12"
            placeholder="Enter text to identify keywords"
          ></textarea>
          <button
            className="py-2 px-4 rounded-lg bg-red-600 text-white col-span-12 m-4"
            onClick={handleIdentifyClick}
            disabled={loading}
          >
            {loading ? "Identifying..." : "Identify Keywords"}
          </button>
        </form>
      </div>
      <div className="pt-4 flex justify-center">
      <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg max-h-32 overflow-y-auto">
          <h3 className="text-xl font-bold mb-2">Keywords</h3>
          <p>{keywords}</p>
          {keywords && (
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

export default KeywordIdentifier;
