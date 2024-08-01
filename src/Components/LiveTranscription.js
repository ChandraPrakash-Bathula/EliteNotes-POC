import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { OPENAI_KEY } from "../constants"; // Adjust the path as needed

const LiveTranscription = () => {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);

    const mediaRecorder = new MediaRecorder(stream);
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = async (event) => {
      const audioBlob = event.data;
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");

      try {
        const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${OPENAI_KEY}`
          },
        });
        setTranscription((prev) => `${prev}\n${response.data.text}`);
      } catch (error) {
        console.error("Error transcribing audio:", error);
      }
    };

    mediaRecorder.start(1000); // Send audio data every second
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="pt-10 flex justify-center">
      <div className="bg-black w-full md:w-1/2 grid grid-cols-12 p-4 rounded-lg">
        <div className="col-span-12 flex justify-center mb-4">
          <button
            className={`py-2 px-4 rounded-lg ${isRecording ? "bg-red-600" : "bg-green-600"} text-white`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
        <div className="col-span-12 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Live Transcription</h3>
          <p>{transcription}</p>
        </div>
      </div>
    </div>
  );
};

export default LiveTranscription;