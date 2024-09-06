import EditDateCalendar from "@/components/Calendar/EditDateCalendar";
import HeaderBack from "@/components/HeaderBack";
import toast from "react-hot-toast";
import { bookingExperinceApi } from "@/utills/service/userSideService/userService/UserHomeService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import dayjs from "dayjs";
import { DateTime } from "luxon";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { getDateTimeForTimezone } from "@/constant/date-time-format/DateTimeFormat";

function Booking() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [type, setType] = useState(null);
  const [color, setColor] = useState(false);

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    } else if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    } else {
      throw new Error("Invalid date format");
    }
  };

  const isTimeSelectable = (time) => {
    if (dayjs(date).isSame(dayjs(), "day")) {
      const selectedTime = dayjs(`${formatDate(date)}T${time}`);
      return selectedTime.isAfter(dayjs());
    }
    return true;
  };

  const onSubmit = async () => {
    setLoading(true);
    let body = {
      bookingDate: formatDate(date),
      bookingTime: selectedTime,
      Duration: duration,
      tourType: type,
    };
    try {
      const response = await bookingExperinceApi(params?.id, body);
      if (response?.isSuccess) {
        toast.success("Booking Created Successfully");
        navigate("/user/confirm-and-pay/" + response?.data?._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = date && selectedTime && duration && type;
  // const currentTime = new Date().toLocaleTimeString();

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  //   import moment from 'moment-timezone';

  // // Function to get the current local time
  // function getCurrentLocalTime() {
  //   // Get the user's time zone from the browser
  //   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //   // Get the current time in the user's time zone
  //   const localTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

  //   return localTime;
  // }

  // // Usage
  // const currentLocalTime = getCurrentLocalTime();
  // console.log(`Please select the experience time as the avatar time. The current avatar time is ${currentLocalTime}.`);

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container">
        <HeaderBack link="/user/book-experience" text={"Set Date"} />

        <div className="my-4">
          <EditDateCalendar date={date} onDateChange={setDate} />

          <div className="bg-slate-50 p-4 rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-2">
              Please select the experience time as the avatar time:
            </h2>
            <p>
              The current avatar time is:
              <span className="ml-2 font-semibold">
                {getDateTimeForTimezone(getLocalStorage("avatarTime"))}
              </span>
            </p>
            <p>
              Your current time is:
              <span className="ml-2 font-semibold">{currentTime}</span>
            </p>
          </div>

          <div className="bg-white rounded-lg my-5">
            <h2 className="text-xl font-semibold mb-4">
              Eastern Standard Time
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selected Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formatDate(date)}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selected Time
                </label>
                <div className="relative flex items-center">
                  <input
                    type="time"
                    onChange={(e) => {
                      const timeValue = e.target.value;
                      if (isTimeSelectable(timeValue)) {
                        setSelectedTime(timeValue);
                      } else {
                        setColor(true);
                        toast.error("You cannot select a past time.");
                      }
                    }}
                    className={`w-full p-2 border border-gray-300 rounded-md ${
                      selectedTime && !isTimeSelectable(selectedTime)
                        ? `past-time-class ${color ? "bg-[red]" : ""} `
                        : "future-time-class"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Duration</h3>
            <div className="flex space-x-2">
              <button
                className={`p-3 ${
                  duration === 15 ? "bg-black text-white" : "bg-gray-200"
                } rounded-md`}
                onClick={() => setDuration(15)}
              >
                15 min
              </button>
              <button
                className={`p-3 ${
                  duration === 30 ? "bg-black text-white" : "bg-gray-200"
                } rounded-md`}
                onClick={() => setDuration(30)}
              >
                30 min
              </button>
              <button
                className={`p-3 ${
                  duration === 45 ? "bg-black text-white" : "bg-gray-200"
                } rounded-md`}
                onClick={() => setDuration(45)}
              >
                45 min
              </button>
              <button
                className={`p-3 ${
                  duration === 60 ? "bg-black text-white" : "bg-gray-200"
                } rounded-md`}
                onClick={() => setDuration(60)}
              >
                60 min
              </button>
            </div>
          </div>
          <div className="my-2">
            <h3 className="text-lg font-semibold mb-2">Tour Type</h3>
            <div className="flex space-x-2">
              <button
                className={`p-3 ${
                  type === "Public" ? "bg-black text-white" : "bg-gray-200"
                } rounded-md`}
                onClick={() => setType("Public")}
              >
                Public
              </button>
              <button
                className={`p-3 ${
                  type === "Private" ? "bg-black text-white" : "bg-gray-200"
                } rounded-md`}
                onClick={() => setType("Private")}
              >
                Private
              </button>
            </div>
          </div>

          <div
            onClick={isFormComplete ? onSubmit : null}
            className={`w-full my-6 rounded-md bottom-1 m-auto left-0 right-0 p-2 cursor-pointer bg-backgroundFill-900 text-white text-center ${
              !isFormComplete ? "opacity-[0.5]" : "opacity-1"
            }`}
          >
            <button
              disabled={!isFormComplete}
              className="py-1 font-bold cursor-pointer"
            >
              {"Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
