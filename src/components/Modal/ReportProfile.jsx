import { useState, useEffect, useRef } from "react";
import { reportAvatarApi } from "@/utills/service/userSideService/userService/UserHomeService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const ReportProfile = ({
  multipleAddressModalState,
  setMultipleAddressModalState,
}) => {
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const [reportData, setReportData] = useState({
    SomethingElse: false,
    Offensive: false,
    Scamming: false,
  });
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

  const handleReasonChange = (event) => {
    const { id } = event.target;
    setReportData((prevState) => ({
      ...prevState,
      Scamming: id === "Scamming",
      Offensive: id === "Offensive",
      SomethingElse: id === "SomethingElse",
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);

      const response = await reportAvatarApi(params?.id, reportData);
      setLoader(false);

      if (response?.isSuccess) {
        toast.success(response?.message);
        setMultipleAddressModalState();
      }
    } catch (error) {
      console.error("API error: ", error);
    }
  };

  if (!multipleAddressModalState) return null;

  return (
    <>
      {loader && <Loader />}
      <div className="fixed flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
        <div
          ref={modalRef}
          className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3 sm:px-3"
        >
          <div className="flex justify-between items-center mb-4 sm:mb-0">
            <button className="focus:outline-none">
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="text-xl font-bold py-4">What’s happening?</span>
            <button className="focus:outline-none">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="p-4 sm:p-2">
            <div className="mb-4">
              <div className="flex items-start justify-between my-4 cardShadow p-3 sm:mt-0">
                <label htmlFor="Scamming" className="sm:w-[80%] sm:text-xs">
                  I think they’re scamming or spamming me
                </label>
                <input
                  type="radio"
                  name="reason"
                  id="Scamming"
                  checked={reportData.Scamming}
                  onChange={handleReasonChange}
                  className="form-radio h-5 w-5 mr-4"
                />
              </div>
              <div className="flex items-start justify-between my-4 cardShadow p-3 sm:mt-0">
                <label htmlFor="Offensive" className="sm:w-[80%] sm:text-xs">
                  They’re being offensive
                </label>
                <input
                  type="radio"
                  name="reason"
                  id="Offensive"
                  checked={reportData.Offensive}
                  onChange={handleReasonChange}
                  className="form-radio h-5 w-5 mr-4"
                />
              </div>
              <div className="flex items-start justify-between my-4 cardShadow p-3 sm:mt-0">
                <label
                  htmlFor="SomethingElse"
                  className="sm:w-[80%] sm:text-xs"
                >
                  Something else
                </label>
                <input
                  type="radio"
                  name="reason"
                  id="SomethingElse"
                  checked={reportData.SomethingElse}
                  onChange={handleReasonChange}
                  className="form-radio h-5 w-5 mr-4"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-4">
            <button
              onClick={handleSubmit}
              className="bg-grey-900 text-white py-4 rounded w-full"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportProfile;
