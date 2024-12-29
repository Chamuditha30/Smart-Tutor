import React from "react";
import { Link } from "react-router-dom";
import welcomeCover from "../../images/welcomeCover.jpg";
import welcomePp from "../../images/welcomePp.jpg";

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
      <div className="relative flex h-screen w-[360px] flex-col items-center justify-start overflow-y-auto overflow-x-hidden rounded bg-st_light_gray md:h-[720px] md:w-[1280px]">
        <div className="relative flex flex-col items-center justify-center">
          <img src={welcomeCover} alt="" className="drop-shadow-lg" />
          <img
            src={welcomePp}
            alt=""
            className="absolute -bottom-1/2 w-32 rounded-full drop-shadow-lg md:-bottom-1/3 md:w-80"
          />
          <Link
            to={"/login"}
            className="absolute left-2 top-2 cursor-pointer rounded bg-st_blue px-2 text-white md:px-4 md:py-1 md:text-xl"
          >
            Login
          </Link>
        </div>
        <h1 className="mt-20 text-2xl font-semibold text-st_red drop-shadow-xl md:mt-48 md:text-5xl">
          RAVISHKA KALINGA
        </h1>
        <div className="mt-5 flex w-full flex-col p-2">
          <div className="rounded-lg bg-white p-2 drop-shadow-xl">
            <h1 className="text-xl font-semibold text-st_dark_gray md:text-2xl">
              ආයුබෝවන් ළමයි,
            </h1>
            <h1 className="mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
              ඔයත් මෙම වසරේදී නවය වසර පන්තියේ සිට දහය වසර පන්තියට යන්න බලාගෙන
              ඉන්න කෙනෙක්ද?
            </h1>
            <h1 className="mt-2 text-justify text-lg font-semibold text-st_dark_gray md:text-xl">
              එහෙනම් ඔයාට මේක අනිවාර්‍යයෙන්ම වැදගත් වේවි...
            </h1>
            <h1 className="mt-2 text-justify text-lg font-semibold text-st_dark_gray md:text-xl">
              දහය වසරේදී ඔයාට තෝරගන්න තියෙනවා කොමස් එහෙම නැත්නම් ව්‍යාපාර හා
              ගිණුම්කරණ අධ්‍යයනය විෂය.
            </h1>
          </div>
          <div className="mt-5 rounded-lg bg-white p-2 drop-shadow-xl">
            <h1 className="text-justify text-xl font-semibold text-st_red md:text-2xl">
              මේ විෂය අනිවාර්යෙන් තොර ගන්න ඕනේ ඇයි?
            </h1>
            <ol className="list-inside list-decimal">
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                විශ්වාසයෙන් කියන්නේ කොමස් තමයි පළවෙනි කාණ්ඩයේ තියෙන විෂයන්
                අතරින් ඒ එකක් දාන්න තියෙන ලේසිම විෂය.
              </li>
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                අනාගතයේ මොන ක්ශේත්‍රයේ රැකියාවක් කරත් ඒ හැම දේටම ඕන කරන මූල්‍ය
                දැනුම ඔයාට දෙන්නේ කොමස් වලින්.
              </li>
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                උසස්පෙළ ඉවර වෙලා කවද හරි කැම්පස් යන්න බලාපොරොත්තුවක් තියෙනවන්,
                කළමණාකරන උපාධි පාඨමාලා වැනි කොමස් විෂය හා සමගාමී උපාධි පාඨමාලා
                හදාරන්න ලොකු උදව්වක් තියනවා.
              </li>
            </ol>
          </div>
          <div className="mt-5 rounded-lg bg-white p-2 drop-shadow-xl">
            {" "}
            <h1 className="text-justify text-xl font-semibold text-st_red md:text-2xl">
              අපේ Online කොමස් පන්තියේ වැදගත්කම්.
            </h1>
            <ol className="list-inside list-decimal">
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                සෑම පාඩමක්ම අපි ඔයා එක්ක කතා කරන ගමන් බොහොම පැහැදිලිව ඔයාට
                උගන්වනවා.
              </li>
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                සෑම පාඩමකටම වෙන් වෙන් වශයෙන් අපි හදලා තියෙන නිබන්ධන / ප්‍රශ්න
                පත්‍ර අපි ඔයාගෙ ගෙදරටම ඔයාගෙ අතටම ලැබෙන්න සලස්වනවා.
              </li>
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                හදිස්සියෙ හරි ඔයාට පංතියකට සහභාගී වෙන්න බැරි වුණොත් එහෙම ඕනෑම
                මොහොමතක ඔයාට නැවත බලන්න පුලුවන් වෙන්න. අපි ඔයාට ඔයාට recordings
                පහසුකම ලබා දීලා තියෙනවා.
              </li>
              <li className="ml-5 mt-2 text-justify text-lg font-semibold text-st_blue md:text-xl">
                පාඩම් සම්බන්ධ ඔයාට එන ගැටලුවක් ඕනෑම මොහොතක විසගන්න අපි ඔයාට
                whatssapp no එකක් නම්බර් එකක් දෙනවා.
              </li>
            </ol>
          </div>
          <div className="mt-5 rounded-lg bg-white p-2 drop-shadow-xl">
            <h1 className="text-justify text-xl font-semibold text-st_red md:text-2xl">
              ඉතින් 10 වසරෙදි කොමස් කරන්න බලාගෙන ඉන්න ඔයාට අපි ආරාධනා කරනවා
              දිවයිනේ සාර්ථකම Online කොමස් පංතියත් එක්ක එකතු වෙන්න කියලා.
            </h1>
          </div>
        </div>
        <div className="my-3 flex flex-col items-center justify-center rounded-lg bg-white p-2 drop-shadow-xl">
          <h1 className="mb-5 text-justify text-2xl font-semibold text-st_blue md:text-3xl">
            Contact Us
          </h1>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
            <div className="flex items-center justify-center">
              <ion-icon
                name="logo-whatsapp"
                class="cursor-pointer text-3xl font-bold text-st_green md:text-5xl"
              />
              <div
                onClick={handleWhatsappMessage}
                className="ml-5 flex w-40 cursor-pointer items-center justify-center rounded-lg bg-white px-2 py-1 text-left text-sm drop-shadow-xl transition-all hover:scale-110 hover:bg-st_green hover:text-white md:text-lg"
              >
                <h1 className="tracking-widest">Whatsapp</h1>
              </div>
            </div>
            <div
              onClick={handleFacebookNavigate}
              className="flex items-center justify-center"
            >
              <ion-icon
                name="logo-facebook"
                class="cursor-pointer text-3xl font-bold text-st_blue md:text-5xl"
              />
              <div className="ml-5 flex w-40 cursor-pointer items-center justify-center rounded-lg bg-white px-2 py-1 text-left text-sm drop-shadow-xl transition-all hover:scale-110 hover:bg-st_blue hover:text-white md:text-lg">
                <h1 className="tracking-widest">Facebook</h1>
              </div>
            </div>
            <div
              onClick={handleYoutubeNavigate}
              className="flex items-center justify-center"
            >
              <ion-icon
                name="logo-youtube"
                class="cursor-pointer text-3xl font-bold text-st_red md:text-5xl"
              />
              <div className="ml-5 flex w-40 cursor-pointer items-center justify-center rounded-lg bg-white px-2 py-1 text-left text-sm drop-shadow-xl transition-all hover:scale-110 hover:bg-st_red hover:text-white md:text-lg">
                <h1 className="tracking-widest">Youtube</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
