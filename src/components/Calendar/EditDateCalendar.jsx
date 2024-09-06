import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Images from "@/constant/Images";
import DateReservedModal from "../Modal/DateReservedModal";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const EditDateCalendar = ({ date, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showReservedModal, setShowReservedModal] = useState(false);

  useEffect(() => {
    if (date) {
      setSelectedDate(dayjs(date));
      setCurrentDate(dayjs(date).startOf("month")); // Set the calendar view to the month of the selected date
    }
  }, [date]);

  const startOfMonth = currentDate.startOf("month").day();
  const daysInMonth = currentDate.daysInMonth();

  const days = [];
  for (let i = 0; i < startOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateClick = (day) => {
    const newSelectedDate = currentDate.date(day);
    setSelectedDate(newSelectedDate);
    setShowReservedModal(true);
    const formattedDate = newSelectedDate.format("YYYY-MM-DD");
    onDateChange(formattedDate);
  };

  const isFutureDate = (day) => {
    const selected = currentDate.date(day);
    return selected.isSameOrAfter(dayjs(), "day");
  };

  return (
    <>
      <div className="mx-auto bg-white p-6 border rounded-md sm:p-3">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={previousMonth}
            className="px-3 py-2 border rounded-full"
          >
            <img src={Images.arrowLeftSm} alt="arrowLeftSm" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              {currentDate.format("MMMM")}
            </h2>
            <p className="text-sm">{currentDate.format("YYYY")}</p>
          </div>
          <button onClick={nextMonth} className="p-2 border rounded-full">
            <img src={Images.arrowRight} alt="arrow right" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-medium text-grey-800">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const isSelectable = day && isFutureDate(day);
            return (
              <div
                key={index}
                className={`p-2 rounded-full cursor-pointer ${
                  day
                    ? selectedDate.date() === day &&
                      selectedDate.month() === currentDate.month()
                      ? "bg-black text-white rounded-full"
                      : isSelectable
                      ? "text-black"
                      : "text-gray-400 cursor-not-allowed"
                    : "bg-transparent"
                }`}
                onClick={() => isSelectable && handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <DateReservedModal
        bookingDate={selectedDate.format("YYYY-MM-DD")}
        show={showReservedModal}
        onClose={() => setShowReservedModal(false)}
      />
    </>
  );
};

export default EditDateCalendar;
