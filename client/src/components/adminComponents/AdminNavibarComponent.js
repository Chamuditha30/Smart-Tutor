import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import clsLogo from "../../images/clsLogo.png";
import clsTxtLogo from "../../images/clsTxtLogo.png";
import proPic from "../../images/proPic.png";

export default function AdminNavibarComponent() {
  //sidebar toggle
  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  //get user
  const { user, logoutUser } = useContext(UserContext);

  return (
    <>
      {/* navigation bar */}
      <div className="fixed z-10 flex w-screen items-center justify-between bg-white">
        <div className="m-2 flex w-full items-center justify-between">
          <ion-icon
            name={sideBar ? "close" : "menu"}
            onClick={toggleSideBar}
            class="cursor-pointer text-3xl text-st_blue transition-transform duration-300 ease-in-out md:text-4xl"
          />
          <img src={clsTxtLogo} alt="" className="w-40" />
          <img src={clsLogo} alt="" className="w-8" />
        </div>
      </div>

      {/* sidebar */}
      <div
        className={`fixed top-20 z-10 flex h-screen w-[360px] transform flex-col items-center justify-start bg-st_light_gray transition-transform duration-300 ease-in-out ${sideBar ? "left-2 translate-x-0" : "left-0 -translate-x-full"}`}
      >
        <img src={proPic} alt="" className="w-48 md:w-52" />

        <h1 className="border-b-2 border-b-st_blue pb-2 text-center text-2xl font-bold text-st_blue md:w-80 md:text-3xl">
          {user.firstName} {user.lastName}
        </h1>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-5">
          <Link to={"/admin/videos"}>
            <div className="flex w-40 cursor-pointer items-center justify-between rounded bg-st_green px-3 py-1 text-sm text-white md:text-lg">
              <h1>VIDEOS</h1>
              <ion-icon name="videocam" />
            </div>
          </Link>

          <Link to={"/admin/students"}>
            <div className="flex w-40 cursor-pointer items-center justify-between rounded bg-st_green px-3 py-1 text-sm text-white md:text-lg">
              <h1>STUDENTS</h1>
              <ion-icon name="people" />
            </div>
          </Link>

          <Link
            onClick={async () => {
              await logoutUser();
            }}
          >
            <div className="flex w-40 cursor-pointer items-center justify-between rounded bg-st_red px-3 py-1 text-sm text-white md:m-60 md:text-lg">
              <h1>LOG OUT</h1>
              <ion-icon name="log-out" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
