import { useState } from "react";
import { createTranscription } from "../utils/openai"; // Adjust the path as needed

const Transcription = () => {
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setTranscription("");

      try {
        const response = await createTranscription(file);

        if (response) {
          setTranscription(response);
        } else {
          setTranscription("Error in transcription.");
        }
      } catch (error) {
        console.error("Error creating transcription:", error);
        setTranscription("Error in transcription.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-10 flex justify-center">
        <div className="bg-black w-full md:w-1/2 p-4 rounded-lg shadow-lg text-center">
          <input
            type="file"
            accept="audio/*"
            className="p-2 m-2"
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <div className="pt-4 flex justify-center">
        <div className="bg-white w-full md:w-1/2 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Transcription</h3>
          {loading ? (
            <p>Transcripting the audio...</p>
          ) : (
            <p>{transcription}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Transcription;
