import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayerComponent({ videoLink, isPrivate }) {
  return (
    <div className="relative flex w-full items-center justify-center bg-st_light_gray py-2">
      <ReactPlayer url={videoLink} controls={true} className="z-10" />
      <div className="absolute left-0 top-0 z-20 h-16 w-full bg-transparent"></div>
      <div className="absolute bottom-0 right-14 z-20 h-12 w-28 bg-transparent"></div>
      <div className="absolute bottom-0 left-12 z-20 h-16 w-52 bg-transparent"></div>
      <div
        className={`absolute z-20 ${isPrivate ? "flex" : "hidden"} h-full w-full items-center justify-center gap-2 bg-black opacity-90`}
      >
        <ion-icon name="alert-circle" class="text-lg text-white md:text-2xl" />
        <h1 className="text-white md:text-xl">Video is private</h1>
      </div>
    </div>
  );
}
