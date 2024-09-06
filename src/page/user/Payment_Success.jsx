import RecordItModal from "@/components/Modal/RecordItModal";
import OnlyBrandNameHeader from "@/components/UserHeader/OnlyBrandNameHeader";
import Images from "@/constant/Images";
import { useState } from "react";
import { Link } from "react-router-dom";

function Payment_Success() {
  const [InstantLiveModal, setInstantLiveModal] = useState(false);
  return (
    <div className="container">
      <OnlyBrandNameHeader text={"Payment Status"} />
      <div className="max-w-2xl m-auto ">
        <div>
          {/* success */}
          <div className="main h-[80vh] sm:h-[83vh] flex flex-col justify-center">
            <div className="flex justify-center items-center ">
              <img src={Images.paymentSuccess} alt="paymentSuccess" className="w-[150px] " />
            </div>
            <h1 className="text-center text-success pt-5">Payment Successful</h1>
            <p className="text-grey-800 text-center py-3">Your payment has been successfully done!</p>
          </div>
        </div>

        <div className="max-w-2xl m-auto my-6  fixed bottom-0 w-full ">
          <div className="w-[50%] m-auto  lg:w-full text-center">
            <Link to="/user/dashboard">
              {" "}
              <button className="border border-primaryColor-900 text-black font-semibold py-2 lg:w-[90%] rounded w-full">Back to Home</button>
            </Link>
            {/* <button
              className="bg-black text-white py-3 rounded w-full mt-3 lg:w-[90%]"
              onClick={() => setInstantLiveModal(true)}
            >
              Instant Live
            </button> */}
            <Link to="/user/experience">
              <button className="bg-black text-white py-3 rounded w-full mt-3 lg:w-[90%]">View Booking</button>
            </Link>
          </div>{" "}
        </div>
      </div>

      <RecordItModal InstantLiveModal={InstantLiveModal} setInstantLiveModal={setInstantLiveModal} />
    </div>
  );
}

export default Payment_Success;
