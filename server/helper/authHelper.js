const bcrypt = require("bcrypt");

//password hashing
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
    throw new Error("Hashing Failed");
  }
};

//compare password
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.log(error);
    throw new Error("Compare failed");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
