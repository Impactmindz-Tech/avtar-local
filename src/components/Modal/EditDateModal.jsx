import { useState, useEffect, useRef } from "react";
import EditDateCalendar from "../Calendar/EditDateCalendar";
import { updateBookingDateApi } from "@/utills/service/userSideService/userService/UserHomeService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { formatDate } from "@/constant/date-time-format/DateTimeFormat";

const DatePickerModal = ({ show, onClose, editdate }) => {
  const [selectedDate, setSelectedDate] = useState(formatDate(editdate || ""));
  const [loader, setLoader] = useState(false);
  const modalRef = useRef();
  const param = useParams();

  useEffect(() => {
    if (editdate) {
      setSelectedDate(formatDate(editdate));
    }
  }, [editdate]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

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

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
  };

  const updateDateApi = async () => {
    const body = {
      newBookingDate: selectedDate,
    };

    setLoader(true);
    try {
      const response = await updateBookingDateApi(param?.id, body);

      if (response?.isSuccess) {
        toast.success("Booking Date Updated Successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error updating date:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="fixed flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
        <div
          ref={modalRef}
          className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3"
        >
          <div className="flex justify-between items-center mb-4">
            <button className="focus:outline-none">
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="text-xl font-bold">Select Date</span>
            <button className="focus:outline-none">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <EditDateCalendar
            date={selectedDate}
            onDateChange={handleDateChange}
          />

          <div className="mt-4">
            <label htmlFor="Date">Selected Date</label>
            <input
              type="text"
              id="Date"
              value={selectedDate}
              readOnly
              className="mt-2 w-full border rounded p-2"
            />
          </div>
          <div className="flex mt-4">
            <button
              onClick={onClose}
              className="border border-primaryColor-900 text-black font-semibold py-2 rounded mr-2 w-[50%]"
            >
              Cancel
            </button>
            <button
              onClick={updateDateApi}
              className="bg-black text-white py-2 rounded w-[50%]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePickerModal;
