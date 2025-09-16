

"use client";
import React, { useRef, useState } from "react";
//camera===mediastream===htmlvideoelemnt
//camera===mediastream===mediaRecorder===Blob[]===new Blob{raw }


export default function SimpleRecorder() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  
  const startRecording = async () => {
    try {
      const camera = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = camera  // Now allowed: MediaStream | null
      if (videoRef.current) {
        videoRef.current.srcObject = camera 
        videoRef.current.play();
      }

      chunksRef.current = [];
      const recorder = new MediaRecorder(camera);
      recorderRef.current = recorder;  // Now allowed: MediaRecorder | null

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        if (videoRef.current) videoRef.current.srcObject = null;
        streamRef.current?.getTracks().forEach(track => track.stop());  // Safe optional chaining
        streamRef.current = null;
        alert(`Your video just got saved as my-video-${Date.now()}.webm`);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Could not access camera/microphone.");
    }
  };


  const stopRecording = () => {
    recorderRef.current?.stop();  // Safe optional chaining
    setIsRecording(false);
  };

  const download = () => {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `my-video-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ maxWidth: 640, margin: "50px auto", padding: 20 }}>
      <h1>Simple Video Recorder</h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "100%", border: "1px solid #ccc", borderRadius: 8 }}
      />

      <div style={{ marginTop: 20 }}>
        {!isRecording ? (
          <button 
            onClick={startRecording} 
            style={{ padding: "10px 20px", marginRight: 10, background: "green", color: "white", border: 0, borderRadius: 4 }}
          >
            Start Recording
          </button>
        ) : (
          <button 
            onClick={stopRecording} 
            style={{ padding: "10px 20px", marginRight: 10, background: "red", color: "white", border: 0, borderRadius: 4 }}
          >
            Stop Recording
          </button>
        )}
        <button 
          onClick={download} 
          disabled={!blobUrl} 
          style={{ padding: "10px 20px", background: blobUrl ? "blue" : "gray", color: "white", border: 0, borderRadius: 4 }}
        >
          Download
        </button>
      </div>

      {blobUrl && (
        <div style={{ marginTop: 20 }}>
          <video src={blobUrl} controls style={{ width: "100%", border: "1px solid #ccc", borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}