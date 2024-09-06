import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Images from "@/constant/Images";
import { loginApi, userRoleApi } from "@/utills/service/authService";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utills/LocalStorageUtills";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const Role = () => {
  const [loader, setLoader] = useState(false);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const action = getLocalStorage("user")?.action;
  const userRole = getLocalStorage("user")?.Activeprofile;
  const [role, setRole] = useState({
    user: true,
    avatar: false,
  });


  const changeSelectedState = (name) => {
    if (name == "user") {
      setRole({ avatar: false, user: true });
    } else {
      setRole({ avatar: true, user: false });
    }
  };

  const setRoles = async () => {
    const id = params?.user;
    const data = {
      role: role.user ? "user" : "avatar",
    };
    try {
      setLoader(true);
      const response = await userRoleApi(id, data);

      if (response?.isSuccess) {
   
        setLocalStorage("user" , response)
        toast.success(response?.message);
        navigate("/auth/address/" + response?.data?.userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const roleLogin = async () => {
    let data;
    if (location?.state?.body?.isgoogleSignup) {
      data = {
        role: role.user ? "user" : "avatar",

        uid: location?.state?.body?.uid,
      };
    } else {
      data = {
        role: role.user ? "user" : "avatar",
        userName: location?.state?.formData?.userName,
        password: location?.state?.formData?.password,
      };
    }

    try {
      setLoader(true);
      const response = await loginApi(data);
      if (response?.isSuccess) {
        setLocalStorage("user", response?.data);
        setLocalStorage("token", response?.token);
        userRole == "user" ? navigate("/user/dashboard") : navigate("/avatar/dashboard");
        removeLocalStorage("userDetails");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="max-w-[50%] mx-auto lg:max-w-full">
        <p className="text-grey-800">Please Choose User Category :</p>
        <div className="flex flex-col gap-5 pt-5">
          <div className={`${role.user ? "bg-primaryColor-900" : "border border-[#ccc] cursor-pointer"} flex items-center gap-2  p-5 rounded-3xl relative`} onClick={() => changeSelectedState("user")}>
            <img className="w-10" src={Images.user_icon} alt="" />
            <span className={`${role.user ? "text-white" : "text-primaryColor-900"} sm:text-sm`}>As a User</span>

            {role.user && (
              <div className="tick bg-[#757575] rounded-full p-1 absolute right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <div className={`${role.avatar ? "bg-primaryColor-900" : "border border-[#ccc] cursor-pointer"} flex items-center gap-2  p-5 rounded-3xl relative`} onClick={() => changeSelectedState("avatar")}>
            <img className="w-10 h-10" src={Images.avtar_icon} alt="" />
            <span className={`${role.avatar ? "text-white" : "text-primaryColor-900"} sm:text-sm`}>As a Avatar</span>
            {role.avatar && (
              <div className="tick bg-[#757575] rounded-full p-1 absolute right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          <div onClick={action === "login" ? roleLogin : setRoles} className="cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-8 rounded-xl">
            <button>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
