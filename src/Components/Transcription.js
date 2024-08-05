import React, { useState } from 'react';
import axios from 'axios';
import {AssemblyAI} from 'assemblyai';
import {ASSEMBLY_AI_KEY} from '../utils/constants';
import Header from './Header';

const AssemblyAI_KEY = ASSEMBLY_AI_KEY; // Replace with your AssemblyAI API key

const Transcription = () => {
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const client = new AssemblyAI({
    apiKey: AssemblyAI_KEY,
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setTranscription('');

    try {
      // Extract audio from video file
      const audioBlob = await extractAudioFromVideo(file);

      // Convert Blob to URL for uploading
      const audioUrl = URL.createObjectURL(audioBlob);

      // Upload audio to AssemblyAI
      const response = await axios.post(
        'https://api.assemblyai.com/v2/upload',
        { audio_url: audioUrl },
        {
          headers: {
            authorization: AssemblyAI_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      // Transcribe the uploaded audio
      const config = { audio_url: response.data.upload_url };
      const transcript = await client.transcripts.create(config);
      
      // Poll for the transcription result
      const transcriptId = transcript.id;
      let polling = true;
      while (polling) {
        const result = await client.transcripts.get(transcriptId);
        if (result.status === 'completed') {
          setTranscription(result.text);
          polling = false;
        } else if (result.status === 'failed') {
          setTranscription('Transcription failed.');
          polling = false;
        } else {
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setTranscription('Error in transcribing the video.');
    }

    setLoading(false);
  };

  const extractAudioFromVideo = (file) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);
      videoElement.crossOrigin = 'anonymous';

      videoElement.onloadedmetadata = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(videoElement);
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);
        source.connect(audioContext.destination);

        videoElement.play();

        const recorder = new MediaRecorder(destination.stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          resolve(audioBlob);
        };

        recorder.start();
        videoElement.onended = () => recorder.stop();
      };

      videoElement.onerror = (error) => reject(error);
    });
  };

  return (
    <>
    <Header />
    <div className="pt-10 flex justify-center">
      <div className="bg-black w-full md:w-1/2 grid grid-cols-12 p-4 rounded-lg">
        <div className="col-span-12 flex justify-center mb-4">
          <input type="file" accept="video/*" onChange={handleFileUpload} disabled={loading} />
        </div>
        <div className="col-span-12 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Video Transcription</h3>
          {loading ? <p>Transcribing...</p> : <p>{transcription}</p>}
        </div>
      </div>
    </div>
    </>
  );
};

export default Transcription;