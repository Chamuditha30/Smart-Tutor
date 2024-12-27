import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function PaymentComponent() {
  //get user
  const { user } = useContext(UserContext);

  //get current year
  const currentYear = new Date().getFullYear();

  //loading state
  const [isLoading, setIsLoading] = useState(true);

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

  //get current payment data from backend
  const [isExists, setIsExists] = useState(false);
  useEffect(() => {
    const getExistsData = async () => {
      try {
        const response = await axios.get(`payments/get/${id}`);
        if (response.data.payment) {
          setData(response.data.payment);
          setIsExists(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getExistsData();
  }, [id]);

  //get input data
  const [data, setData] = useState({
    january: false,
    february: false,
    march: false,
    april: false,
    may: false,
    june: false,
    july: false,
    august: false,
    september: false,
    october: false,
    november: false,
    december: false,
  });

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  //send input data to backend, get response
  const updatePayment = async (e) => {
    e.preventDefault();

    try {
      const {
        january,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        september,
        october,
        november,
        december,
      } = data;

      const endpoint = isExists
        ? `/payments/update/${id}`
        : `/payments/create/${id}`;

      const response = await axios[isExists ? "put" : "post"](endpoint, {
        adminName: user.firstName,
        january,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        september,
        october,
        november,
        december,
      });

      if (response) {
        toast.success("Payment updated successful");
      }
    } catch (error) {
      console.error("Error registering in: ", error);
      toast.error("Somethin wrong. Please try again");
    }
  };

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
        <form onSubmit={updatePayment} className="relative mt-5 w-full">
          <div className="mb-2 flex w-full items-center justify-between">
            <table>
              <tbody>
                <tr>
                  <td>
                    <h1 className="font-semibold text-st_blue">YEAR :</h1>
                  </td>
                  <td className="pl-5">
                    <h1 className="font-semibold text-st_red">{currentYear}</h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 className="font-semibold text-st_blue">UPDATED BY :</h1>
                  </td>
                  <td className="pl-5">
                    <h1 className="font-semibold text-st_green">
                      {isLoading ? "Loading..." : data.adminName}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h1 className="font-semibold text-st_blue">
                      LAST UPDATE :
                    </h1>
                  </td>
                  <td className="flex gap-2 pl-5">
                    <h1 className="font-semibold text-st_green">
                      {isLoading
                        ? "Loading..."
                        : (() => {
                            try {
                              return new Date(data.updatedAt)
                                .toISOString()
                                .split("T")[0];
                            } catch (error) {
                              return "-";
                            }
                          })()}
                    </h1>
                    <h1 className="font-semibold text-st_green">at</h1>
                    <h1 className="font-semibold text-st_green">
                      {(() => {
                        try {
                          return new Date(data.updatedAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            },
                          );
                        } catch (error) {
                          return "-";
                        }
                      })()}
                    </h1>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex items-center justify-center gap-5">
              {/* update button */}
              <button
                type="submit"
                className="rounded bg-st_green px-3 py-1 text-sm text-white md:text-lg"
              >
                <ion-icon name="save" class="cursor-pointer text-lg" />
              </button>
            </div>
          </div>

          <table className="mt-5 w-full">
            <thead className="sticky top-0 rounded border-b-2 bg-st_light_gray">
              <tr className="text-st_blue">
                <th className="p-3 text-left font-bold tracking-wide md:w-64 md:pl-6">
                  MONTH
                </th>
                <th className="p-3 text-left font-bold tracking-wide">
                  STATUS
                </th>
                <th className="p-3 text-left font-bold tracking-wide">
                  ACTION
                </th>
              </tr>
            </thead>
          </table>

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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="january"
                      checked={data.january}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="february"
                      checked={data.february}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="march"
                      checked={data.march}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="april"
                      checked={data.april}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="may"
                      checked={data.may}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="june"
                      checked={data.june}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="july"
                      checked={data.july}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="august"
                      checked={data.august}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="september"
                      checked={data.september}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="october"
                      checked={data.october}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="november"
                      checked={data.november}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
                  <td className="w-1/3 p-3 pl-8 md:pl-10">
                    <input
                      type="checkbox"
                      name="december"
                      checked={data.december}
                      onChange={handleInputChange}
                      className="size-4 cursor-pointer border-st_blue bg-transparent checked:bg-st_blue focus:ring-st_blue"
                    />
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
