import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayerComponent({ videoLink, isPrivate }) {
  //video play/pause function
  const [isPlaying, setIsPlaying] = useState(false);
  const videoPlayPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  //seek forward/backward seek function
  const playerRef = useRef(null);
  const seekForwardHandler = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() + 30,
      "seconds",
    );
  };
  const seekBackwardHandler = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() - 30,
      "seconds",
    );
  };

  //get video quality
  const [quality, setQuality] = useState("large");
  const qualityHandler = (e) => {
    setQuality(e.target.value);
  };

  //full screen video function
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  const fullScreenHandler = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  //ESC button changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      // Check if fullscreen element exists and ignore changes caused by Escape
      if (!document.fullscreenElement && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [isFullScreen]);

  //controllers visibility
  const [showControllers, setShowControllers] = useState(true);
  const timeoutRef = useRef(null);

  //mouse move handle
  const handleMouseMove = () => {
    setShowControllers(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowControllers(false);
    }, 3000); //Hide controllers after 3 seconds of inactivity
  };

  //mouse leave handle
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowControllers(false);
  };

  //controller timeout
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex w-full flex-col items-center justify-center bg-st_dark_gray py-2"
    >
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center"
      >
        <div
          className={`${isFullScreen ? "h-screen w-screen" : ""} pointer-events-none`}
        >
          <ReactPlayer
            url={videoLink}
            controls={false}
            playing={isPlaying}
            onEnded={() => setIsPlaying(false)}
            ref={playerRef}
            config={{
              youtube: {
                playerVars: {
                  rel: 0, //Disable related videos
                  modestbranding: 1, //Minimize YouTube branding
                  vq: quality, //Set video quality
                },
              },
            }}
            width={isFullScreen ? "100%" : "640px"}
            height={isFullScreen ? "100%" : "360px"}
            className={"z-0"}
          />
        </div>

        {/* video controllers */}
        {showControllers && (
          <div
            className={`${isFullScreen ? "fixed bottom-8 left-1/2 -translate-x-1/2" : "absolute bottom-0"} z-20 mt-2 flex h-10 flex-row items-center justify-center gap-5 rounded bg-black/50 px-4 py-2`}
          >
            {/* seek back button */}
            <ion-icon
              name="play-back"
              onClick={seekBackwardHandler}
              class="cursor-pointer text-xl text-white hover:text-st_blue md:text-2xl"
            />

            {/* play/pause button */}
            <ion-icon
              name={isPlaying ? "pause" : "play"}
              onClick={videoPlayPauseHandler}
              class="cursor-pointer text-3xl text-white hover:text-st_blue md:text-4xl"
            />

            {/* seek forward button */}
            <ion-icon
              name="play-forward"
              onClick={seekForwardHandler}
              class="cursor-pointer text-xl text-white hover:text-st_blue md:text-2xl"
            />

            {/* change video quality */}
            <select
              name="quality"
              value={quality}
              onChange={qualityHandler}
              className="ml-2 w-20 cursor-pointer rounded bg-st_blue px-2 py-1 text-sm text-white"
            >
              <option value="hd1080" className="bg-white text-st_dark_gray">
                1080p
              </option>
              <option value="hd720" className="bg-white text-st_dark_gray">
                720p
              </option>
              <option value="large" className="bg-white text-st_dark_gray">
                480p
              </option>
            </select>

            {/* full screen video */}
            <ion-icon
              name={isFullScreen ? "contract-outline" : "expand-outline"}
              onClick={fullScreenHandler}
              class="cursor-pointer text-xl text-white hover:text-st_blue md:text-2xl"
            />
          </div>
        )}
      </div>

      {/* private video overlay */}
      <div
        className={`absolute z-20 ${isPrivate ? "flex" : "hidden"} h-full w-full items-center justify-center gap-2 bg-black opacity-90`}
      >
        <ion-icon name="alert-circle" class="text-lg text-white md:text-2xl" />
        <h1 className="text-white md:text-xl">Video is private</h1>
      </div>
    </div>
  );
}
