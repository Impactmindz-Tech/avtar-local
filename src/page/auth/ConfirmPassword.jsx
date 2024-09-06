import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { conformPassword } from "@/utills/formvalidation/FormValidation";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
// import { signupgoogle } from "@/constant/optimizedFunction/loginFunction/LoginFunction"; // Adjust path based on your project
import { changePasswordApi } from "@/utills/service/authService";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const ConfirmPassword = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(conformPassword) });

  // const handleGoogleSignup = () => {
  //   signupgoogle(navigate);
  // };

  const userRole = getLocalStorage("user")?.user?.Activeprofile;

  

  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      const response = await changePasswordApi(params?.id, formData);
      if (response?.isSuccess) {
        toast.success(response?.message);
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {loader && <Loader />}

      <div className="max-w-[50%] mx-auto lg:max-w-full">
        <h1>AvatarWalk</h1>
        <div className="pt-10">
          <div className="my-5">
            <h1>Create New Password</h1>
            <p className="text-grey-800 py-2">
              Your new password must be different from the previous password you
              used.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="pt-4">
              <label htmlFor="newPassword" className="label">
                New Password
              </label>
              <br />
              <div className="input flex">
                <input
                  className="w-full outline-none"
                  type={!showPassword ? "password" : "text"}
                  placeholder="must be 8 characters"
                  name="newPassword"
                  id="newPassword"
                  {...register("newPassword")}
                />
                {showPassword && (
                  <VisibilityOutlinedIcon
                    onClick={handleShowPassword}
                    className="cursor-pointer text-gray-400"
                  />
                )}
                {!showPassword && (
                  <VisibilityOffOutlinedIcon
                    onClick={handleShowPassword}
                    className="cursor-pointer text-gray-400"
                  />
                )}
              </div>
              <p className="text-[red]">{errors?.newPassword?.message}</p>
            </div>
            <div className="pt-4">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <br />
              <div className="input flex">
                <input
                  className="w-full outline-none"
                  type={!showConfirmPassword ? "password" : "text"}
                  placeholder="repost password"
                  name="confirmPassword"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                />
                {showConfirmPassword && (
                  <VisibilityOutlinedIcon
                    onClick={handleShowConfirmPassword}
                    className="cursor-pointer text-gray-400"
                  />
                )}
                {!showConfirmPassword && (
                  <VisibilityOffOutlinedIcon
                    onClick={handleShowConfirmPassword}
                    className="cursor-pointer text-gray-400"
                  />
                )}
              </div>
              <p className="text-[red]">{errors?.confirmPassword?.message}</p>
            </div>
            <button
              className="cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-8 rounded-xl"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
