import Images from "@/constant/Images";
import moment from "moment";
import { formatTime } from "@/constant/date-time-format/DateTimeFormat";

const CancelCard = ({ item, role }) => {
  const bookingDate = moment(item.bookingDate).format("ddd, MMM D, YYYY");

  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex gap-4 p-4 sm:flex-wrap sm:gap-0 sm:p-2">
          <div className="w-[30%] relative">
            <img
              src={item?.experienceImage || Images.cardImageRounded}
              alt="cardImageRounded"
              className="w-full object-cover h-full rounded-lg"
            />
            {role === "avatar" && (
              <div className="absolute bottom-2 right-1 px-2 rounded-full font-bold bg-white sm:text-sm">
                ${item?.totalPrice}
              </div>
            )}
          </div>
          <div className="[70%] sm:pl-3">
            <h2 className="text-lg font-bold sm:text-sm">
              {item?.experienceName || "Experience Name"},{" "}
              {item?.country || "Country"}
            </h2>

            <div className="flex justify-between items-center gap-2 py-1 sm:text-xs sm:py-[2px]">
              <div className="icon">
                <img
                  src={Images.location}
                  alt="location"
                  className="w-5 h-5 sm:w-3 sm:h-3"
                />
              </div>
              <div className="flex-1">
                {item?.city && item?.city + ","} {item?.country || "Country"}
              </div>
            </div>

            <div className="flex justify-between items-center gap-2 py-1 sm:text-xs sm:py-[2px]">
              <div className="icon">
                <img
                  src={Images.calendarIcon}
                  alt="calendarIcon"
                  className="w-5 h-5 sm:w-3 sm:h-3"
                />
              </div>
              <div className="flex-1">{bookingDate}</div>
            </div>
            <div className="flex items-center gap-2 py-1 sm:text-xs sm:py-[2px]">
              <div className="icon">
                <img
                  src={Images.clock}
                  alt="clock"
                  className="w-5 h-5 sm:w-3 sm:h-3"
                />
              </div>
              <div className="flex-1">
                {formatTime(item?.bookingTime)} - {formatTime(item?.endTime)}
              </div>
            </div>
          </div>
        </div>
        {role === "avatar" && (
          <div className="flex justify-between m-auto w-[94%] py-2 text-grey-800 sm:w-full sm:px-2 sm:py-0">
            <button className="border bg-[#ffe5e7] border-[#ffe5e7] text-[#FF3544] font-semibold py-2 rounded w-[100%]">
              {item?.status} by : {item?.cancelledBy}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelCard;
