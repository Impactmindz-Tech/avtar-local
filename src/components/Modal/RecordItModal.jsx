import { useEffect, useRef } from "react";

import Images from "@/constant/Images";

const RecordItModal = ({ InstantLiveModal, setInstantLiveModal }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setInstantLiveModal();
    }
  };

  useEffect(() => {
    if (InstantLiveModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [InstantLiveModal]);

  if (!InstantLiveModal) return null;

  return (
    <div className="fixed  flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
      <div
        ref={modalRef}
        className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3"
      >
        {/*  */}
        <div className="flex justify-center mt-7">
          <div className="rounded-full p-6 bg-[#F2F2F2] md:p-4">
            <img
              src={Images.video}
              alt="video"
              className="md:w-10 md:h-10 w-[60px] h-[60px]"
            />
          </div>
        </div>
        <div className="flex justify-center py-5">
          <p className="text-grey-800">Your experience will be recorded.</p>
        </div>

        <div className="flex mt-4 gap-2">
          <button
            onClick={setInstantLiveModal}
            className="border border-grey-900 text-grey-900 py-3 font-bold rounded md:text-sm w-[49%]"
          >
            Don’t Record
          </button>
          <button
            onClick={setInstantLiveModal}
            className="bg-grey-900 text-white py-3 font-bold rounded md:text-sm w-[49%]"
          >
            Record It
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordItModal;
