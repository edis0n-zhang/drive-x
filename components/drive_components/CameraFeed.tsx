import React, { useRef, useEffect, useState } from "react";
import { Camera } from "lucide-react";

const CameraFeed = () => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [cameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  return (
    <div className="flex items-center justify-center h-screen pb-10">
      <div className="w-full h-full max-w-full aspect-auto rounded-b-[10%] overflow-hidden relative bg-gray-50 bg-opacity-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
        <button
          onClick={toggleCamera}
          className="absolute bottom-6 right-6 p-2 bg-gray-800 text-white rounded-full"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CameraFeed;
