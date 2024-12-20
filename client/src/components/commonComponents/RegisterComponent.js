import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoginImg from "../../images/loginImg.jpg";

export default function RegisterComponent() {
  const [eye, setEye] = useState(true);
  const toggleEye = () => {
    setEye(!eye);
  };

  const navigate = useNavigate();

  //get user inputs
  const [data, setData] = useState({
    examYear: "",
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  //handle inputs changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //send input data to backend, get response
  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const {
        examYear,
        firstName,
        lastName,
        address,
        mobileNo,
        email,
        password,
      } = data;

      //validate inputs
      if (
        !examYear ||
        !firstName ||
        !lastName ||
        !address ||
        !mobileNo ||
        !email ||
        !password
      ) {
        toast.error("Please fill all fields");
        return;
      }

      //send login request and get user data
      const response = await axios.post("/users/register", {
        examYear,
        firstName,
        lastName,
        address,
        mobileNo,
        email,
        password,
      });
      if (response) {
        toast.success("Register successful!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error registering in: ", error);
      toast.error("Somethin wrong. Please try again");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-y-auto bg-st_blue md:overflow-hidden">
      <div className="flex h-screen w-[300px] flex-col items-center overflow-y-auto overflow-x-hidden rounded bg-white md:h-[720px] md:w-[1280px] md:flex-row md:justify-start">
        <div className="flex items-center justify-center">
          <img src={LoginImg} alt="" className="md:h-[720px]" />
        </div>
        <form
          onSubmit={registerUser}
          className="flex w-[640px] flex-col items-center justify-center gap-8 border-st_blue md:h-[500px] md:gap-10 md:border-l-2"
        >
          <h1 className="mt-3 text-3xl font-bold text-st_blue md:text-4xl">
            Register
          </h1>
          <div className="flex flex-col items-start justify-start">
            <input
              type="number"
              name="examYear"
              placeholder="Exam Year"
              value={data.examYear}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={data.address}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
            />
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile Number"
              value={data.mobileNo}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleInputChange}
              className="mb-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
            />
            <div className="relative mb-3">
              <input
                type={eye ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                className="mb-3 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:bg-transparent focus:outline-none md:w-80 md:text-2xl"
              />
              <ion-icon
                name={eye ? "eye-off" : "eye"}
                onClick={toggleEye}
                class="absolute right-2 top-2 cursor-pointer text-sm text-st_blue md:top-2 md:text-xl"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Register"
            className="cursor-pointer rounded bg-st_blue px-2 text-white md:px-4 md:py-2 md:text-xl"
          />
          <div className="mb-2 flex items-center justify-center gap-1">
            <p className="text-st_blue">Already have an account?</p>
            <Link to="/">
              <p className="text-st_red">Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
