import Images from "@/constant/Images";
import { useState, useRef, useEffect } from "react";
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"]; // Add more cities as needed

const UserLocationChange = () => {
  const dropdownRef = useRef(null);
  const [city, setCity] = useState("California");
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex items-center gap-1 w-full justify-center rounded-md text-lg font-medium text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-2">
            <img src={Images.location} alt="location icon" />
          </span>
          <p className="font-bold  min-w-[110px] max-w-[110px]">{city}</p>
          <img src={Images.arrowDown} alt="arrowDown icon" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute left-0 z-[99] mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {cities.map((cityName) => (
              <button
                key={cityName}
                onClick={() => {
                  setCity(cityName);
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLocationChange;
