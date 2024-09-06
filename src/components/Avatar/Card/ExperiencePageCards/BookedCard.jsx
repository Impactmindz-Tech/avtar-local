import Images from "@/constant/Images";
import moment from "moment";
import { formatTime } from "@/constant/date-time-format/DateTimeFormat";
import { createmeeting } from "@/utills/service/avtarService/AddExperienceService";
import socket from "@/utills/socket/Socket";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookedCard = ({ item, role }) => {
  const [duration, setDuration] = useState(30);
  const [countdown, setCountdown] = useState("");
  const [startTime, setStartTime] = useState("");
  const [disableStart, setDisableStart] = useState(true);
  const [disableCancel, setDisableCancel] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate()

  const handleGoLive = async () => {
    const reqdata = {
      userId: item?.userId,
      startTime: item?.bookingTime,
      ReqId: item?.reqId,
      endTime: item?.endTime,
      duration: duration,
    };
    const response = await createmeeting(reqdata);
    if (response?.isSuccess) {
      const newRoomId = Math.random().toString(36).substr(2, 9);
      socket.emit("create-room", { BookingDetails: reqdata, roomId: newRoomId, streamerId: socket.id, item });
      navigate(`/room/${newRoomId}`);
    }
  };

  useEffect(() => {
    if (!item?.bookingTime) return;

    const targetTime = moment(item?.bookingTime, "YYYY-MM-DDTHH:mm:ss"); // Adjust format as needed
    const endTime = moment(item?.endTime, "YYYY-MM-DDTHH:mm:ss"); // Adjust format as needed

    const updateTimer = () => {
      const now = moment();
      const diff = targetTime.diff(now);
      const diffi = endTime.diff(now);
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

  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex gap-4 p-4 sm:flex-wrap sm:gap-0 sm:p-2">
          <div className="w-[30%] relative">
            <img src={item?.experienceImage || Images.cardImageRounded} alt="cardImageRounded" className="w-full object-cover h-full rounded-lg" />
            {role === "avatar" && <div className="absolute bottom-2 right-1 px-2 rounded-full font-bold bg-white sm:text-sm">${item?.totalPrice}</div>}
          </div>
          <div className="w-[70%] sm:pl-3">
            <h2 className="text-lg font-bold sm:text-sm">
              {item?.experienceName}, {item?.country}
            </h2>

            <div className="flex justify-between items-center gap-2 py-1 sm:py-[2px] sm:text-xs">
              <div className="icon">
                <img src={Images.location} alt="location" className="w-5 h-5 sm:w-3 sm:h-3" />
              </div>
              <div className="flex-1">
                {item?.city && item?.city + ","} {item?.country}
              </div>
            </div>

            <div className="flex justify-between items-center gap-2 py-1 sm:py-[2px] sm:text-xs">
              <div className="icon">
                <img src={Images.calendarIcon} alt="calendarIcon" className="w-5 h-5 sm:w-3 sm:h-3" />
              </div>
              <div className="flex-1">{item?.bookingDate}</div>
            </div>
            <div className="flex items-center gap-2 py-1 sm:py-[2px] sm:text-xs">
              <div className="icon">
                <img src={Images.clock} alt="clock" className="w-5 h-5 sm:w-3 sm:h-3" />
              </div>
              <div className="flex-1">
                {formatTime(item?.bookingTime)} - {formatTime(item?.endTime)}
              </div>
            </div>
          </div>
        </div>
        {role === "avatar" && (
          <>
            <div className="flex justify-between m-auto w-[94%] py-2 text-grey-800 sm:w-full sm:px-2 sm:py-0">
              <button className="border bg-[#eaf6f2] border-[#eaf6f2] text-[#37a77d] font-semibold py-2 rounded w-[100%]">Booked</button>
            </div>
            {countdown == "00:00:00" ? (
              <>
                {currentTime > formatTime(item?.endTime) ? (
                  <>
                    <div className="flex gap-2 w-[94%] m-auto">
                      <div onClick={handleGoLive} className="flex justify-between py-2 w-full text-grey-800 sm:w-full sm:px-2 sm:py-0">
                        <button className="border bg-[#eaf6f2] border-[#eaf6f2] text-[#37a77d] font-semibold py-2 rounded w-[100%]">Start</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex w-[94%] m-auto justify-between py-2  text-grey-800 sm:w-full sm:px-2 sm:py-0">
                    <button disabled className="border bg-[#ff000041] border-[#eaf6f2] text-[#000] font-semibold py-2 rounded w-[100%]">
                      Expire
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button className="bg-backgroundFill-900 w-[94%] m-auto text-white flex justify-center items-center py-3 gap-2 rounded mt-3">
                  <div className="img">
                    <img src={Images.timer} alt="timer" />
                  </div>
                  <div className="text">{countdown}</div>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookedCard;
