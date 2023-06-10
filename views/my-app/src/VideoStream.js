import React, { useEffect, useRef } from "react";
import axios from "axios";

function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const startVideoStream = async () => {
      try {
        const response = await axios.get("http://localhost:8000/video-stream", {
          responseType: "arraybuffer",
          contentType: 'application/octet-stream',
        });

        const frameData = new Uint8Array(response.data);
        const blob = new Blob([frameData], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);

        videoElement.src = imageUrl;
      } catch (error) {
        // Handle error if needed
      }
    };

    startVideoStream().then(() => {
      // Handle success if needed
    })
    .catch((error) => {
      console.log(error);
    });

    // Clean up function
    return () => {
      videoElement.src = "";
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls autoPlay style={{ width: "100%", height: "100%", margin: 0 }} />
    </div>
  );
}

export default VideoStream;
