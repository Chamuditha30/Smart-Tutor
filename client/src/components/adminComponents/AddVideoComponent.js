import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddVideoComponent() {
  const navigate = useNavigate();

  //get input data
  const [data, setData] = useState({
    batchYear: "",
    date: "",
    description: "",
    videoLink: "",
    isPrivate: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //send input data to backend, get response
  const addVideo = async (e) => {
    e.preventDefault();

    try {
      const { batchYear, date, description, videoLink, isPrivate } = data;

      //validate inputs
      if (!batchYear || !date || !description || !videoLink) {
        toast.error("Please fill all fields");
        return;
      }

      //send add request and add user data
      const response = await axios.post("/videos/create", {
        batchYear,
        date,
        description,
        videoLink,
        isPrivate,
      });
      if (response) {
        toast.success("Video added successful!");
      }
      navigate("/admin/videos");
    } catch (error) {
      console.error("Error registering in: ", error);
      toast.error("Somethin wrong. Please try again");
    }
  };

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-9 mx-2 flex h-[640px] w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">ADD VIDEO</h1>
        <Link to={"/admin/videos"}>
          <ion-icon
            name="close-outline"
            class="absolute right-0 top-2 cursor-pointer text-5xl font-bold text-st_blue md:top-2 md:text-5xl"
          />
        </Link>
        <form
          onSubmit={addVideo}
          className="flex h-full w-full flex-col items-center justify-center"
        >
          <div className="flex flex-col items-start justify-center">
            <input
              type="number"
              name="batchYear"
              placeholder="Batch Year"
              value={data.batchYear}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:outline-none md:w-[500px] md:text-2xl"
            />
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleInputChange}
              className="mb-5 w-32 rounded bg-st_green px-2 py-1 text-white focus:outline-none md:w-60 md:text-2xl"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={data.description}
              onChange={handleInputChange}
              className="mb-5 h-32 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:outline-none md:w-[500px] md:text-2xl"
            />
            <input
              type="text"
              name="videoLink"
              placeholder="Video Link"
              value={data.videoLink}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:outline-none md:w-[500px] md:text-2xl"
            />
            <div className="flex w-full items-center justify-start gap-2">
              <input
                type="checkbox"
                name="isPrivate"
                checked={data.isPrivate}
                onChange={handleInputChange}
                className="size-5 border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
              />
              <h1 className="text-st_blue md:text-2xl">
                {data.isPrivate ? "Private" : "Public"}
              </h1>
            </div>
          </div>
          <input
            type="submit"
            value="Add"
            className="mt-5 cursor-pointer rounded bg-st_blue px-2 text-white md:px-4 md:py-2 md:text-xl"
          />
        </form>
      </div>
    </div>
  );
}
