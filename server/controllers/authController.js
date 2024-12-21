const { comparePassword } = require("../helper/authHelper");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//login enpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //compare password
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        {
          id: user._id,
          examYear: user.examYear,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          mobileNo: user.mobileNo,
          email: user.email,
          role: user.role,
        },
        process.env.REACT_APP_JWT_SECRET,
        { expiresIn: "1h" },
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get profile
const getProfile = async (req, res) => {
  const { token } = req.cookies;

  //check token
  if (!token) {
    return res.status(400).json({ error: "User not authenticated" });
  }

  //verify token
  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, {}, (error, decode) => {
    if (error) {
      console.error("Token verification error", error);
      return res.status(401).json({ error: "Token verification failed" });
    }

    //find user by id
    User.findById(decode.id)
      .then((user) => {
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        }

        //build user profile response
        const userProfile = {
          id: user._id,
          examYear: user.examYear,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          mobileNo: user.mobileNo,
          email: user.email,
          role: user.role,
        };
        res.json(userProfile);
      })
      .catch((error) => {
        console.error("User profile error", error);
        return res.status(500).json({ message: "Internal server error" });
      });
  });
};

//logout endpoint
const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  loginUser,
  getProfile,
  logoutUser,
};
