import React from "react";
import { Link } from "react-router-dom";
import clsLogo from "../../images/clsLogo.png";
import welcomePic from "../../images/welcomePic.png";
import clsTxtLogo from "../../images/clsTxtLogo.png";

export default function WelcomeComponent() {
  const handleWhatsappMessage = () => {
    const mobileNo = "+94713149460";
    const message = "Join for online class";
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${mobileNo}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebookNavigate = () => {
    const facebookUrl =
      "https://web.facebook.com/profile.php?id=100090594790414";
    window.open(facebookUrl, "_blank");
  };

  const handleYoutubeNavigate = () => {
    const youtubeUrl = "https://www.youtube.com/@RavishkaKalinga/";
    window.open(youtubeUrl, "_blank");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-y-auto bg-st_blue md:overflow-hidden">
      <div className="bg-welcome relative flex h-screen w-[360px] flex-col items-center justify-start overflow-y-auto rounded bg-cover bg-right-bottom md:h-[720px] md:w-[1280px] md:overflow-y-hidden">
        <div className="flex w-full flex-row items-start justify-between p-2">
          <div>
            <img src={clsLogo} alt="" className="w-10 md:w-16" />
          </div>
          <div className="flex flex-row items-center justify-center gap-5 text-sm font-semibold text-st_red md:gap-10 md:text-xl">
            <h1
              onClick={handleWhatsappMessage}
              className="cursor-pointer transition-all hover:scale-105 hover:text-st_blue"
            >
              Contact Us
            </h1>
            <h1
              onClick={handleFacebookNavigate}
              className="cursor-pointer transition-all hover:scale-105 hover:text-st_blue"
            >
              facebook
            </h1>
            <h1
              onClick={handleYoutubeNavigate}
              className="cursor-pointer transition-all hover:scale-105 hover:text-st_blue"
            >
              YouTube
            </h1>
          </div>
          <div>
            <Link to={"/login"}>
              <h1 className="cursor-pointer rounded bg-st_blue px-2 text-white transition-all hover:scale-105 md:px-2 md:py-1 md:text-xl">
                Login
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col-reverse items-center justify-center gap-5 md:flex-row">
          <div className="flex flex-col items-start justify-center p-2 md:w-[700px] md:p-0">
            <div className="w-full">
              <h1 className="bg-white/75 text-justify text-2xl font-semibold text-st_blue md:text-4xl">
                ආයුබෝවන් ළමයි,
              </h1>
              <h1 className="mt-2 bg-white/75 text-justify text-lg text-st_dark_gray md:text-2xl">
                ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය විෂයට විශිෂ්ඨ ප්‍රතිඵලයක්
                ලබාගැනීමට ඔයත් කැමතිද?
              </h1>
              <h1 className="mt-5 bg-white/75 text-justify text-lg font-semibold text-st_green md:text-2xl">
                අපෙන් ඔබට,
              </h1>
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="ml-5 flex items-center gap-5 bg-white/75 md:flex-row">
                  <ion-icon
                    name="checkmark-circle"
                    className="hidden text-lg text-st_green md:flex md:text-xl"
                  />
                  <h1 className="text-justify font-semibold text-st_dark_gray md:text-xl">
                    සියලුම පාඩම් ඉතා පැහැදිලිව සාකච්ජා කිරීම.
                  </h1>
                </div>
                <div className="ml-5 flex items-center gap-5 bg-white/75">
                  <ion-icon
                    name="checkmark-circle"
                    className="hidden text-lg text-st_green md:flex md:text-xl"
                  />
                  <h1 className="text-justify font-semibold text-st_dark_gray md:text-xl">
                    සියලුම නිබන්ධන ඔබගේ නිවසටම් ලැබීමට සැලැස්වීම.
                  </h1>
                </div>
                <div className="ml-5 flex items-center gap-5 bg-white/75">
                  <ion-icon
                    name="checkmark-circle"
                    className="hidden text-lg text-st_green md:flex md:text-xl"
                  />
                  <h1 className="text-justify font-semibold text-st_dark_gray md:text-xl">
                    Recording පහසුකම්.
                  </h1>
                </div>
                <div className="ml-5 flex items-center gap-5 bg-white/75">
                  <ion-icon
                    name="checkmark-circle"
                    className="hidden text-lg text-st_green md:flex md:text-xl"
                  />
                  <h1 className="text-justify font-semibold text-st_dark_gray md:text-xl">
                    පාඩම් සම්බන්ධයෙන් ඇතිවන ගැටලු Whatsapp මගින් ඕනෑම මොහොතක
                    විසදගැනීම.
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-5 flex w-full flex-row items-center justify-center">
              <div
                onClick={handleWhatsappMessage}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-st_green p-2 transition-all hover:scale-110"
              >
                <ion-icon
                  name="logo-whatsapp"
                  class="font-semibold text-white md:text-3xl"
                />
                <h1 className="font-semibold text-white md:text-xl">
                  Join Now
                </h1>
              </div>
            </div>
          </div>
          <div className="flex -translate-y-10 flex-col items-center justify-center">
            <img src={welcomePic} alt="" className="w-[300px] md:w-[450px]" />
            <img src={clsTxtLogo} alt="" className="w-60 bg-white/30 md:w-72" />
          </div>
        </div>
      </div>
    </div>
  );
}
