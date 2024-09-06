import RecordItModal from "@/components/Modal/RecordItModal";
import OnlyBrandNameHeader from "@/components/UserHeader/OnlyBrandNameHeader";
import Images from "@/constant/Images";
import { useState } from "react";
import { Link } from "react-router-dom";

function Payment_Failed() {
  // const [InstantLiveModal, setInstantLiveModal] = useState(false);
  // const [paymentSuccess, setPaymentStatus] = useState(false);
  return (
    <div className="container">
      <OnlyBrandNameHeader text={"Payment Status"} />
      <div className="max-w-2xl m-auto ">
        <div>
          {/* failed */}
          <div className="main">
            <div className="flex justify-center items-center pt-[20vh]">
              <img
                src={Images.paymentFailed}
                alt="paymentFailed"
                className="w-[150px] "
              />
            </div>
            <h1 className="text-center text-danger pt-5">Oops, Failed</h1>
            <p className="text-grey-800 text-center py-3">
              Your payment has been failed.
            </p>
          </div>
        </div>

        <div className="max-w-2xl m-auto my-6  fixed bottom-0 w-full ">
          <div className="w-[50%] m-auto  lg:w-full text-center">
            <Link to="/user/dashboard">
              {" "}
              <button className="border border-primaryColor-900 text-black font-semibold py-2 lg:w-[90%] rounded w-full">
                Back to Home
              </button>
            </Link>
            <button className="bg-black text-white py-3 rounded w-full mt-3 lg:w-[90%]">
              Try Again
            </button>
          </div>{" "}
        </div>
      </div>

      {/* <RecordItModal
        InstantLiveModal={InstantLiveModal}
        setInstantLiveModal={setInstantLiveModal}
      /> */}
    </div>
  );
}

export default Payment_Failed;
