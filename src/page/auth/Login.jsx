import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "../../constant/Images";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "@/utills/formvalidation/FormValidation";
import { getLocalStorage, setLocalStorage } from "@/utills/LocalStorageUtills";
import {
  googlesignupandsigninApi,
  loginApi,
} from "@/utills/service/authService";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { auth } from "../../FirebaseConfig/config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [isEmail] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const provider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidation) });

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
              setLocalStorage("user", response);
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

  const handleAppleSignin = async (e) => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const handleEmailPopup = (e) => {
    e.preventDefault();
    setShowEmailPopup(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:4000/auth/login",
        handleCodeInApp: true,
      });
      setLocalStorage("email", email);

      setShowEmailPopup(false);
    } catch (error) {
      console.log("Error sending sign-in link:", error);
    }
  };

  useEffect(() => {
    const handleSignInWithEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = getLocalStorage("email");
        if (!email) {
          email = window.prompt("Please provide your email");
        }
        try {
          await signInWithEmailLink(auth, email, window.location.href);

          localStorage.removeItem("email");
          navigate("/user/dashboard");
        } catch (error) {
          console.log("Error during email sign-in:", error);
          navigate("/auth/login");
        }
      }
    };

    handleSignInWithEmailLink();
  }, [isEmail, navigate]);

  const userRole = getLocalStorage("user")?.user?.Activeprofile;

  const onSubmit = async (formData) => {
    try {
      setLoader(true);
      const response = await loginApi(formData);
      if (response?.isSuccess) {
        if (response?.isSuccess && response?.data?.length > 1) {
          setLocalStorage("user", response);
          navigate("/auth/role/" + response?.data[0].userId, {
            state: { formData },
          });
        } else {
          setLocalStorage("user", response?.data);
          setLocalStorage("token", response?.token);
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.log("Error during form submission:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loader && <Loader />}
      <div className="max-w-[60%] mx-auto lg:max-w-full relative">
        <h1>AvatarWalk</h1>
        {showEmailPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[99]">
            <div className="bg-white p-6 rounded-md shadow-md w-[20%] sm:w-[90%]">
              <div className="flex items-start justify-between">
                <h2 className="text-xl mb-4">Enter your email</h2>
                <div className="text-right">
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowEmailPopup(false)}
                  />
                </div>
              </div>
              <input
                type="email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <button
                onClick={handleEmailSubmit}
                className="w-full bg-primaryColor-900 p-2 text-white rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="pt-10">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="username" className="label">
                Username
              </label>
              <br />
              <input
                className="input"
                type="text"
                placeholder="Eg. Rohan Sharma"
                name="username"
                id="username"
                {...register("userName")}
              />
            </div>
            <p className="text-[red]">{errors?.userName?.message}</p>
            <div className="pt-4">
              <label htmlFor="password" className="label">
                Password
              </label>
              <br />
              <div className="input flex">
                <input
                  className="w-full border-none outline-none"
                  type={showPassword ? "text" : "password"}
                  placeholder="Eg. Ro12******"
                  name="password"
                  id="password"
                  {...register("password")}
                />
                {showPassword ? (
                  <VisibilityOutlinedIcon
                    onClick={handleShowPassword}
                    className="cursor-pointer text-gray-400"
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={handleShowPassword}
                    className="cursor-pointer text-gray-400"
                  />
                )}
              </div>
            </div>
            <p className="text-[red]">{errors?.password?.message}</p>
            <div className="pt-1 text-right">
              <Link to="/auth/forget-password">Forgot Password?</Link>
            </div>
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
                By Signing In, You Agree to our{" "}
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

            <button className="font-bold cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-8 rounded-xl">
              Sign In
            </button>
          </form>

          <div className="flex flex-col gap-3 pt-2">
            <p className="text-center text-gray-400">Or</p>
            {/* <div className="flex items-center justify-center gap-3 cursor-pointer w-full bg-grey-300 p-4 text-center text-bg-primaryColor-900 rounded-xl" onClick={handleEmailPopup}>
            <img className="w-5 h-5" src={Image.mail_img} alt="" />
            <button className="font-semibold text-primaryColor-500">Continue with Email</button>
          </div> */}
            <div
              className="flex items-center justify-center gap-3 cursor-pointer w-full bg-grey-300 p-4 text-center text-bg-primaryColor-900 rounded-xl"
              onClick={handleGoogleSignup}
            >
              <img className="w-5 h-5" src={Image.google_img} alt="" />
              <button className="font-semibold text-primaryColor-500">
                Continue with Google
              </button>
            </div>
            {/* <div
            className="flex items-center justify-center gap-3 cursor-pointer w-full bg-grey-300 p-4 text-center text-bg-primaryColor-900 rounded-xl"
            onClick={handleAppleSignin}
          >
            <img className="w-5 h-5" src={Image.iphone_icon} alt="" />
            <button className="font-semibold text-primaryColor-500">
              Continue with Apple
            </button>
          </div> */}
            <div className="pt-5 text-center">
              <p className="text-gray-400">
                Don’t have an account?{" "}
                <Link
                  to={"/auth/signup"}
                  className="font-semibold text-gray-900"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
