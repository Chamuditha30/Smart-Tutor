import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { toast } from "react-hot-toast";
import VideoPlayerComponent from "../commonComponents/VideoPlayerComponent";
import Lottie from "lottie-react";
import loadingAnimation from "../../images/load.json";

export default function StudentVideosComponent() {
  //loading state
  const [isLoading, setIsLoading] = useState(true);

  //get user
  const { user } = useContext(UserContext);

  //get videos
  const [videos, setVideos] = useState([]);
  const errorToastShown = useRef(false); //error message display flag
  useEffect(() => {
    const getVideos = async () => {
      if (!user.isActive) {
        if (!errorToastShown.current) {
          toast(
            (t) => (
              <span className="flex flex-col items-center justify-center gap-2">
                <h1 className="font-semibold text-st_red">
                  Please activate your account
                </h1>
                <button
                  onClick={() => {
                    const mobileNo = "+94713149460";
                    const message = `Please activate my user account\nName: ${user.firstName} ${user.lastName}`;
                    const whatsappUrl = `https://web.whatsapp.com/send?phone=${mobileNo}&text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="rounded bg-st_green px-2 py-1 text-white"
                >
                  Activate
                </button>
              </span>
            ),
            {
              duration: Infinity,
            },
          );
          errorToastShown.current = true; //set flag to prevent multiple toasts
        }
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/videos/videos/${user.examYear}`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error(error);
        toast.error("Videos not found!");
      } finally {
        setIsLoading(false);
      }
    };

    getVideos();
  }, [user.examYear, user.isActive, user.firstName, user.lastName]);

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-20 mx-2 flex h-screen w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">
          VIDEOS - {user.examYear}
        </h1>

        {/* videos display */}
        <div className="mb-20 mt-3 h-full w-full overflow-y-auto">
          {/* set loading animation */}
          <div
            className={`${isLoading ? "flex" : "hidden"} h-full w-full items-center justify-center`}
          >
            <Lottie animationData={loadingAnimation} className="h-40 w-40" />
          </div>
          {videos.map((video) => (
            <React.Fragment key={video._id}>
              <div className="mt-2 flex w-full items-center justify-between rounded bg-st_blue p-1">
                <div className="flex w-full items-center justify-between">
                  <div className="flex gap-5 font-bold text-white md:text-lg">
                    <h1>{new Date(video.date).toISOString().split("T")[0]}</h1>
                    <h1 className="w-[270px] md:w-[610px]">
                      {video.description}
                    </h1>
                  </div>
                </div>
              </div>

              {/* display all videos */}
              <div className="mt-2 flex w-full items-center justify-center">
                <VideoPlayerComponent
                  videoLink={video.videoLink}
                  isPrivate={video.isPrivate}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
