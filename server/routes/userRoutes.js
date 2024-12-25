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

//user controllers
const {
  createUser,
  getUsers,
  getUsersByExamYear,
  getUsersExamYears,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const {
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/authController");

//routes
//post
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//get
router.get("/profile", getProfile);
router.get("/allUsers", getUsers);
router.get("/student/:_id", getUserById);
router.get("/students/:examYear", getUsersByExamYear);
router.get("/exam-years", getUsersExamYears);

//put
router.put("/update/:id", updateUser);

//delete
router.delete("/delete/:id", deleteUser);

module.exports = router;
