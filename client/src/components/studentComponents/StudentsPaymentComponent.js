import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";

export default function StudentsPaymentComponent() {
  //get user
  const { user } = useContext(UserContext);

  //get current year
  const currentYear = new Date().getFullYear();

  //loadin state
  const [isLoading, setIsLoading] = useState(true);

  //get student details by id
  useEffect(() => {
    const getStudent = async () => {
      try {
        await axios.get(`/users/student/${user._id}`);
      } catch (error) {
        console.log(error);
      }
    };
    getStudent();
  }, [user._id]);

  //get current payment data from backend
  const [data, setData] = useState([]);
  useEffect(() => {
    const getExistsData = async () => {
      try {
        const response = await axios.get(`payments/get/${user._id}`);
        if (response.data.payment) {
          setData(response.data.payment);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getExistsData();
  }, [user._id]);

  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-st_blue">
      <div className="relative top-20 mx-2 flex h-screen w-full flex-col items-center justify-start bg-white p-3 md:mx-[376px]">
        <h1 className="text-3xl font-bold text-st_blue">PAYMENTS</h1>

        {/* student id and name */}
        <div className="mt-5 flex w-full justify-start border-b-2 border-b-st_blue pb-5">
          <table>
            <tbody>
              <tr>
                <td className="font-bold text-st_blue md:text-xl">ID:</td>
                <td className="pl-5 font-bold text-st_dark_gray md:text-xl">
                  {setIsLoading && user._id}
                </td>
              </tr>
              <tr>
                <td className="font-bold text-st_blue md:text-xl">Name:</td>
                <td className="pl-5 font-bold text-st_dark_gray md:text-xl">
                  {user.firstName} {user.lastName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* student payment details */}
        <div className="relative mt-5 w-full">
          <div className="mb-2 flex w-full flex-col items-center justify-between">
            <div className="flex w-full items-center justify-start">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h1 className="font-semibold text-st_blue">YEAR :</h1>
                    </td>
                    <td className="pl-5">
                      <h1 className="font-semibold text-st_red">
                        {currentYear}
                      </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="mt-5 w-full">
              <thead className="sticky top-0 rounded border-b-2 bg-st_light_gray">
                <tr className="text-st_blue">
                  <th className="p-3 text-left font-bold tracking-wide md:w-96 md:pl-6">
                    MONTH
                  </th>
                  <th className="p-3 text-left font-bold tracking-wide">
                    STATUS
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="h-[250px] overflow-y-auto md:h-[360px]">
            <table className="w-full">
              <tbody className="mt-3">
                <tr className="bg-white">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    January
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.january ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.january
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    February
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.february ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.february
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    March
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.march ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.march
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    April
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.april ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.april
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    May
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.may ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading ? "Loading..." : data.may ? "Paid" : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    June
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.june ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading ? "Loading..." : data.june ? "Paid" : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    July
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.july ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading ? "Loading..." : data.july ? "Paid" : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    August
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.august ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.august
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    September
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.september ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.september
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    October
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.october ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.october
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    November
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.november ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.november
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
                <tr className="bg-st_light_gray">
                  <td className="w-1/3 p-3 font-semibold text-st_dark_gray md:pl-6">
                    December
                  </td>
                  <td
                    className={`w-1/3 p-3 pl-4 font-semibold ${data.december ? "text-st_green" : "text-st_red"} md:pl-6`}
                  >
                    {isLoading
                      ? "Loading..."
                      : data.december
                        ? "Paid"
                        : "Not Paid"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
