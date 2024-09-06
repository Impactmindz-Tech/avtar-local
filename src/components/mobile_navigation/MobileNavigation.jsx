import Images from "@/constant/Images";
import { NavLink } from "react-router-dom";

const MobileNavigation = ({ role }) => {
  if (role === "user") {
    return (
      <div className="mobile-navigation fixed bottom-0 left-0 top-auto hidden md:block w-full z-50">
        <ul className="flex bg-[#2D2D2D] px-4">
          <li className="grow">
            <NavLink
              to="/user/dashboard"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <img
                src={Images.iconHomeDark}
                alt=""
                className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
              />
              <img
                src={Images.iconHomeLight}
                alt=""
                className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
              />
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Home
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/user/chat"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <div className="relative">
                <img
                  src={Images.iconChatsDark}
                  alt=""
                  className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
                />
                <img
                  src={Images.iconChatsLight}
                  alt=""
                  className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
                />
                <span className="nav-badge px-2 py-1 rounded-full bg-gradient-to-br from-[#FF7070] to-[#FF4545] leading-none text-white text-[10px] absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] sm:text-[8px] sm:px-[4px] sm:py-[3px]">
                  8
                </span>
              </div>
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Chats
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/user/explore-map"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <img
                src={Images.iconGlobeDark}
                alt=""
                className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
              />
              <img
                src={Images.iconGlobeLight}
                alt=""
                className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
              />
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Explore
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/user/experience"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <div className="relative">
                <img
                  src={Images.iconCalendarDark}
                  alt=""
                  className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
                />
                <img
                  src={Images.iconCalendarLight}
                  alt=""
                  className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
                />
                <span className="nav-badge px-2 py-1 rounded-full bg-gradient-to-br from-[#FF7070] to-[#FF4545] leading-none text-white text-[10px] absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] sm:text-[8px] sm:px-[4px] sm:py-[3px]">
                  2
                </span>
              </div>
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Experience
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/user/profile"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <img
                src={Images.iconProfileDark}
                alt=""
                className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
              />
              <img
                src={Images.iconProfileLight}
                alt=""
                className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
              />
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Profile
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/user/offers"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <img
                src={Images.iconDiscountDark}
                alt=""
                className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
              />
              <img
                src={Images.iconDiscountLight}
                alt=""
                className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
              />
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Offer
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="mobile-navigation fixed bottom-0 left-0 top-auto hidden md:block w-full z-40">
        <ul className="flex bg-[#2D2D2D] px-4">
          <li className="grow">
            <NavLink
              to="/avatar/dashboard"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <img
                src={Images.iconHomeDark}
                alt=""
                className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
              />
              <img
                src={Images.iconHomeLight}
                alt=""
                className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
              />
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Home
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/avatar/chat"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <div className="relative">
                <img
                  src={Images.iconChatsDark}
                  alt=""
                  className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
                />
                <img
                  src={Images.iconChatsLight}
                  alt=""
                  className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
                />
                <span className="nav-badge px-2 py-1 rounded-full bg-gradient-to-br from-[#FF7070] to-[#FF4545] leading-none text-white text-[10px] absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] sm:text-[8px] sm:px-[4px] sm:py-[3px]">
                  8
                </span>
              </div>
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Chats
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/avatar/experience"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <div className="relative">
                <img
                  src={Images.iconCalendarDark}
                  alt=""
                  className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
                />
                <img
                  src={Images.iconCalendarLight}
                  alt=""
                  className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
                />
                <span className="nav-badge px-2 py-1 rounded-full bg-gradient-to-br from-[#FF7070] to-[#FF4545] leading-none text-white text-[10px] absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] sm:text-[8px] sm:px-[4px] sm:py-[3px]">
                  2
                </span>
              </div>
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Experience
              </span>
            </NavLink>
          </li>
          <li className="grow">
            <NavLink
              to="/avatar/profile"
              className="group flex flex-col items-center pt-[18px] pb-[12px] px-[5px] text-[#757575] font-bold text-xs border-t-2 border-transparent h-full [&.active]:border-white [&.active]:bg-gradient-to-b 
            from-[#ffffff]/[0.18] to-[#ffffff]/[0]"
            >
              <img
                src={Images.iconProfileDark}
                alt=""
                className="group-[.active]:hidden w-[22px] h-[22px] object-contain"
              />
              <img
                src={Images.iconProfileLight}
                alt=""
                className="hidden group-[.active]:block w-[22px] h-[22px] object-contain"
              />
              <span className="mt-[10px] group-[.active]:text-white sm:hidden">
                Profile
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default MobileNavigation;
