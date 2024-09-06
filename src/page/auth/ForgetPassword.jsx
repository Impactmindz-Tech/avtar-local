import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
// import { signupgoogle } from "@/constant/optimizedFunction/loginFunction/LoginFunction"; // Adjust path based on your project
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forgetPassword,
  loginValidation,
} from "@/utills/formvalidation/FormValidation";
import { getLocalStorage, setLocalStorage } from "@/utills/LocalStorageUtills";
import { forgetPasswordApi, loginApi } from "@/utills/service/authService";
import TitleHeading from "@/components/Avatar/Heading/TitleHeading";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgetPassword) });

  const onSubmit = async (formData) => {
    setLoader(true);
    try {
      const response = await forgetPasswordApi(formData);
      if (response?.isSuccess) {
        setLocalStorage("forgetemail", formData?.email);
        toast.success(response?.message);
        navigate("/auth/otp-verify/" + response?.id);
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
        <h1>AvatarWalk</h1>
        <div className="pt-10">
          <div className="my-5">
            <h1>Forgot Password?</h1>
            <p className="text-grey-800 py-2">
              Please enter the email address linked with your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <br />
              <input
                className="input mt-3"
                type="email"
                placeholder="Your email"
                name="email"
                id="email"
                {...register("email")}
              />
            </div>
            <p className="text-[red]">{errors?.email?.message}</p>
            {/* <Link to="/auth/otp-verify"> */}
            <button className="cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-8 rounded-xl">
              Submit
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
