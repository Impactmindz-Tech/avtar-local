import { useState, useEffect } from "react";

const AvailabilityTime = ({ onTimeChange,Hour,Minutes,amPm }) => {
  const [hours, setHours] = useState(Hour);
  const [minutes, setMinutes] = useState(Minutes);
  const [period, setPeriod] = useState(amPm);

  const handleScroll = (event) => {
    if (event.deltaY < 0) {
      // Scroll up
      if (event.target.dataset.type === "hours") {
        setHours((prev) => (prev === 12 ? 1 : prev + 1));
      } else if (event.target.dataset.type === "minutes") {
        setMinutes((prev) => (prev === 59 ? 0 : prev + 1));
      } else if (event.target.dataset.type === "period") {
        setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
      }
    } else {
      // Scroll down
      if (event.target.dataset.type === "hours") {
        setHours((prev) => (prev === 1 ? 12 : prev - 1));
      } else if (event.target.dataset.type === "minutes") {
        setMinutes((prev) => (prev === 0 ? 59 : prev - 1));
      } else if (event.target.dataset.type === "period") {
        setPeriod((prev) => (prev === "AM" ? "PM" : "AM"));
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    onTimeChange({ hours, minutes, period });
  }, [hours, minutes, period]);

  return (

        <div className="time-picker bg-borderFill-300 m-auto w-full rounded-md">
          <div className="time-column text-xl" data-type="hours" onWheel={handleScroll}>
            {hours}
          </div>
          <div className="time-column text-xl" data-type="minutes" onWheel={handleScroll}>
            {minutes < 10 ? `0${minutes}` : minutes}
          </div>
          <div className="time-column text-lg" data-type="period" onWheel={handleScroll}>
            {period}
          </div>
        </div>
    
  );
};

export default AvailabilityTime;
