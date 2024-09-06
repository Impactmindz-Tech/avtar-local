import { useState, useEffect } from "react";
import { formatDate, formatTime } from "@/constant/date-time-format/DateTimeFormat";
import Images from "@/constant/Images";
import { getLocalStorage, setLocalStorage } from "@/utills/LocalStorageUtills";
import { Link, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { payoutApi } from "@/utills/service/userSideService/PayConfiermService";
import toast from "react-hot-toast";
import { ChatMessageGetByConversationIdApi } from "@/utills/service/userSideService/ChatService";

const BookedCard = ({ item }) => {
  const users = getLocalStorage("user");
  const navigate = useNavigate();
  const location = useLocation();
  const [disablePay, setDisablePay] = useState(false);
  const [disableStart, setDisableStart] = useState(true);
  const [disableCancel, setDisableCancel] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!item?.bookingTime) return;

    const targetTime = moment(item?.bookingTime, "YYYY-MM-DDTHH:mm:ss"); // Adjust format as needed

    const updateTimer = () => {
      const now = moment();
      const diff = targetTime.diff(now);

      if (diff <= 0) {
        setCountdown("00:00:00");
        setDisableStart(false); // Enable "Start" when countdown reaches zero
        setDisableCancel(true); // Disable "Cancel" when countdown reaches zero
        clearInterval(timerInterval);
      } else {
        const duration = moment.duration(diff);
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setCountdown(`${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`);
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);

    // Initial update
    updateTimer();

    // Clean up interval on component unmount
    return () => clearInterval(timerInterval);
  }, [item?.bookingTime]);

  const cancelBooking = (item) => {
    setLocalStorage("cancelOrder", item);
    navigate(users?.Activeprofile === "user" ? "/user/update-experience" : "/avatar/update-experience");
  };

  const handlePayConfirm = async () => {
    const body = {
      to: item?.avatarId,
      price: item?.totalPrice,
      reqid: item?.reqId,
    };
    try {
      const response = await payoutApi(body);
      if (response?.isSuccess) {
        setDisablePay(true);
        toast(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ChatMessageGetByConversationId = async (item) => {
    let senderId = getLocalStorage("user")?._id || "";
    const conversationId = item?.conversationId || "new";
    let body = {
      senderId: senderId,
      receiverId: item?.avatarId,
    };

    try {
      const response = await ChatMessageGetByConversationIdApi(conversationId, body.senderId, body.receiverId);
      if (response?.isSuccess) {
        navigate(`/user/ChatUser/${item?.avatarId}`, { state: { item: { name: item?.avatarName, id: item?.avatarId } } });
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex items-start gap-4 p-4 sm:flex-wrap">
          <div className="sm:w-[100%]">
            <img src={item?.experienceImage} alt="cardImageRounded" className="w-30 h-[100px] sm:w-full object-cover sm:h-[200px] rounded-lg" />
          </div>
          <div className="w-[80%] sm:w-[100%]">
            <div className="text-[#2AA174] bg-[#fff9e6] p-1 px-6 pb-2 sm:px-4 sm:p-1 rounded-full text-sm font-medium inline-block bg-[#2AA174]/10">{item?.status}</div>
            <h2 className="text-lg font-bold pt-3 sm:text-sm">
              {item?.experienceName}, {item?.country}
            </h2>
            <div className="description flex gap-2 items-center sm:flex-wrap">
              <p className="text-xs text-black">{formatDate(item?.bookingDate)}</p>
              <li className="text-grey-800 leading-none">
                <span className="text-black text-xs">
                  {formatTime(item?.bookingTime)} - {formatTime(item?.endTime)}
                </span>
              </li>
            </div>
          </div>
        </div>
        <div className="borderTopBottom flex justify-between m-auto w-[94%] py-2 text-grey-800">
          <div className="author">
            <b>Avatar</b>: {item?.avatarName}
          </div>
          <div className="font-bold">${item?.totalPrice}</div>
        </div>

        {/* two button */}
        <div className="my-3 w-[94%] m-auto">
          {/* <Link to={`/user/ChatUser/${item?.avatarId}`}> */}
          <button className="border border-primaryColor-900 text-black font-semibold py-2 rounded w-full" onClick={() => ChatMessageGetByConversationId(item)}>
            {location.pathname === "/user/experience" ? "chat with avatar" : "chat with user"}
          </button>
          {/* </Link> */}

          {/* clock timer btn */}
          {users?.Activeprofile === "user" && (
            <button className="bg-backgroundFill-900 text-white flex justify-center items-center py-3 gap-2 rounded w-full mt-3">
              <div className="img">
                <img src={Images.timer} alt="timer" />
              </div>
              <div className="text">{countdown}</div>
            </button>
          )}

          {/* start cancel btn */}
          <div className="flex justify-center items-center py-3 gap-2 rounded w-full">
            <button className={`bg-backgroundFill-900 text-white flex justify-center items-center py-3 gap-2 rounded w-[50%] ${disableCancel ? "bg-gray-400 text-gray-600" : ""}`} onClick={() => cancelBooking(item)} disabled={disableCancel}>
              Cancel
            </button>
            <button className={`bg-backgroundFill-900 text-white flex justify-center items-center py-3 gap-2 rounded w-[50%] ${disableStart ? "bg-gray-400 text-gray-600" : ""}`} disabled={disableStart}>
              Start
            </button>
          </div>

          {/* complete button */}
          {countdown === "00:00:00" && (
            <button disabled={disablePay} className={`flex justify-center items-center py-3 gap-2 rounded w-full ${disablePay ? "bg-gray-400 text-gray-600" : "bg-backgroundFill-900 text-white"}`} onClick={handlePayConfirm}>
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedCard;
