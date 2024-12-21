import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import VideoPlayerComponent from "../commonComponents/VideoPlayerComponent";

export default function AdminVideosComponent() {
  //get batch years
  const [years, setYears] = useState([]);
  useEffect(() => {
    const getYears = async () => {
      try {
        const response = await axios.get("/videos/batch-years");
        setYears(response.data.batchYears);
      } catch (error) {
        console.log(error);
      }
    };
    getYears();
  }, []);

  //get dropdown selected
  const [dropdownSelected, setDropdownSelected] = useState("");
  const handleDropdownSelection = (e) => {
    setDropdownSelected(e.target.value);
  };

  //get videos
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      if (!dropdownSelected) {
        try {
          const response = await axios.get("/videos/allVideos");
          setVideos(response.data.videos);
        } catch (error) {
          console.error(error);
          toast.error("Videos not found!");
        }
      } else {
        try {
          const response = await axios.get(
            `/videos/videos/${dropdownSelected}`,
          );
          setVideos(response.data.videos);
        } catch (error) {
          console.error(error);
          toast.error("Videos not found!");
        }
      }
    };
    getVideos();
  }, [dropdownSelected]);

  //delete video
  const deleteVideo = async (id) => {
    try {
      await axios.delete(`/videos/delete/${id}`);
      // Update the videos list after successful deletion
      setVideos(videos.filter((video) => video._id !== id));
      toast.success("Video deleted successful!");
    } catch (error) {
      console.log(error);
      toast.error("Video deleted failed");
    }
  };

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-20 mx-2 flex h-screen w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">
          VIDEOS{dropdownSelected ? "-" : ""}
          {dropdownSelected}
          {dropdownSelected ? "-BATCH" : ""}
        </h1>

        <div className="mt-3 flex w-full items-center justify-between">
          {/* display batch years of uploaded videos in dropdown */}
          <select
            name="batchYear"
            value={dropdownSelected}
            onChange={handleDropdownSelection}
            className="w-40 cursor-pointer rounded bg-st_blue py-1 text-start text-white focus:outline-none md:w-60"
          >
            <option value={""} className="bg-white text-black">
              All Videos
            </option>
            {years.map((year) => (
              <option
                key={year}
                value={year}
                className="cursor-pointer bg-white text-black hover:bg-st_blue"
              >
                {year}
              </option>
            ))}
          </select>

          {/* add new video */}
          <Link to={"/admin/video/add"}>
            <div className="flex cursor-pointer items-center justify-center rounded bg-st_green px-2 py-1 font-bold text-white md:text-lg">
              <h1>Add</h1>
              <ion-icon name="add-outline" />
            </div>
          </Link>
        </div>

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
                    {/* update video button */}
                    <Link to={`/admin/video/update/${video._id}`}>
                      <div className="flex cursor-pointer items-center justify-center gap-2 rounded bg-st_green p-1">
                        <ion-icon
                          name="create"
                          class="cursor-pointer text-lg text-white md:text-2xl"
                        />
                      </div>
                    </Link>
                    {/* delete video button */}
                    <div
                      onClick={() => deleteVideo(video._id)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded bg-st_red p-1"
                    >
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
