import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import LoginImg from "../../images/loginImg.jpg";

export default function LoginComponent() {
  const [eye, setEye] = useState(true);
  const toggleEye = () => {
    setEye(!eye);
  };

  const navigate = useNavigate();

  //get user
  const { setUser } = useContext(UserContext);

  //get user inputs
  const [data, setData] = useState({
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

  //send input data to backend, get response and navigate users by role
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = data;

      //validate inputs
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      //send login request and get user data
      const response = await axios.post("/users/login", { email, password });
      const userData = response.data;

      //check user role and navigate to pages by role
      if (userData.error) {
        toast.error(userData.error);
      } else {
        //update context and local storage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        //clear form
        setData({ email: "", password: "" });

        toast.success("Login successful!");

        //navigation
        switch (userData.role) {
          case "admin":
            navigate("/admin/videos");
            break;
          case "student":
            navigate("/student/videos");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      toast.error("Error logging in. Please try again");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-y-auto bg-st_blue md:overflow-hidden">
      <div className="flex h-screen w-[300px] flex-col items-center overflow-y-auto overflow-x-hidden rounded bg-white md:h-[720px] md:w-[1280px] md:flex-row md:justify-start">
        <div className="flex items-center justify-center">
          <img src={LoginImg} alt="" className="md:h-[720px]" />
        </div>
        <form
          onSubmit={loginUser}
          className="flex w-[640px] flex-col items-center justify-center gap-8 border-st_blue md:h-[500px] md:gap-10 md:border-l-2"
        >
          <h1 className="mt-3 text-3xl font-bold text-st_blue md:text-4xl">
            LOGIN
          </h1>
          <div className="flex flex-col items-start justify-start">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleInputChange}
              className="mb-3 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:outline-none md:w-80 md:text-2xl"
            />
            <div className="relative">
              <input
                type={eye ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                className="mb-3 mt-5 w-60 border-b-2 border-st_blue bg-transparent text-st_blue focus:outline-none md:w-80 md:text-2xl"
              />
              <ion-icon
                name={eye ? "eye-off" : "eye"}
                onClick={toggleEye}
                class="absolute right-2 top-6 cursor-pointer text-sm text-st_blue md:top-7 md:text-xl"
              />
              <p className="text-st_red">Forgot Password?</p>
            </div>
          </div>
          <input
            type="submit"
            value="Login"
            className="cursor-pointer rounded bg-st_blue px-2 text-white md:px-4 md:py-2 md:text-xl"
          />
          <div className="mb-2 flex items-center justify-center gap-1">
            <p className="text-st_blue">Don’t have an account?</p>
            <Link to="/register">
              <p className="text-st_red">Register</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
