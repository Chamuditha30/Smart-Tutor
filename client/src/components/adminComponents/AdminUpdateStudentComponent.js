import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminUpdateStudentComponent() {
  const navigate = useNavigate();

  //get updated data
  const [data, setData] = useState({
    examYear: "",
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    email: "",
    isActive: false,
  });

  //get current data from backend
  const id = useParams().id;
  useEffect(() => {
    const getExistsData = async () => {
      try {
        const response = await axios.get(`/users/student/${id}`);
        setData((prev) => ({
          ...prev,
          ...response.data.user,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    getExistsData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //send updated data to backend, get response
  const updateVideo = async (e) => {
    e.preventDefault();

    try {
      const {
        examYear,
        firstName,
        lastName,
        address,
        mobileNo,
        email,
        isActive,
      } = data;

      //validate inputs
      if (
        !examYear ||
        !firstName ||
        !lastName ||
        !address ||
        !mobileNo ||
        !email
      ) {
        toast.error("Please fill all fields");
        return;
      }

      //send login request and get user data
      const response = await axios.put(`/users/update/${id}`, {
        examYear,
        firstName,
        lastName,
        address,
        mobileNo,
        email,
        isActive,
      });
      if (response) {
        toast.success("Student updated successful!");
      }
      navigate("/admin/students");
    } catch (error) {
      console.error("Error registering in: ", error);
      toast.error("Somethin wrong. Please try again");
    }
  };
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-9 mx-2 flex h-[640px] w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">UPDATE VIDEO</h1>
        <Link to={"/admin/students"}>
          <ion-icon
            name="close-outline"
            class="absolute right-0 top-2 cursor-pointer text-5xl font-bold text-st_blue md:top-2 md:text-5xl"
          />
        </Link>

        <form
          onSubmit={updateVideo}
          className="flex h-full w-full flex-col items-center justify-center"
        >
          <div className="flex flex-col items-start justify-center">
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
            <div className="flex w-full items-center justify-start gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={data.isActive}
                onChange={handleInputChange}
                className="size-5 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
              />
              <h1 className="text-st_blue md:text-2xl">
                {data.isActive ? "Active user" : "Inactive user"}
              </h1>
            </div>
          </div>
          <input
            type="submit"
            value="Update"
            className="mt-5 cursor-pointer rounded bg-st_blue px-2 text-white md:px-4 md:py-2 md:text-xl"
          />
        </form>
      </div>
    </div>
  );
}