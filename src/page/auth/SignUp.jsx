import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "../../constant/Images";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationValidation } from "@/utills/formvalidation/FormValidation";
import {
  googlesignupandsigninApi,
  loginApi,
  registrationApi,
} from "@/utills/service/authService";
import { auth } from "../../FirebaseConfig/config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { setLocalStorage } from "@/utills/LocalStorageUtills";
import toast from "react-hot-toast";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Loader from "@/components/Loader";

const SignUp = () => {
  const provider = new GoogleAuthProvider();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationValidation) });

  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      const response = await registrationApi(formData);
  
      if (response?.isSucces) {
        toast.success(response?.message);
        setLocalStorage("user", response?.data);
        navigate("/auth/role/" + response?.data?._id);
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

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const body = {
        userName: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
        uid: user.uid,
        isgoogleSignup: true,
      };
      if (user) {
        const response = await googlesignupandsigninApi(body);
        if (response?.isSuccess) {
          if (response?.data?.action == "registration") {
       
            toast.success(response?.message);
            setLocalStorage("user", response?.data);
            setLocalStorage("token", response?.token);
            navigate("/auth/role/" + response?.data?._id);
          } else {
            if (response?.isSuccess && response?.data?.length > 1) {
              setLocalStorage("userDetails", response);
              navigate("/auth/role/" + response?.data[0].userId, {
                state: { body },
              });
            } else {
              setLocalStorage("user", response?.data);
              setLocalStorage("token", response?.token);
              navigate("/user/dashboard");
            }
          }
        }
      }
    } catch (error) {
      console.error("Google Signup Error:", error);
      toast.error("Google Signup failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  // const handleGoogleSignup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Sign in with Google
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //       // Prepare request body for login
  //       const loginBody = {
  //         uid: user.uid,
  //         googleLogin: true,
  //       };

  //       // Attempt to log in
  //       const loginResponse = await loginApi(loginBody);

  //     if (loginResponse?.isSuccess) {
  //       if (loginResponse?.isSuccess && loginResponse?.data?.length > 1) {
  //         // Handle response when user data exists
  //         setLocalStorage("userDetails", loginResponse);
  //         navigate(`/auth/role/${loginResponse?.data[0].userId}`, {
  //           state: { body: loginResponse },
  //         });
  //       } else {
  //         // Handle response for successful login but without multiple user data
  //         setLocalStorage("user", loginResponse?.data);
  //         setLocalStorage("token", loginResponse?.token);
  //         navigate("/user/dashboard");
  //       }
  //     } else {
  //       // User not found, proceed to signup
  //       const signupBody = {
  //         userName: user.displayName,
  //         email: user.email,
  //         profileImage: user.photoURL,
  //         uid: user.uid,
  //         isgoogleSignup: true,
  //       };

  //       // Call signup API
  //       const signupResponse = await registrationApi(signupBody);

  //       console.log(signupResponse);
  //       if (signupResponse?.isSucces) {

  //           setLocalStorage("userDetails", signupResponse?.data);
  //           setLocalStorage("token", signupResponse?.token);
  //           navigate(`/auth/role/${signupResponse?.data?._id}`);

  //       } else {
  //         throw new Error("Signup failed");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Google Signup/Login Error:", error);
  //     toast.error("Google Signup/Login failed. Please try again.");
  //   }
  // };

  return (
    <>
      {loader && <Loader />}
      <div className="max-w-[60%] mx-auto lg:max-w-full">
        <h1>AvatarWalk</h1>
        <form className="pt-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="userName" className="label">
              Username
            </label>
            <br />
            <input
              className="input"
              type="text"
              placeholder="Eg. Rohan Sharma"
              name="userName"
              id="userName"
              {...register("userName")}
            />
          </div>
          <p className="text-[red]">{errors?.userName?.message}</p>
          <div className="pt-4">
            <label htmlFor="email" className="label">
              Email
            </label>
            <br />
            <input
              className="input"
              type="text"
              placeholder="Eg. rohansharma@gmail.com"
              name="email"
              id="email"
              {...register("email")}
            />
          </div>
          <p className="text-[red]">{errors?.email?.message}</p>
          <div className="pt-4">
            <label htmlFor="password" className="label">
              Password
            </label>
            <br />
            <div className="input flex">
              <input
                className="w-full outline-none"
                type={!showPassword ? "password" : "text"}
                placeholder="Eg. Ro12******"
                name="password"
                id="password"
                {...register("password")}
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
          </div>
          <p className="text-[red]">{errors?.password?.message}</p>
          <div className="pt-4">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <br />
            <div className="input flex">
              <input
                className="w-full outline-none"
                type={!showConfirmPassword ? "password" : "text"}
                placeholder="Eg. **********"
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
          </div>
          <p className="text-[red]">{errors?.confirmPassword?.message}</p>
          <div className="flex items-start space-x-2 pt-2">
            <div className="custom-check relative top-[5px]">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                {...register("terms")}
              />
              <div></div>
            </div>
            <Label htmlFor="terms" className="leading-normal text-gray-400">
              By Signing up, You Agree to our{" "}
              <Link to="/privacy">
                <span className="font-semibold text-gray-900">
                  Privacy Policy
                </span>{" "}
              </Link>
              and{" "}
              <Link to="/term">
                <span className="font-semibold text-gray-900">
                  Terms of Services.
                </span>
              </Link>
            </Label>
          </div>
          <p className="text-[red]">{errors?.terms?.message}</p>
          <button className="font-bold block cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-8 rounded-xl">
            Sign Up
          </button>
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-center text-gray-400">Or</p>
            <div
              className="flex items-center justify-center gap-3 cursor-pointer w-full bg-grey-300 p-4 text-center text-bg-primaryColor-900 rounded-xl"
              onClick={handleGoogleSignup}
            >
              <img className="w-5 h-5" src={Image.google_img} alt="" />
              <button className="font-semibold text-primaryColor-500">
                Continue with Google
              </button>
            </div>
            <div className="pt-5 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="font-semibold text-gray-900"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
