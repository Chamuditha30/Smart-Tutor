require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

//database connection
mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Database connection failed"));

//middlewares
app.use(express.json({ limit: "3mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "3mb", extended: false }));

//routes
app.use("/users", require("./routes/userRoutes"));
app.use("/videos", require("./routes/videoRoutes"));

//run server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
