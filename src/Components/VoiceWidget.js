// import React from "react";
// import { useLeopard } from "@picovoice/leopard-react";

// export default function VoiceWidget() {
//   const {
//     isLoaded,
//     error,
//     result,
//     init,
//     processFile,
//     stopRecording,
//     startRecording,
//     isRecording,
//   } = useLeopard();

//   const initEngine = async () => {
//     await init(
//       "xqgqww/tPOZEjBhNDyZ1K54hpV+Ux4KG00HPYXAQoTPSmc5EixmwPQ==",
//       {
//         publicPath: "/leopard_params.pv",
//         forceWrite: true,
//       },
//       {
//         enableAutomaticPunctuation: true,
//       }
//     );
//   };

//   const toggleRecord = async () => {
//     if (isRecording) {
//       await stopRecording();
//     } else {
//       await startRecording();
//     }
//   };

//   return (
//     <div>
//       {error && <p className="error-message">{error.toString()}</p>}
//       <br />
//       <button onClick={initEngine} disabled={isLoaded}>
//         Initialize Leopard
//       </button>
//       <br />
//       <br />
//       <label htmlFor="audio-file">Choose audio file to transcribe:</label>
//       <input
//         id="audio-file"
//         type="file"
//         accept="audio/*"
//         disabled={!isLoaded}
//         onChange={async (e) => {
//           if (!!e.target.files?.length) {
//             await processFile(e.target.files[0]);
//           }
//         }}
//       />
//       <br />
//       <label htmlFor="audio-record">Record audio to transcribe:</label>
//       <button id="audio-record" disabled={!isLoaded} onClick={toggleRecord}>
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       <h3>Transcript:</h3>
//       <p>{result?.transcript}</p>
//     </div>
//   );
// }

// import React, { useState, useRef } from "react";
// import { useLeopard } from "@picovoice/leopard-react";
// import {LEOPARD_API_KEY} from '../utils/constants';

// export default function VoiceWidget() {
//   const {
//     isLoaded,
//     error,
//     result,
//     init,
//     processFile,
//     stopRecording,
//     startRecording,
//     isRecording,
//   } = useLeopard();

//   const [isInitialized, setIsInitialized] = useState(false);
//   const videoRef = useRef(null);
//   const [stream, setStream] = useState(null);

//   const toggleInitEngine = async () => {
//     if (isInitialized) {
//       setIsInitialized(false);
//       // Additional logic to deinitialize if needed
//     } else {
//       await init(
//         LEOPARD_API_KEY,
//         {
//           publicPath: "/leopard_params.pv",
//           forceWrite: true,
//         },
//         {
//           enableAutomaticPunctuation: true,
//         }
//       );
//       setIsInitialized(true);
//     }
//   };

//   const startVideoStream = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//     } catch (err) {
//       console.error("Error accessing media devices.", err);
//     }
//   };

//   const stopVideoStream = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//   };

//   const startVideoMeeting = async () => {
//     await startVideoStream();
//     await startRecording();
//   };

//   const stopVideoMeeting = async () => {
//     stopVideoStream();
//     await stopRecording();
//   };

//   const toggleVideoMeeting = async () => {
//     if (isRecording) {
//       await stopVideoMeeting();
//     } else {
//       await startVideoMeeting();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       {error && <p className="text-red-500 mb-4">{error.toString()}</p>}
//       <button
//         onClick={toggleInitEngine}
//         className={`bg-blue-500 text-white px-4 py-2 rounded-md mb-4 ${isInitialized ? "bg-red-500" : "bg-blue-500"}`}
//       >
//         {isInitialized ? "Deinitialize Leopard" : "Initialize Leopard"}
//       </button>
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
//         <label htmlFor="audio-file" className="block text-gray-700 font-medium mb-2">
//           Choose audio file to transcribe:
//         </label>
//         <input
//           id="audio-file"
//           type="file"
//           accept="audio/*"
//           disabled={!isLoaded}
//           onChange={async (e) => {
//             if (!!e.target.files?.length) {
//               await processFile(e.target.files[0]);
//             }
//           }}
//           className="w-full mb-4 p-2 border border-gray-300 rounded-md"
//         />
//         <label htmlFor="audio-record" className="block text-gray-700 font-medium mb-2">
//           Record audio to transcribe:
//         </label>
//         <button
//           id="audio-record"
//           disabled={!isLoaded}
//           onClick={toggleVideoMeeting}
//           className={`w-full mb-4 px-4 py-2 rounded-md ${isRecording ? "bg-red-500" : "bg-green-500"} text-white`}
//         >
//           {isRecording ? "Stop Video Meeting" : "Start Video Meeting"}
//         </button>
//       </div>
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
//         {isInitialized  &&
//       <div className="w-full max-w-md bg-black rounded-lg shadow-md p-4 mb-4">
//         <video ref={videoRef} className="w-full mb-4" autoPlay playsInline muted />
//       </div>}
//         <h3 className="text-gray-700 font-medium mb-2">Transcript:</h3>
//         <p className="bg-gray-100 p-2 rounded-md">{result?.transcript}</p>
//       </div>

//     </div>
//   );
// }

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
      {/* <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 space-y-5 p-4 pt-8">
          <button
            onClick={() => setIsTextSummaryOpen(true)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Text Summary
          </button>
          <button
            onClick={() => setIsInfoRetrievalOpen(true)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Info Retrieval
          </button>
          <button
            onClick={() => setIsTranslationOpen(true)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Language Translation
          </button>
          <button
            onClick={() => setIsKeywordsOpen(true)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Keywords
          </button>
          <button
            onClick={() => setIsFileSummaryOpen(true)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            File Summary
          </button>
        </div>
        <div className="flex flex-col items-center pt-16 justify-center md:flex-grow">
          {error && <p className="text-red-500 mb-4">{error.toString()}</p>}
          <button
            onClick={toggleInitEngine}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mb-4 ${
              isInitialized ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {isInitialized ? "Deinitialize Transcription" : "Initialize Transcription"}
          </button>
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
            <label
              htmlFor="audio-file"
              className="block text-gray-700 font-medium mb-2"
            >
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
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <label
              htmlFor="audio-record"
              className="block text-gray-700 font-medium mb-2"
            >
              Record audio to transcribe:
            </label>
            <button
              id="audio-record"
              disabled={!isLoaded}
              onClick={toggleVideoMeeting}
              className={`w-full mb-4 px-4 py-2 rounded-md ${
                isRecording ? "bg-red-500" : "bg-green-500"
              } text-white`}
            >
              {isRecording ? "Stop Video Meeting" : "Start Video Meeting"}
            </button>
          </div>
          {isInitialized && (
            <div className="w-full max-w-md bg-black rounded-lg shadow-md p-4 mb-4">
              <video
                ref={videoRef}
                className="w-full mb-4"
                autoPlay
                playsInline
                muted
              />
            </div>
          )}
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Transcript:</h3>
            <p className="bg-gray-100 p-2 rounded-md overflow-y-auto max-h-28">{result?.transcript}</p>
          </div>
        </div>
      </div> */}


<div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center pt-12">
<div className="flex flex-col md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 space-y-5 p-4 pt-8">
    <div className="flex flex-col w-5/12 md:w-1/3 bg-white rounded-lg shadow-md p-4 mb-4">
    <button
        onClick={toggleInitEngine}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isInitialized ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isInitialized ? "Deinitialize Transcription" : "Initialize Transcription"}
      </button>
      <label
        htmlFor="audio-file"
        className="block text-gray-700 font-medium mb-2"
      >
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
        className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <h3 className="text-gray-700 font-medium mb-2">Transcript:</h3>
      <p className="bg-gray-100 p-2 rounded-md overflow-y-auto max-h-80 mb-4">
        {result?.transcript}
      </p>
     
    </div>


    {/* Video Meeting Section */}    
    <div className="flex flex-col w-full md:w-2/3 bg-black rounded-lg shadow-md p-4 mb-4">
    <label
        htmlFor="audio-record"
        className="block text-gray-700 font-medium mb-2"
      >
        Record audio to transcribe
      </label>
    <button
        id="audio-record"
        disabled={!isLoaded}
        onClick={toggleVideoMeeting}
        className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isRecording ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {isRecording ? "Stop Video Meeting" : "Start Video Meeting"}
      </button>
      {isInitialized && (
        <video
          ref={videoRef}
          className="w-full mb-4"
          autoPlay
          playsInline
          muted
        />
      )}

      {error && <p className="text-red-500 mb-4">{error.toString()}</p>}
    </div>
  </div>

  {/* Side Buttons */}
  <div className="flex flex-col md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 space-y-5 p-4 pt-8">
    <span className="text-xl text-green-500">Try our Capabilities!!</span>
    {[
      { label: "Text Summary", onClick: () => setIsTextSummaryOpen(true) },
      { label: "Info Retrieval", onClick: () => setIsInfoRetrievalOpen(true) },
      { label: "Language Translation", onClick: () => setIsTranslationOpen(true) },
      { label: "Keywords", onClick: () => setIsKeywordsOpen(true) },
      { label: "File Summary", onClick: () => setIsFileSummaryOpen(true) },
    ].map((button, index) => (
      <button
        key={index}
        onClick={button.onClick}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none mr-12 focus:ring-2 focus:ring-blue-500"
      >
        {button.label}
      </button>
    ))}
  </div>
</div>


      {/* <div className="pt-10 flex justify-center">
        <form
          className="bg-white w-full md:w-1/2 grid grid-cols-12"
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
      </div> */}

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
      <footer className="w-full bg-gray-800 text-white py-12 mt-8">
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
              <ul className="space-y-2 pl-32">
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