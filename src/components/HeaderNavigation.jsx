import Images from "@/constant/Images";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utills/LocalStorageUtills";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { switchProfile } from "@/utills/service/switchRole/RoleSwitch";

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(
    getLocalStorage("user") ? getLocalStorage("user")?.Activeprofile : null
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const roleSwitch = async () => {
    const newRole = role === "user" ? "avatar" : "user";
    try {
      const response = await switchProfile(newRole);
      if (response?.isSuccess) {
        removeLocalStorage("user");
        setLocalStorage("user", response?.data);
        role === "user"
          ? navigate("/user/dashboard")
          : navigate("/avatar/dashboard");
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {loading && <Loader />}

      <Sheet>
        <SheetTrigger asChild>
          <img
            className="w-8 sm:w-6 cursor-pointer"
            src={Images.hamburger_img}
            alt=""
          />
        </SheetTrigger>

        <SheetContent side="left">
          <SheetTitle as="h2" className="sr-only">
            Navigation Menu
          </SheetTitle>
          <div className="pt-14 pb-4 px-20 sm:px-2">
            {role === "user" ? (
              <>
                <div className="my-2">
                  <Link to="/user/dashboard" className="block max-w-[200px]">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/user/dashboard")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Home
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                {/* <div className="my-2">
                  <SheetTrigger className="max-w-[200px] w-full">
                    <button className="py-3 px-10 w-full bg-[#2D2D2D] text-white">
                      Explore
                    </button>
                  </SheetTrigger>
                </div> */}
                <div className="my-2">
                  <Link to="/user/experience" className="max-w-[200px] block">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/user/experience")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Experience
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="">
                  <Link to="/user/profile" className="max-w-[200px] block">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/user/profile")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Profile
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2">
                  <Link to="/user/offers" className="max-w-[200px] block">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/user/offers")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Offer
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2 hidden sm:block">
                  <Link to="/avatar/dashboard" className="block max-w-[200px]">
                    <button className="py-3 px-10 w-full bg-[#2D2D2D] text-white">
                      <button
                        className="flex-1 text-white"
                        onClick={roleSwitch}
                      >
                        {role === "user" ? "Switch To Avatar" : "Switch To User"}
                      </button>
                    </button>
                  </Link>
                </div>
                <div className="my-2 hidden sm:block">
                  <Link to="/user/offers" className="block max-w-[200px]">
                    <button className="py-3 px-10 w-full bg-[#2D2D2D] text-white">
                      Live Stream
                    </button>
                  </Link>
                </div>
                <div className="my-2">
                  <Link to="/user/chat" className="max-w-[200px] block">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/user/chat")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Chats
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2">
                  <SheetTrigger
                    className="max-w-[200px] w-full"
                    onClick={handleLogout}
                  >
                    <button className="py-3 px-10 w-full bg-[#ff5454]">
                      Log Out
                    </button>
                  </SheetTrigger>
                </div>
              </>
            ) : (
              <>
                <div className="my-2">
                  <Link to="/avatar/dashboard" className="block max-w-[200px]">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/avatar/dashboard")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Home
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2">
                  <Link to="/avatar/chat" className="block max-w-[200px]">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/avatar/chat")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Chats
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2">
                  <Link to="/avatar/experience-list" className="block max-w-[200px]">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/avatar/experience-list")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        My Experience
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2">
                  <Link to="/avatar/experience" className="block max-w-[200px]">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/avatar/experience")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Experience
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="">
                  <Link to="/avatar/profile" className="block max-w-[200px]">
                    <SheetTrigger className="w-full">
                      <button
                        className={`py-3 px-10 w-full text-white ${
                          isActive("/avatar/profile")
                            ? "bg-[#ff5454]"
                            : "bg-[#2D2D2D]"
                        }`}
                      >
                        Profile
                      </button>
                    </SheetTrigger>
                  </Link>
                </div>
                <div className="my-2 hidden sm:block">
                  <Link to="/user/offers" className="block max-w-[200px]">
                    <button className="py-3 px-10 w-full bg-[#2D2D2D] text-white">
                      <button
                        className="flex-1 text-white"
                        onClick={roleSwitch}
                      >
                        {role === "user" ? "Switch Avatar" : "Switch User"}
                      </button>
                    </button>
                  </Link>
                </div>
                <div className="my-2 hidden sm:block">
                  <Link to="/user/offers" className="block max-w-[200px]">
                    <button className="py-3 px-10 w-full bg-[#2D2D2D] text-white">
                      Live Stream
                    </button>
                  </Link>
                </div>
                <div className="my-2 max-w-[200px]" onClick={handleLogout}>
                  <button className="py-3 px-10 w-full bg-[#ff5454]">
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HeaderNavigation;
