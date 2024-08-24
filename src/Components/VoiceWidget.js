import React, { useState, useRef } from "react";
import { useLeopard } from "@picovoice/leopard-react";
import { LEOPARD_API_KEY } from "../utils/constants";
import Dialog from "./Dialog";
import TextSummarization from "./TextSummarization";
import InformationRetrieval from "./InformationRetrieval";
import Translation from "./Translation";
import KeywordIdentifier from "./KeywordIdentifier";
import FileSummarizer from "./FileSummarizer";
import { Link } from 'react-router-dom';
import Linkedin from '../utils/linkedin.png';
import Facebook from "../utils/facebook.png";
import Twitter from "../utils/twitter.png";
import Address from "../utils/address.svg";
import Phone from "../utils/phone.svg";
import Email from "../utils/mail.svg";
import { isUploadable } from "openai/uploads";

export default function VoiceWidget() {
  const {
    isLoaded,
    error,
    result,
    init,
    processFile,
    stopRecording,
    startRecording,
    isRecording,
  } = useLeopard();

  const [isInitialized, setIsInitialized] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const inputText = useRef(null);

  const [isTextSummaryOpen, setIsTextSummaryOpen] = useState(false);
  const [isInfoRetrievalOpen, setIsInfoRetrievalOpen] = useState(false);
  const [isTranslationOpen, setIsTranslationOpen] = useState(false);
  const [isKeywordsOpen, setIsKeywordsOpen] = useState(false);
  const [isFileSummaryOpen, setIsFileSummaryOpen] = useState(false);

  const toggleInitEngine = async () => {
    if (isInitialized) {
      setIsInitialized(false);
      // Additional logic to deinitialize if needed
    } else {
      await init(
        LEOPARD_API_KEY,
        {
          publicPath: "/leopard_params.pv",
          forceWrite: true,
        },
        {
          enableAutomaticPunctuation: true,
        }
      );
      setIsInitialized(true);
    }
  };

  const startVideoStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const stopVideoStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startVideoMeeting = async () => {
    await startVideoStream();
    await startRecording();
  };

  const stopVideoMeeting = async () => {
    stopVideoStream();
    await stopRecording();
  };

  const toggleVideoMeeting = async () => {
    if (isRecording) {
      await stopVideoMeeting();
    } else {
      await startVideoMeeting();
    }
  };

  const handleSummarizeClick = async () => {
    setLoading(true);
    const textToSummarize = inputText.current.value;

    const gptQuery = `Summarize the following text: ${textToSummarize}`;

    try {
      const response = await fetch('/api/summarize', { // Adjust the endpoint as necessary
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: gptQuery }),
      });

      const data = await response.json();

      if (data.summary) {
        setSummary(data.summary);
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
<main className="bg-rose-300">
<div className="h-[86vh] flex flex-col md:flex-row justify-around items-center pt-52 lg:pt-16 md:pt-28 px-4 lg:px-0 md:px-0 space-y-4 md:space-y-0 md:space-x-4">
  {/* Transcript Section */}
  <div className="flex flex-col w-full md:w-[30%] h-[400px] bg-white rounded-lg shadow-lg p-4">
    <button
      onClick={toggleInitEngine}
      className={`text-white px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 ${
        isInitialized ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {isInitialized ? "Deinitialize Transcription" : "Initialize Transcription"}
    </button>
    <label htmlFor="audio-file" className="block text-gray-700 font-medium mb-2">
      Choose audio file to transcribe:
    </label>
    <input
      id="audio-file"
      type="file"
      accept="audio/*"
      disabled={!isLoaded}
      onChange={async (e) => {
        if (!!e.target.files?.length) {
          await processFile(e.target.files[0]);
        }
      }}
      className="w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <h3 className="text-gray-700 font-medium mb-2">Transcript:</h3>
    <p className="bg-gray-100 p-2 rounded-md overflow-y-auto max-h-80">
      {result?.transcript}
    </p>
  </div>

  {/* Video Meeting Section */}
  <div className="flex flex-col w-full md:w-[40%] h-[450px] bg-black rounded-lg shadow-lg p-4">
    <label htmlFor="audio-record" className="block text-gray-300 font-medium mb-2">
      Record audio to transcribe
    </label>
    <button
      id="audio-record"
      disabled={!isLoaded}
      onClick={toggleVideoMeeting}
      className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
        isRecording ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {isRecording ? "Stop Video Meeting" : "Start Video Meeting"}
    </button>
    {isInitialized && (
      <video ref={videoRef} className="w-full mt-4 rounded-md" autoPlay playsInline muted />
    )}
    {error && <p className="text-red-500 mt-4">{error.toString()}</p>}
  </div>
</div>

<section className="relative overflow-hidden mt-2 mx-3">
  <span className="text-xl text-green-500 p-2 block">Also Try These...!!</span>
  <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 md:space-x-4 pb-8">
    {[
      { label: "Language Translation", icon: "translate", onClick: () => setIsTranslationOpen(true) },
      { label: "File Summarization", icon: "task", onClick: () => setIsFileSummaryOpen(true) },
      { label: "Keywords Identification", icon: "key_visualizer", onClick: () => setIsKeywordsOpen(true) },
      { label: "Text Summarization", icon: "summarize", onClick: () => setIsTextSummaryOpen(true) },
      { label: "Information Retrieval", icon: "query_stats", onClick: () => setIsInfoRetrievalOpen(true) },
    ].map((button, index) => (
      <button
        key={index}
        onClick={button.onClick}
        className="flex items-center w-[300px] text-center border bg-white border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="material-symbols-outlined mr-2">
          {button.icon}
        </span>
        {button.label}
      </button>
    ))}
  </div>
</section>

<section>
      <Dialog
        isOpen={isTextSummaryOpen}
        onClose={() => setIsTextSummaryOpen(false)}
        onSubmit={() => console.log("Submit Text Summary")}
        title="Text Summary"
      >
        <TextSummarization />
      </Dialog>

      <Dialog
        isOpen={isInfoRetrievalOpen}
        onClose={() => setIsInfoRetrievalOpen(false)}
        onSubmit={() => console.log("Submit Info Retrieval")}
        title="Info Retrieval"
      >
        <InformationRetrieval />
      </Dialog>

      <Dialog
        isOpen={isTranslationOpen}
        onClose={() => setIsTranslationOpen(false)}
        onSubmit={() => console.log("Submit Language Translation")}
        title="Language Translation"
      >
        <Translation />
      </Dialog>

      <Dialog
        isOpen={isKeywordsOpen}
        onClose={() => setIsKeywordsOpen(false)}
        onSubmit={() => console.log("Submit Keywords")}
        title="Keywords"
      >
        <KeywordIdentifier />
      </Dialog>

      <Dialog
        isOpen={isFileSummaryOpen}
        onClose={() => setIsFileSummaryOpen(false)}
        onSubmit={() => console.log("Submit File Summary")}
        title="File Summary"
      >
        <FileSummarizer />
      </Dialog>
      </section>
      </main>
      <footer className="w-screen bg-gray-800 py-12 text-white ">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>
                  <img src={Phone} alt="Phone" className="inline-block w-5 h-5 mr-2" />
                  +91 77018 15890
                </li>
                <li>
                  <img src={Email} alt="Email" className="inline-block w-5 h-5 mr-2" />
                  workingonmymindset@gmail.com
                </li>
                <li>
                  <img src={Address} alt="Location" className="inline-block w-5 h-5 mr-2" />
                  Gurugram, Haryana 122001, INDIA
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2  md:pl-32 lg:pl-32 pl-40">
                <li>
                  <a href="https://www.linkedin.com/company/elitenotes/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <img src={Facebook} alt="Facebook" className="inline-block w-5 h-5 mr-2" />
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/elitenotes/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <img src={Twitter} alt="Twitter" className="inline-block w-5 h-5 mr-2" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/elitenotes/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <img src={Linkedin} alt="LinkedIn" className="inline-block w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.linkedin.com/company/elitenotes" className="hover:underline">About Us</a>
                </li>
                <li>
                <a href="https://www.linkedin.com/company/elitenotes" className="hover:underline">Careers</a>
                </li>
                <li>
                <a href="https://www.linkedin.com/company/elitenotes" className="hover:underline">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <p>&copy; 2023 Elite Notes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

async function getToken() {
  // Replace this with the actual implementation to get a temporary token from your server
  const response = await fetch("/api/get-token"); // Example endpoint to get the token
  const data = await response.json();
  return data.token;
}