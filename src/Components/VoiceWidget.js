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
import React, { useState, useRef, useEffect } from "react";
import { useLeopard } from "@picovoice/leopard-react";
import { LEOPARD_API_KEY } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center p-4 pt-12">
        <div className="flex flex-col md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 space-y-5 p-4">
        <button
            onClick={() => handleNavigation("/text-summary")}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
           Text Summary
          </button>
          <button
            onClick={() => handleNavigation("/info-retrieval")}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Info Retrieval
          </button>
          <button
            onClick={() => handleNavigation("/translation")}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Language Translation
          </button>
          <button
            onClick={() => handleNavigation("/keywords")}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            Keywords
          </button>
          <button
            onClick={() => handleNavigation("/file-summarizer")}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700"
          >
            File Summary
          </button>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-grow">
          {error && <p className="text-red-500 mb-4">{error.toString()}</p>}
          <button
            onClick={toggleInitEngine}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mb-4 ${
              isInitialized ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {isInitialized ? "Deinitialize Leopard" : "Initialize Leopard"}
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
            <p className="bg-gray-100 p-2 rounded-md">{result?.transcript}</p>
          </div>
        </div>
      </div>
   
    </>
  );
}

async function getToken() {
  // Replace this with the actual implementation to get a temporary token from your server
  const response = await fetch("/api/get-token"); // Example endpoint to get the token
  const data = await response.json();
  return data.token;
}