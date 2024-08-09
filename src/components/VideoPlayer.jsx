import React, { useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const embedContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [loopInterval, setLoopInterval] = useState(null);

  const playVideo = async () => {
    setIsVideoVisible(true);
    videoRef.current.currentTime = 0;
    await videoRef.current.play();
    await requestFullscreen(videoRef.current);
    videoRef.current.onended = async () => {
      await exitFullscreen();
      setIsVideoVisible(false);
      await showFacebookEmbed();
    };
    setIsPlaying(true);
  };

  const pauseVideo = async () => {
    videoRef.current.pause();
    await exitFullscreen();
    setIsVideoVisible(false);
    embedContainerRef.current.classList.add('hidden');
    clearInterval(loopInterval);
    setIsPlaying(false);
  };

  const showFacebookEmbed = async () => {
    embedContainerRef.current.classList.remove('hidden');
    embedContainerRef.current.classList.add('fade-in');
    await new Promise((resolve) => setTimeout(resolve, 10000));
    embedContainerRef.current.classList.remove('fade-in');
    embedContainerRef.current.classList.add('fade-out');
    await new Promise((resolve) => setTimeout(resolve, 100));
    embedContainerRef.current.classList.add('hidden');
    embedContainerRef.current.classList.remove('fade-out');
    await playVideo(); // Restart the video for looping
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pauseVideo();
    } else {
      await playVideo();
      const interval = setInterval(async () => {
        if (videoRef.current.paused) {
          await playVideo();
        }
      }, 15000); // Adjust timing as needed
      setLoopInterval(interval);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      videoRef.current.src = videoUrl;
      // Here you can add logic to upload the file to a server
    }
  };

  const requestFullscreen = (element) => {
    return new Promise((resolve, reject) => {
      if (element.requestFullscreen) {
        element.requestFullscreen().then(resolve).catch(reject);
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen().then(resolve).catch(reject);
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        element.webkitRequestFullscreen().then(resolve).catch(reject);
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen().then(resolve).catch(reject);
      } else {
        reject(new Error("Fullscreen API is not supported"));
      }
    });
  };

  const exitFullscreen = () => {
    return new Promise((resolve, reject) => {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(resolve).catch(reject);
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen().then(resolve).catch(reject);
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen().then(resolve).catch(reject);
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen().then(resolve).catch(reject);
      } else {
        reject(new Error("Fullscreen API is not supported"));
      }
    });
  };

  return (
    <div className="p-6 bg-red-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Video Player</h2>
      <button
        onClick={handlePlayPause}
        className={`mb-4 px-4 py-2 rounded ${isPlaying ? 'bg-red-500' : 'bg-blue-500'} text-white hover:${isPlaying ? 'bg-red-600' : 'bg-blue-600'}`}
      >
        {isPlaying ? 'Pause Video' : 'Putar Video'}
      </button>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="mb-4"
      />
      <div className={`${isVideoVisible ? 'block' : 'hidden'}`}>
        <video ref={videoRef} controls className="w-full mb-4">
          <source src="/slideshow-pst-bps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div ref={embedContainerRef} className="hidden fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center opacity-0 transition-opacity duration-1000">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbpskotabukittinggiofficial%3Flocale%3Did_ID&tabs=timeline&width=500&height=950&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="500"
          height="950"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="w-full rounded-3xl"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
