import { useEffect, useRef } from "react";

import Images from "@/constant/Images";
import { useNavigate } from "react-router-dom";

const UserLogoutModal = ({ userLogoutModalState, setUserLogoutModalState }) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setUserLogoutModalState();
    }
  };

  useEffect(() => {
    if (userLogoutModalState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userLogoutModalState]);

  if (!userLogoutModalState) return null;
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="fixed  flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
      <div
        ref={modalRef}
        className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3"
      >
        {/*  */}
        <div className="flex justify-center mt-7">
          <div className="rounded-full p-6 bg-[#ffebec] md:p-4">
            <img
              src={Images.logout}
              alt="slash"
              className="md:w-10 md:h-10 w-[60px] h-[60px]"
            />
          </div>
        </div>
        <div className="flex justify-center py-5">
          <p className="text-grey-800">
            Are you sure you would like to log out of your Avatar Walk account?
          </p>
        </div>

        <div className="flex mt-4 gap-2">
          <button
            onClick={() => setUserLogoutModalState(false)}
            className="bg-grey-900 text-white py-3 font-bold rounded md:text-sm w-[49%]"
          >
            Cancel
          </button>
          <button
            className="border border-grey-900 text-grey-900 py-3 font-bold rounded md:text-sm w-[49%]"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogoutModal;
