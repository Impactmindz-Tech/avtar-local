import { useCallback, useEffect, useState } from "react";
import Images from "@/constant/Images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "@/utills/LocalStorageUtills";
import HeaderNavigation from "../HeaderNavigation";
import { switchProfile } from "@/utills/service/switchRole/RoleSwitch";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { getAllcountryApi } from "@/utills/service/userSideService/userService/UserHomeService";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { initClient, createGoogleMeet } from "../../meetConfig/googleCalender";
import moment from "moment";
import { googlesignupandsigninApis } from "@/utills/service/getRole";

function Header() {
  const [userCountry, setUserCountry] = useState("India");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countrys, setCountrys] = useState([]);
  const [role, setRole] = useState(getLocalStorage("user") ? getLocalStorage("user") : null);
  const [selectedCountry, setSelectedCountry] = useState(getLocalStorage("selectedCountry") || getLocalStorage("user")?.Country);
  const location = useLocation();
  const [meetLink, setMeetLink] = useState("");
  const [eventId, setEventId] = useState("");
  const [roless, setRoles] = useState(null);
  const [duration, setDuration] = useState(30);
  const pathname = location?.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const storedCountry = getLocalStorage("selectedCountry")?.Country || "India";
    setUserCountry(storedCountry);
    setSelectedCountry(getLocalStorage("selectedCountry") || getLocalStorage("user").Country || storedCountry);

    initClient(updateSignInStatus);
    mainhead();
  }, []);

  const mainhead = async () => {
    try {
      const res = await googlesignupandsigninApis();
      if (res?.isSuccess) {
        setRoles(res);
        setLocalStorage("profileSize", res?.roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSignInStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
  };

  const roleSwitch = useCallback(async () => {
    const newRole = role?.Activeprofile === "user" ? "avatar" : "user";
    if (role === newRole) return;

    setLoading(true);
    try {
      const response = await switchProfile(newRole);
      if (response?.isSuccess) {
        setLocalStorage("user", response?.data);
        setLocalStorage("token", response?.token);
        setRole(newRole);
        toast.success(response?.message);

        const targetPath = newRole === "user" ? "/user/dashboard" : "/avatar/dashboard";
        navigate(targetPath, { replace: true });
      }
    } catch (error) {
      toast.error("Role switching failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [role, navigate]);

  const getAllcountry = async () => {
    if (pathname === "/user/dashboard") {
      try {
        const response = await getAllcountryApi({ country: selectedCountry });
        if (response?.isSuccess) {
          setCountrys(response?.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAllcountry();
  }, [pathname, selectedCountry]);

  const handleCountryChange = useCallback(
    (e) => {
      const selected = e.target.value;
      setSelectedCountry(selected);
      setUserCountry(selected);
      setLocalStorage("selectedCountry", selected);
      window.dispatchEvent(new Event("storage"));
    },
    [pathname]
  );

  const handleLiveButtonClick = async () => {
    navigate("/user/explore-map");
    // if (!isSignedIn) {
    //   try {
    //     await handleAuthClick();
    //   } catch (error) {
    //     if (error.error === "popup_closed_by_user") {
    //       toast.error("Authentication popup was closed before completing. Please try again.");
    //     } else {
    //       toast.error("An error occurred during authentication. Please try again.");
    //       console.error("Authentication error:", error);
    //     }
    //     return;
    //   }
    // }

    // const endTime = moment(startTime).add(duration, "minutes").format("YYYY-MM-DDTHH:mm:ss");
    // try {
    //   const response = await createGoogleMeet("Live Event", "Description of the event", startTime, endTime);
    //   const meetLink = response.result.hangoutLink;
    //   const eventId = response.result.id;
    //   setMeetLink(meetLink);
    //   setEventId(eventId);
    //   toast.success("Google Meet created successfully!");
    //   openMeetWindow(meetLink, duration);
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to create Google Meet.");
    // }
  };

  const openMeetWindow = (meetLink, duration) => {
    const meetWindow = window.open(meetLink, "_blank");
    setTimeout(() => {
      meetWindow.close();
    }, duration * 60000);
  };

  return (
    <>
      <section></section>
      {loading && <Loader />}
      <header className="flex justify-between items-center p-3">
        {location.pathname === "/user/dashboard" ? (
          <div className="select-location">
            <LocationOnIcon />
            <select value={selectedCountry} onChange={handleCountryChange} style={{ border: "none", outline: "none" }}>
              {countrys?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="brand">
          <Link to="/">
            <img src={Images.AvatarWalk} alt="AvatarWalk" />
          </Link>
        </div>
        <div className="cursor-pointer flex gap-4 items-center">
          {roless?.roles === 2 && (
            <button className="bg-[#ff5454] flex-1 py-[7px] text-white rounded-lg px-4 sm:hidden" onClick={roleSwitch}>
              {role?.Activeprofile === "user" ? "switch to avatar" : "switch to user"}
            </button>
          )}
          <button className="bg-[#ff5454] py-[7px] text-white rounded-lg px-4 sm:hidden" onClick={handleLiveButtonClick}>
            Live
          </button>

          <HeaderNavigation />
        </div>
      </header>
    </>
  );
}

export default Header;
