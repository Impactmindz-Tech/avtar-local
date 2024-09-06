import HeaderBack from "@/components/HeaderBack";
import { formatTime } from "@/constant/date-time-format/DateTimeFormat";
import Images from "@/constant/Images";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

function PaymentPage({ setPayemntDetails, payemntDetails }) {
  const tourDetails = useSelector((state) => state.avatar.tourDetails);
  console.log(tourDetails);
  const [role, setRole] = useState({
    paypal: true,
    applePay: false,
    mastercard: false,
  });
  const changeSelectedState = (name) => {
    if (name == "paypal") {
      setRole({ mastercard: false, applePay: false, paypal: true });
    } else if (name == "mastercard") {
      setRole({ mastercard: true, applePay: false, paypal: false });
    } else {
      setRole({ mastercard: false, applePay: true, paypal: false });
    }
  };
  return (
    <Drawer anchor="right" open={payemntDetails} onClose={() => setPayemntDetails(false)}>
      <div className="container px-10 py-10 min-lg:w-[40vw] sm:w-[280px] sm:max-w-none sm:px-4">
        <header className="flex items-center mt-2">
          <div className="border cursor-pointer border-[#cccccc] w-[50px] h-[50px] p-2 rounded-full flex items-center justify-center" onClick={() => setPayemntDetails(false)}>
            <img src={Images.arrowLeft} alt="arrowLeft icon" className="cursor-pointer" />
          </div>
          <div className="flex-1 flex justify-center 2xl:text-lg font-bold 4xl:text-xl">{"Payment"}</div>
        </header>

        <div className="mt-5 rounded-lg p-5 bg-[#add8e650]">
          <h1>Experience Name: {tourDetails?.ExpId?.ExperienceName}</h1>
          <h1>Avatar Name: {tourDetails?.ExpId?.avatarName}</h1>
          <h1>Amountsper Minute: {tourDetails?.ExpId?.AmountsperMinute}</h1>
          <h1>end Time: {formatTime(tourDetails?.endTime)}</h1>
          <h1>Booking Time: {formatTime(tourDetails?.BookingTime)}</h1>
        </div>
        <div className="flex flex-col gap-5 pt-5">
          <div className={`cursor-pointer ${role.paypal ? "border border-grey-900" : "border border-[#ccc]"} flex items-center gap-2  p-5 rounded-3xl relative`} onClick={() => changeSelectedState("paypal")}>
            <img className="w-10" src={Images.paypal} alt="paypal" />
            <span className="text-primaryColor-900 font-bold">PayPal</span>

            {role.paypal && (
              <div className="tick bg-[#757575] rounded-full p-1 absolute right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <div className={`cursor-pointer ${role.applePay ? "border border-grey-900" : "border border-[#ccc]"} flex items-center gap-2  p-5 rounded-3xl relative`} onClick={() => changeSelectedState("applePay")}>
            <img className="w-10 h-10" src={Images.applePay} alt="applePay" />
            <span className="text-primaryColor-900 font-bold">Apple Pay</span>
            {role.applePay && (
              <div className="tick bg-[#757575] rounded-full p-1 absolute right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <div className={`cursor-pointer ${role.mastercard ? "border border-grey-900" : "border border-[#ccc]"} flex items-center gap-2  p-5 rounded-3xl relative`} onClick={() => changeSelectedState("mastercard")}>
            <img className="w-10" src={Images.mastercard} alt="mastercard" />
            <span className="text-primaryColor-900 font-bold">**** **** **** 6918</span>

            {role.mastercard && (
              <div className="tick bg-[#757575] rounded-full p-1 absolute right-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <div className="cursor-pointer w-full border border-primaryColor-900 p-4 text-center text-grey-900 mt-8 rounded-xl font-bold">
            <button>Add New Card</button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default PaymentPage;
