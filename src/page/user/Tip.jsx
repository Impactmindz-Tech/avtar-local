import BlackBottomButton from "@/components/Button/BlackBottomButton";
import HeaderBack from "@/components/HeaderBack";
import Loader from "@/components/Loader";
import ConfirmPaymentForm from "@/components/Payment Card/Confirm_Page_Payment";
import { sendTipApi } from "@/utills/service/userSideService/userService/UserHomeService";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Tip() {
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const [data, setData] = useState(location?.state);
  let item = data?.item;
  let rateTourRes = data?.res?.message;

  const handlecheckout = async () => {
    const body = {
      avatarId: rateTourRes.userId,
      bookingId: rateTourRes.ExperienceId,
      tip: item.AmmountTip,
      paymentType: selectedMethod,
    };
    try {
      let res = await sendTipApi(body);
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="container">
        <HeaderBack link="/user/rate-tour" text={"Tip"} />
        <div className=" m-auto mt-5">
          <ConfirmPaymentForm setSelectedMethod={setSelectedMethod} selectedMethod={selectedMethod} />
          <div className="m-auto" onClick={() => handlecheckout()}>
            <BlackBottomButton link={"/user/tip"} text={"Pay"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tip;
