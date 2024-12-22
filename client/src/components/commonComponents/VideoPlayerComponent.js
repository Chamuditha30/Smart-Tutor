import React, { useRef, useState } from "react";
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
  const fullScreenHandler = () => {
    setIsFullScreen(!isFullScreen);
  };
  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-st_light_gray py-2">
      <div className="pointer-events-none">
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
                vq: { quality }, //Set video quality to 720p
              },
            },
          }}
          className={`pointer-events-none z-10`}
        />
      </div>

      {/* video controllers */}
      <div className="mt-2 flex h-10 w-full flex-row items-center justify-center gap-5">
        {/* seek back button */}
        <ion-icon
          name="play-back"
          onClick={seekBackwardHandler}
          class="cursor-pointer text-xl text-st_blue md:text-2xl"
        />

        {/* play/pause button */}
        <ion-icon
          name={isPlaying ? "pause" : "play"}
          onClick={videoPlayPauseHandler}
          class="cursor-pointer text-3xl text-st_blue md:text-4xl"
        />

        {/* seek forward button */}
        <ion-icon
          name="play-forward"
          onClick={seekForwardHandler}
          class="cursor-pointer text-xl text-st_blue md:text-2xl"
        />

        {/* change video quality */}
        <select
          name="quality"
          value={quality}
          onChange={qualityHandler}
          className="ml-2 w-20 rounded border bg-st_blue px-2 py-1 text-sm text-white"
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
          class="cursor-pointer text-xl text-st_blue md:text-2xl"
        />
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
