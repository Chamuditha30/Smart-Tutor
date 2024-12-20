const Video = require("../models/videoModel");

//create video endpoint
const createVideo = async (req, res) => {
  try {
    const { batchYear, date, description, videoLink, private } = req.body;

    const video = new Video({
      batchYear,
      date,
      description,
      videoLink,
      private,
    });
    const saveVideo = await video.save();
    res
      .status(201)
      .json({ message: "Video created successfully", data: saveVideo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//get all videos endpoint
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//get videos by batch year endpoint
const getVideosByBatchYear = async (req, res) => {
  try {
    const { batchYear } = req.params;
    const videos = await Video.find({ batchYear }).sort({ date: -1 });
    return res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Videos not found" });
  }
};

//get videos batch years
const getVideoYears = async (req, res) => {
  try {
    const batchYears = await Video.distinct("batchYear");
    //display videos by batch year
    return res.status(200).json({ batchYears });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Batch years not found" });
  }
};

//update video endpoint
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { batchYear, date, description, videoLink, private } = req.body;

    const video = await Video.findByIdAndUpdate(
      id,
      {
        batchYear: batchYear,
        date: date,
        description: description,
        videoLink: videoLink,
        private: private,
      },
      { new: true }
    );

    //display updated video
    return res.status(200).json({ video });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Video not updated" });
  }
};

//delete video endpoint
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    //deleted successful
    return res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Video not deleted" });
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideosByBatchYear,
  getVideoYears,
  updateVideo,
  deleteVideo,
};
