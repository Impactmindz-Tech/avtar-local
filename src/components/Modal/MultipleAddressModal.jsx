import { useState, useEffect, useRef } from "react";
import EditDateCalendar from "../Calendar/EditDateCalendar";
import UserSearch from "../UserTopSearch/UserSearch";
import Images from "@/constant/Images";

const MultipleAddressModal = ({
  multipleAddressModalState,
  setMultipleAddressModalState,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setMultipleAddressModalState();
    }
  };

  useEffect(() => {
    if (multipleAddressModalState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [multipleAddressModalState]);

  if (!multipleAddressModalState) return null;

  return (
    <div className="fixed  flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
      <div
        ref={modalRef}
        className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3"
      >
        <div className="flex justify-between items-center mb-4">
          <button className="focus:outline-none">
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="text-xl font-bold">Choose Address</span>
          <button className="focus:outline-none">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="searchBar">
          <UserSearch />
        </div>

        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-start">
              <div className="pt-1">
                <input
                  type="radio"
                  name="location"
                  id="location1"
                  className="form-radio h-5 w-5 mr-4"
                />
              </div>
              <div className="flex justify-between  items-center mb-2 w-full">
                <div className="flex-1">
                  <label htmlFor="location1" className="block font-medium">
                    53 East 128th Street, 6B
                  </label>
                  <p className="text-gray-500">Grand Park, New York</p>
                </div>
                <button className="ml-2">
                  <img src={Images.edit} alt="edit btn" />
                </button>
              </div>
            </div>
            <div className="flex items-start">
              <div className="pt-1">
                <input
                  type="radio"
                  name="location"
                  id="location2"
                  className="form-radio h-5 w-5 mr-4"
                />
              </div>
              <div className="flex justify-between  items-center mb-2 w-full">
                <div className="flex-1">
                  <label htmlFor="location2" className="block font-medium">
                    53 East 128th Street, 6B
                  </label>
                  <p className="text-gray-500">Grand Park, New York</p>
                </div>
                <button className="ml-2">
                  <img src={Images.edit} alt="edit btn" />
                </button>
              </div>
            </div>
            <div className="flex items-start">
              <div className="pt-1">
                <input
                  type="radio"
                  name="location"
                  id="location3"
                  className="form-radio h-5 w-5 mr-4"
                />
              </div>
              <div className="flex justify-between  items-center mb-2 w-full">
                <div className="flex-1">
                  <label htmlFor="location3" className="block font-medium">
                    53 East 128th Street, 6B
                  </label>
                  <p className="text-gray-500">Grand Park, New York</p>
                </div>
                <button className="ml-2">
                  <img src={Images.edit} alt="edit btn" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <img src={Images.gps} alt="gps" />
            <h3 className="font-medium text-gray-700 cursor-pointer">
              Use current location
            </h3>
          </div>
        </div>

        <h3 className="text-center underline underline-offset-2 font-semibold cursor-pointer">
          Add a new address
        </h3>
        <div className="flex mt-4">
          <button
            onClick={setMultipleAddressModalState}
            className="bg-black text-white py-3 rounded w-full"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleAddressModal;
