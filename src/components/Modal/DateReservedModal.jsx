import { useEffect, useRef, useState } from "react";
import Images from "@/constant/Images";
import { bookingSlotsApi } from "@/utills/service/userSideService/userService/UserHomeService";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../Loader";

const DateReservedModal = ({ bookingDate, show, onClose }) => {
  const params = useParams();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState([]);
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const bookingSlots = async () => {
    const body = { bookingDate: bookingDate };
    setLoader(true);
    try {
      const response = await bookingSlotsApi(params?.id, body);
      if (response?.isSuccess) {
        console.log(response.remainingSlots);

        // Get the current date and time
        const currentDate = new Date().toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
        const currentTime = new Date();

        // Filter the slots
        const filteredSlots = response.remainingSlots.filter((slot) => {
          // Only filter slots if the booking date is today
          if (bookingDate === currentDate) {
            const [toHours, toMinutes] = slot.to.split(":").map(Number);
            const slotEndTime = new Date();
            slotEndTime.setHours(toHours, toMinutes, 0, 0);
            return slotEndTime > currentTime; // Only include slots where the "to" time is in the future
          }
          return true; // Include all slots if the booking date is not today
        });

        setRemainingSlots(filteredSlots);
      }
      console.log(response, "bookingSlotsApi");
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (show) {
      bookingSlots(); // Call API when modal opens
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  return (
    <>
      {loader && <Loader />}
      {location.pathname === `/user/booking/${params?.id}` && (
        <div className="fixed flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
          <div
            ref={modalRef}
            className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3"
          >
            <div className="flex justify-center mt-7">
              <div className="rounded-full p-5 bg-borderFill-900 md:p-4">
                <img
                  src={Images.calendarTick}
                  alt="calendarTick"
                  className="md:w-10 md:h-10"
                />
              </div>
            </div>
            <div className="flex justify-center py-5"></div>

            <div className="my-2">
              <div className="mb-2">
                <h3 className="text-lg font-semibold mb-2">
                  Next availability :
                </h3>
                <div className="flex space-x-2">
                  {remainingSlots?.map((item, index) => (
                    <button
                      key={index}
                      className="p-3 text-black bg-gray-200 rounded-md md:p-2 md:px-2 md:text-sm"
                    >
                      {item?.from} - {item?.to}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex mt-4">
              <button
                onClick={onClose}
                className="bg-black text-white py-3 rounded md:text-sm w-full"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DateReservedModal;
