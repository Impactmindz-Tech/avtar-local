import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { signupgoogle } from "@/constant/optimizedFunction/loginFunction/LoginFunction"; // Adjust path based on your project
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import { forgetPasswordApi, verifyOtpApi } from "@/utills/service/authService";
import Loader from "@/components/Loader";
import {
  getLocalStorage,
  removeLocalStorage,
} from "@/utills/LocalStorageUtills";

const OtpVerify = () => {
  const params = useParams();
  const [loader, setLoader] = useState(false);

  const [value, setValue] = useState("");
  const [verify, setVerify] = useState(true); // Set initial state to true
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (!canResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      setTimer(20); // Reset the timer for the next resend
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // const handleGoogleSignup = () => {
  //   signupgoogle(navigate);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      otp: value,
    };
    try {
      setLoader(true);
      const response = await verifyOtpApi(params?.id, body);
      if (response?.isSuccess) {
        toast.success("Otp verified");
        navigate("/auth/new-password/" + response?.id);
        removeLocalStorage("forgetemail");
        setVerify(true); // Reset verify state on successful OTP
      } else {
        setVerify(false); // Keep verify state false if OTP is incorrect
      }
    } catch (error) {
      console.log(error);
      setVerify(false); // Keep verify state false if an error occurs
    } finally {
      setLoader(false);
    }
  };

  const resendOtp = async () => {
    if (canResend) {
      setCanResend(false);
      setTimer(60);
      let formData = { email: getLocalStorage("forgetemail") };

      try {
        const response = await forgetPasswordApi(formData);
        if (response?.isSuccess) {
          toast.success(response?.message);
          navigate("/auth/otp-verify/" + response?.id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
      // toast.success("OTP resent. Please check your email.");
      setVerify(true);
    } else {
      toast.error("Please wait 1 minute before requesting a new OTP");
    }
  };

  return (
    <>
      {loader && <Loader />}

      <div className="max-w-[50%] mx-auto lg:max-w-full">
        <h1>AvatarWalk</h1>
        <div className="pt-10">
          <div className="my-5">
            <h1>OTP Verification</h1>
            <p className="text-grey-800">
              Enter the verification code we just send on your email address.
            </p>
          </div>
          <form>
            <div className="m-auto flex justify-center">
              <InputOTP
                maxLength={4}
                value={value}
                onChange={(value) => setValue(value)}
                className={`input-otp ${!verify ? "border-red-500" : ""}`}
              >
                <InputOTPGroup className="sm:flex-wrap sm:w-full">
                  <InputOTPSlot
                    index={0}
                    className={`input-otp-slot ${
                      !verify ? "border-red-500" : ""
                    }`}
                  />
                  <InputOTPSlot
                    index={1}
                    className={`input-otp-slot ${
                      !verify ? "border-red-500" : ""
                    }`}
                  />
                  <InputOTPSlot
                    index={2}
                    className={`input-otp-slot ${
                      !verify ? "border-red-500" : ""
                    }`}
                  />
                  <InputOTPSlot
                    index={3}
                    className={`input-otp-slot ${
                      !verify ? "border-red-500" : ""
                    }`}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="text-center">
              <p className="text-danger font-bold py-3">
                {verify ? "" : "Wrong code, please try again"}
              </p>
              <p className="text-grey-800">
                I didn’t receive a code.{" "}
                <b className="text-grey-900 cursor-pointer" onClick={resendOtp}>
                  {canResend ? "Resend" : `Resend in ${timer}s`}
                </b>
              </p>
            </div>
            <button
              className="w-full cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-8 rounded-xl"
              onClick={onSubmit}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
