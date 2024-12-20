const User = require("../models/userModel");

//user register endpoint
const createUser = async (req, res) => {
  try {
    const {
      examYear,
      firstName,
      lastName,
      address,
      mobileNo,
      email,
      password,
      role,
    } = req.body;

    const user = new User({
      examYear,
      firstName,
      lastName,
      address,
      mobileNo,
      email,
      password,
      role,
    });

    const saveUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: saveUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//get all users endpoint
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).sort({ _id: -1 });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//get students by exam year endpoint
const getUsersByExamYear = async (req, res) => {
  try {
    const { examYear } = req.params;
    const users = await User.find({ examYear }).sort({ _id: -1 });
    //display users by exam year
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Users not found" });
  }
};

//get students exam years endpoint
const getUsersExamYears = async (req, res) => {
  try {
    const examYears = await User.distinct("examYear", { role: "student" });
    //display exam years
    return res.status(200).json({ examYears });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Users not found" });
  }
};

//update user endpoint
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      examYear,
      firstName,
      lastName,
      address,
      mobileNo,
      email,
      password,
      role,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        examYear: examYear,
        firstName: firstName,
        lastName: lastName,
        address: address,
        mobileNo: mobileNo,
        email: email,
        password: password,
        role: role,
      },
      { new: true }
    );

    //display updated user
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User not updated" });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    //deleted successful
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "User not deleted" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUsersByExamYear,
  getUsersExamYears,
  updateUser,
  deleteUser,
};
