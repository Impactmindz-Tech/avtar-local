import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateExperienceCard from "@/components/Cards/UpdateExperienceCard.jsx/UpdateExperienceCard";
import HeaderBack from "@/components/HeaderBack";
import { getLocalStorage, removeLocalStorage } from "@/utills/LocalStorageUtills";
import { handleBookingRequestApi } from "@/utills/service/avtarService/AddExperienceService";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

function Update_Experience() {
  const navigate = useNavigate();
  const data = getLocalStorage("cancelOrder");
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.removeItem("cancelOrder");
    };

    handleRouteChange();
  }, [location]);

  const handleCancel = async () => {
    const body = {
      action: "reject",
      reason: message,
    };

    try {
      setLoader(true)
      const response = await handleBookingRequestApi(data?.reqId, body);
      if (response?.isSuccess) {
        toast.success(response?.message);
        removeLocalStorage("cancelOrder");
        navigate("/user/experience");
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoader(false)
      

    }
  };
  return (
    <>
    {loader&&<Loader />}
    <div className="container">
      <HeaderBack link="/user/experience" text={"Update Experience"} />

      <div className="my-3">
        <UpdateExperienceCard data={data} />
        <div className="m-auto my-2">
          <h1 className="my-2">Want to cancel:</h1>
          <textarea name="reason" placeholder="Type reason" rows={"9"} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-boxFill-900 w-full outline-0 p-3 resize-none rounded-md"></textarea>
        </div>

        <div className="mt-5 m-auto">
          <button className="bg-backgroundFill-900 text-white flex justify-center items-center py-3 gap-2 rounded w-full mt-3 lg:w-[100%]" onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Update_Experience;
