import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function PaymentComponent() {
  //get student details by id
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await axios.get(`/users/student/${id}`);
        setStudent(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getStudent();
  }, [id]);
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-20 mx-2 flex h-screen w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">PAYMENTS</h1>
        <Link to={"/admin/students"}>
          <ion-icon
            name="close-outline"
            class="absolute right-0 top-2 cursor-pointer text-5xl font-bold text-st_blue md:top-2 md:text-5xl"
          />
        </Link>

        {/* student id and name */}
        <div className="mt-5 flex w-full justify-start border-b-2 border-b-st_blue pb-5">
          <table>
            <tbody>
              <tr>
                <td className="font-bold text-st_blue md:text-xl">ID:</td>
                <td className="pl-5 font-bold text-st_dark_gray md:text-xl">
                  {student._id}
                </td>
              </tr>
              <tr>
                <td className="font-bold text-st_blue md:text-xl">Name:</td>
                <td className="pl-5 font-bold text-st_dark_gray md:text-xl">
                  {student.firstName} {student.lastName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* student payment details */}
        <form className="relative mt-5 w-full">
          <div className="mb-2">
            <div>
              <h1>YEAR:</h1>
            </div>

            {/* update button */}
            <div></div>
          </div>
          <table className="w-full">
            <thead className="sticky top-0 rounded border-b-2 bg-st_light_gray">
              <tr className="text-st_blue">
                <th className="p-3 text-left font-semibold tracking-wide">
                  MONTH
                </th>
                <th className="p-3 text-left font-semibold tracking-wide">
                  STATUS
                </th>
                <th className="p-3 text-left font-semibold tracking-wide">
                  UPDATED BY
                </th>
                <th className="p-3 text-left font-semibold tracking-wide">
                  ACTION
                </th>
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto md:max-h-[400px]">
            <table className="w-full">
              <tbody className="mt-3">
                <tr className="bg-white">
                  <td className="p-3 text-st_dark_gray">January</td>
                  <td className="p-3 text-st_dark_gray"></td>
                  <td className="p-3 text-st_dark_gray"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="p-3 text-st_dark_gray">February</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 text-st_dark_gray">March</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="p-3 text-st_dark_gray">April</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 text-st_dark_gray">May</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="p-3 text-st_dark_gray">June</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 text-st_dark_gray">July</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="p-3 text-st_dark_gray">August</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 text-st_dark_gray">September</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="p-3 text-st_dark_gray">October</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 text-st_dark_gray">November</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="p-3 text-st_dark_gray">December</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}
