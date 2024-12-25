import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import loadingAnimation from "../../images/load.json";

export default function AdminStudentComponent() {
  //loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingYears, setIsLoadingYears] = useState(true);

  //get batch years
  const [years, setYears] = useState([]);
  useEffect(() => {
    const getYears = async () => {
      try {
        const response = await axios.get("/users/exam-years");
        setYears(response.data.examYears);
        setIsLoadingYears(false);
      } catch (error) {
        console.log(error);
      }
    };
    getYears();
  }, []);

  //get dropdown selected
  const [dropdownSelected, setDropdownSelected] = useState("");
  const handleDropdownSelection = (e) => {
    setDropdownSelected(e.target.value);
  };

  //get students
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const getStudents = async () => {
      if (!dropdownSelected) {
        try {
          const response = await axios.get("/users/allUsers");
          setStudents(response.data.users);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Students not found!");
        }
      } else {
        try {
          const response = await axios.get(
            `/users/students/${dropdownSelected}`,
          );
          setStudents(response.data.users);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Students not found!");
        }
      }
    };
    getStudents();
  }, [dropdownSelected]);

  //get search quary
  const [searchQuary, setSearchQuary] = useState("");

  //search handels
  const handleSearch = (e) => {
    setSearchQuary(e.target.value);
  };
  const clearSearch = () => {
    setSearchQuary("");
  };

  //filter students
  const filteredStudents = students.filter((student) => {
    const name = `${student.firstName} ${student.lastName}`.toLowerCase();
    return name.includes(searchQuary.toLowerCase());
  });

  //delete video
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/users/delete/${id}`);
      // Update the videos list after successful deletion
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Student deleted successful!");
    } catch (error) {
      console.log(error);
      toast.error("Student deleted failed");
    }
  };

  return (
    <div className="fixed">
      <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
        <div className="relative top-20 mx-2 flex h-screen w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
          <h1 className="text-3xl font-bold text-st_blue">STUDENTS</h1>

          <div className="mt-3 flex w-full items-center justify-between">
            {/* display student exam years dropdown */}
            <select
              name="examYear"
              value={dropdownSelected}
              onChange={handleDropdownSelection}
              className="w-40 cursor-pointer rounded bg-st_blue py-1 text-start text-white focus:outline-none md:w-60"
            >
              <option value={""} className="bg-white text-black">
                {isLoadingYears ? "Loading..." : "All students"}
              </option>
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="cursor-pointer bg-white text-black hover:bg-st_blue"
                >
                  {year}
                </option>
              ))}
            </select>

            {/* student searchbar */}
            <div className="relative flex items-center justify-end">
              <div className="flex w-48 items-center justify-center gap-2 rounded-full border-2 border-st_blue px-3 py-1 md:w-72">
                <input
                  type="text"
                  name="search"
                  placeholder="Search Name"
                  value={searchQuary}
                  onChange={handleSearch}
                  className="w-full text-st_blue focus:outline-none"
                />
                {searchQuary && (
                  <ion-icon
                    name="close-circle-outline"
                    onClick={clearSearch}
                    class="cursor-pointer text-lg text-st_dark_gray opacity-50 md:text-2xl"
                  />
                )}
                <ion-icon
                  name="search"
                  class="cursor-pointer text-lg text-st_blue md:text-2xl"
                />
              </div>
            </div>
          </div>

          {/* display all students and details */}
          <div className="mb-20 mt-3 h-full w-full overflow-y-auto">
            {/* set loading animation */}
            <div
              className={`${isLoading ? "flex" : "hidden"} h-full w-full items-center justify-center`}
            >
              <Lottie animationData={loadingAnimation} className="h-40 w-40" />
            </div>

            {/* student list */}
            {filteredStudents.map((student) => (
              <>
                <div
                  key={student._id}
                  className="mt-2 flex w-full items-center justify-between rounded bg-st_blue p-1"
                >
                  <div className="flex items-center justify-center gap-2 text-lg text-white">
                    <h1>{student.firstName}</h1>
                    <h1>{student.lastName}</h1>
                  </div>
                </div>

                <div className="mt-2 flex w-full flex-col items-start justify-between border-st_blue bg-white p-1 drop-shadow-md md:text-lg">
                  <table>
                    <tbody>
                      <tr>
                        <td className="text-sm text-st_blue md:text-lg">ID</td>
                        <td className="flex w-full gap-2 text-sm text-st_dark_gray md:text-lg">
                          <span className="mr-2 text-sm text-st_blue md:text-lg">
                            :
                          </span>
                          <p>{student._id}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm text-st_blue md:text-lg">
                          Exam Year
                        </td>
                        <td className="flex w-full gap-2 text-sm text-st_dark_gray md:text-lg">
                          <span className="mr-2 text-sm text-st_blue md:text-lg">
                            :
                          </span>
                          <p>{student.examYear}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm text-st_blue md:text-lg">
                          Mobile Number
                        </td>
                        <td className="flex w-full gap-2 text-sm text-st_dark_gray md:text-lg">
                          <span className="mr-2 text-sm text-st_blue md:text-lg">
                            :
                          </span>
                          <p>{student.mobileNo}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm text-st_blue md:text-lg">
                          E-mail
                        </td>
                        <td className="flex w-full gap-2 text-sm text-st_dark_gray md:text-lg">
                          <span className="mr-2 text-sm text-st_blue md:text-lg">
                            :
                          </span>
                          <p>{student.email}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm text-st_blue md:text-lg">
                          Address
                        </td>
                        <td className="flex w-full gap-2 text-sm text-st_dark_gray md:text-lg">
                          <span className="mr-2 text-sm text-st_blue md:text-lg">
                            :
                          </span>
                          <p>{student.address}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex w-full gap-10">
                    {/* delete button */}
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="mt-5 flex items-center justify-center gap-2 rounded bg-st_red px-2 py-1 text-sm text-white md:text-lg"
                    >
                      Delete
                      <ion-icon
                        name="trash"
                        class="cursor-pointer text-lg md:top-1.5 md:text-lg"
                      />
                    </button>

                    {/* payment details button */}
                    <Link
                      to={`/admin/student/payment/${student._id}`}
                      className="mt-5 flex items-center justify-center gap-2 rounded bg-st_green px-2 py-1 text-sm text-white md:text-lg"
                    >
                      Payments
                      <ion-icon
                        name="card"
                        class="cursor-pointer text-lg md:top-1.5 md:text-lg"
                      />
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
