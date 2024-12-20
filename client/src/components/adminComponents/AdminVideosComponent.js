import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import VideoPlayerComponent from "../commonComponents/VideoPlayerComponent";

export default function AdminVideosComponent() {
  //get videos
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get("/videos/allVideos");
        setVideos(response.data.videos);
      } catch (error) {
        console.error(error);
        toast.error("Videos not found!");
      }
    };
    getVideos();
  }, []);

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-20 mx-2 flex h-screen w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">VIDEOS</h1>

        {/* videos display */}
        <div className="mb-20 mt-3 h-full w-full overflow-y-auto">
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

                  <div className="flex items-center justify-center gap-2">
                    <Link to={`/admin-videos/${video._id}`}>
                      <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-st_green p-1">
                        <ion-icon
                          name="create"
                          class="cursor-pointer text-lg text-white md:text-2xl"
                        />
                      </div>
                    </Link>
                    <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-st_red p-1">
                      <ion-icon
                        name="trash"
                        class="cursor-pointer text-lg text-white md:text-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* display all videos */}
              <div className="mt-2 flex w-full items-center justify-center">
                <VideoPlayerComponent
                  videoLink={video.videoLink}
                  isPrivate={video.private}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
