import React, { useContext, useEffect, useState } from "react";
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
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(`/videos/videos/${user.examYear}`);
        setVideos(response.data.videos);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Videos not found!");
      }
    };
    getVideos();
  }, [user.examYear]);

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
                  <div className="flex gap-10 font-bold text-white md:text-lg">
                    <h1>{new Date(video.date).toISOString().split("T")[0]}</h1>
                    <h1 className="w-[150px] md:w-[450px]">
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
