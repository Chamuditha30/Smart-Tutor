const express = require("express");
const router = express.Router();
const cors = require("cors");

//create cors
router.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowOrigins = ["http://localhost:3000", "http://localhost:3001"];
      if (allowOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Origine not allowed by CORS"));
      }
    },
  })
);

//video controllers
const {
  createVideo,
  getVideos,
  getVideosByBatchYear,
  getVideoYears,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

//routes
//post
router.post("/create", createVideo);

//get
router.get("/allVideos", getVideos);
router.get("/videos/:batchYear", getVideosByBatchYear);
router.get("/batch-years", getVideoYears);

//put
router.put("/update/:id", updateVideo);

//delete
router.delete("/delete/:id", deleteVideo);

module.exports = router;
