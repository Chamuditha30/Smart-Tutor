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

//payment controllers
const {
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

//routes
//post
router.post("/create/:id", createPayment);

//get
router.get("/get/:_id", getPayment);

//update
router.put("/update/:id", updatePayment);

//delete
router.delete("/delete/:id", deletePayment);

module.exports = router;
