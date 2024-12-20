const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    batchYear: {
      type: Number, //dataType
      required: true, //validate
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
