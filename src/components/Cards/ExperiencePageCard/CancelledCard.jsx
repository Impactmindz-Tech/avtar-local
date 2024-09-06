import {
  formatDate,
  formatTime,
} from "@/constant/date-time-format/DateTimeFormat";

const CancelledCard = ({ item }) => {
  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex items-start gap-4 p-4 sm:flex-wrap">
          <div className="sm:w-[100%] ">
            <img
              src={item?.experienceImage}
              alt="cardImageRounded"
              className="w-30 h-[100px] sm:w-full object-cover sm:h-[200px] rounded-lg"
            />
          </div>
          <div className="w-[80%] sm:w-[100%]">
            <div className="flex justify-between">
              <div className="text-[#ff3544] bg-[#ffebec] p-1 px-6 pb-2 sm:px-4 sm:p-1 rounded-full text-sm font-medium inline-block">
                Cancelled By: {item?.cancelledBy}
              </div>
            </div>
            <h2 className="text-lg font-bold pt-3 sm:text-sm">
              {item?.experienceName}, {item?.country}
            </h2>
            <div className="description flex gap-2 items-center sm:flex-wrap">
              <p className="text-xs text-black">
                {formatDate(item?.bookingDate)}
              </p>
              <li className="text-grey-800">
                <span className="text-black text-xs">
                  {formatTime(item?.bookingTime)} - {formatTime(item?.endTime)}
                </span>
              </li>
            </div>
          </div>
        </div>
        <div className="borderTopBottom flex justify-between m-auto w-[94%] py-2 text-grey-800">
          <div className="author  ">
            <b>Avatar</b>: {item?.avatarName}
          </div>
          <div className="font-bold">${item?.totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default CancelledCard;
