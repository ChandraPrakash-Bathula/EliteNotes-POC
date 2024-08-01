import { useRef, useState } from "react";
import openai from "../utils/openai"; // Adjust the path as needed

const Translation = () => {
  const inputText = useRef(null);
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("telugu");

  const handleTranslateClick = async () => {
    setLoading(true);
    const textToTranslate = inputText.current.value;

    // Check if the input text and target language are the same
    const detectedLanguage = detectLanguage(textToTranslate); // A function to detect the language
    if (detectedLanguage === targetLanguage) {
      setTranslatedText(`Query and result are in the same language: ${textToTranslate}`);
      setLoading(false);
      return;
    }

    const gptQuery = `Translate the following text to ${targetLanguage}: ${textToTranslate}`;

    try {
      const gptTranslationResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (gptTranslationResults.choices[0]?.message?.content) {
        setTranslatedText(gptTranslationResults.choices[0]?.message?.content);
      } else {
        setTranslatedText("Error in translating the text.");
      }
    } catch (error) {
      console.error("Error in translating the text:", error);
      setTranslatedText("Error in translating the text.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const detectLanguage = (text) => {
    // Simple language detection logic (you can enhance this with a more robust solution)
    // This is a basic example and might not cover all cases
    if (/[\u0C00-\u0C7F]/.test(text)) return "telugu";
    if (/[\u0900-\u097F]/.test(text)) return "hindi";
    if (/[\u0900-\u094F]/.test(text)) return "marathi";
    return "english";
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
            placeholder="Enter text to translate"
          ></textarea>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="p-4 m-4 col-span-12 bg-gray-200 rounded-lg"
          >
            <option value="telugu">Telugu</option>
            <option value="hindi">Hindi</option>
            <option value="marathi">Marathi</option>
            <option value="english">English</option>
          </select>
          <button
            className="py-2 px-4 rounded-lg bg-red-600 text-white col-span-12 m-4"
            onClick={handleTranslateClick}
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </form>
      </div>
      <div className="pt-4 flex justify-center">
        <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Translation</h3>
          <p>{translatedText}</p>
          {translatedText && (
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

export default Translation;