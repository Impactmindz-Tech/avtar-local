import { useEffect, useRef, useState } from "react";

import Images from "@/constant/Images";
import { deleteAccountApi } from "@/utills/service/userSideService/userService/UserHomeService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const DeleteAccountModal = ({
  deleteAccountModalState,
  setDeleteAccountModalState,
}) => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setDeleteAccountModalState();
    }
  };

  useEffect(() => {
    if (deleteAccountModalState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteAccountModalState]);

  if (!deleteAccountModalState) return null;

  const freezeAccount = async () => {
    setLoader(true);
    try {
      let res = await deleteAccountApi(1);
      if (res?.isSuccess) {
        toast.success("Account Deleted Successfully");

        setDeleteAccountModalState();

        // Clear localStorage after 2 seconds
        setTimeout(() => {
          navigate("/auth/login");

          localStorage.clear();
        }, 2000);
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
      <div className="fixed  flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
        <div
          ref={modalRef}
          className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3"
        >
          {/*  */}
          <div className="flex justify-center mt-7">
            <div className="rounded-full p-6 bg-[#ffebec] md:p-4">
              <img
                src={Images.redtrash}
                alt="slash"
                className="md:w-10 md:h-10 w-[60px] h-[60px]"
              />
            </div>
          </div>
          <div className="flex justify-center py-5">
            <p className="text-grey-800 sm:text-center">
              Are you sure want to delete your account?
            </p>
          </div>

          <div className="flex mt-4 gap-2">
            <button
              onClick={() => setDeleteAccountModalState(false)}
              className="bg-grey-900 text-white py-3 font-bold rounded md:text-sm w-[49%]"
            >
              Cancel
            </button>
            <button
              onClick={() => freezeAccount()}
              className="border border-grey-900 text-grey-900 py-3 font-bold rounded md:text-sm w-[49%]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccountModal;
