import { useRef, useState, useEffect } from "react";
import openai from "../utils/openai"; // Adjust the path as needed
import * as XLSX from "xlsx";

const FileSummarizer = () => {
  const inputFileRef = useRef(null);
  const [fileContent, setFileContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  useEffect(() => {
    const loadPDFJs = async () => {
      const script = document.createElement("script");
      script.src = "/pdfjs/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "/pdfjs/pdf.worker.min.js";
        console.log("PDF.js loaded");
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadPDFJs();
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;

      if (fileType === "application/pdf") {
        // Handle PDF file
        const reader = new FileReader();
        reader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          const pdfjs = window.pdfjsLib;
          const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str).join(" ");
            text += pageText + " ";
          }
          setFileContent(text);
        };
        reader.readAsArrayBuffer(file);
      } else if (
        fileType ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        fileType === "application/vnd.ms-excel"
      ) {
        // Handle Excel file
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const text = XLSX.utils.sheet_to_csv(worksheet);
          setFileContent(text);
        };
        reader.readAsArrayBuffer(file);
      } else {
        // Handle plain text or unsupported file type
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          setFileContent(text);
        };
        reader.readAsText(file);
      }
    }
  };

  const generateSummary = async () => {
    setLoading(true);

    const gptQuery = `Summarize the following text: ${fileContent}`;

    try {
      const gptSummaryResults = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              gptQuery +
              "Act as a summarizer tool and only give the summary of the text or images that is present in the document. If no file is uploaded say there is not document to summarize. If same document is uploaded again and again give the same result.",
          },
        ],
        model: "gpt-3.5-turbo",
      });

      if (gptSummaryResults.choices[0]?.message?.content) {
        setSummary(gptSummaryResults.choices[0]?.message?.content);
      } else {
        setSummary("Error in generating summary.");
      }
    } catch (error) {
      console.error("Error in generating summary:", error);
      setSummary("Error in generating summary.");
    }
    setLoading(false);
  };

  //   const handleCopy = () => {
  //     navigator.clipboard.writeText(summary);
  //   };

  return (
    <>
      <div className="bg-gray-100 rounded-md p-6">
        <div className="pt-10 flex justify-center">
          <form
            className="bg-sky-800 rounded-md w-full md:w-1/2 grid grid-cols-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="file"
              ref={inputFileRef}
              className="p-4 m-4 col-span-12"
              onChange={handleFileChange}
              accept=".txt,.pdf,.xls,.xlsx"
            />
            <button
              className="py-2 px-4 rounded-lg bg-red-600 text-white col-span-12 m-4"
              onClick={() => inputFileRef.current.click()}
              disabled={loading}
            >
              {loading ? "Loading..." : "Upload File"}
            </button>
            {fileContent && (
              <button
                className="py-2 px-4 rounded-lg bg-green-600 text-white col-span-12 m-4"
                onClick={generateSummary}
                disabled={loading}
              >
                {loading ? "Summarizing..." : "Submit"}
              </button>
            )}
          </form>
        </div>
        <div className="pt-4 flex justify-center">
          <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg  max-h-32 overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Summary</h3>
            <p>{summary}</p>
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

export default FileSummarizer;
