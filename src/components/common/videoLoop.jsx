import React, { useRef } from "react";
// import videoSRC from "../../assets/video/pentevideo.mp4";

const VideoLoop = () => {
  const videoRef = useRef(null);

  return (
    <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0">
      <div className="absolute bg-black/70 inset-0"></div>
      <video
        ref={videoRef}
        className="object-cover h-full"
        width="100%"
        height="100%"
        loop
        autoPlay
        muted
        // controls
      >
        <source
          src="https://liwapos.com/lws/Pentegrasyonback.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* <div class="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-500 to-transparent opacity-70 h-16"></div> */}
    </div>
  );
};

export default VideoLoop;
