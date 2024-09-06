import {
  formatDate,
  formatTime,
} from "@/constant/date-time-format/DateTimeFormat";
import Images from "@/constant/Images";
import { Link, useLocation } from "react-router-dom";

const CompletedCard = ({ item }) => {
  const location = useLocation();
  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex gap-4 p-4 sm:gap-0 sm:flex-wrap sm:p-2">
          <div className="w-[30%] ">
            <img
              src={item?.experienceImage}
              alt="cardImageRounded"
              className="w-full object-cover h-full rounded-lg"
            />
          </div>
          <div className="w-[70%] sm:pl-3">
            <div className="flex justify-between">
              <div className="text-[#2AA174] bg-[#eaf6f2] p-1 px-6 sm:px-4 sm:p-1 rounded-full text-sm font-medium">
                {item?.status}
              </div>
            </div>
            <h2 className="text-lg font-bold pt-3 sm:text-sm sm:pt-1 line-clamp-2">
              {item?.experienceName}, {item?.country}
            </h2>
            <div className="description flex gap-2 items-center sm:flex-wrap sm:gap-1">
              <p className="sm:text-xs text-black sm:mt-1 leading-none">
                {formatDate(item?.bookingDate)}
              </p>
              <li className="text-grey-800 leading-none">
                <span className="text-black sm:text-xs leading-none">
                  {formatTime(item?.bookingTime)} - {formatTime(item?.endTime)}
                </span>
              </li>
            </div>
          </div>
        </div>
        <div className="borderTopBottom flex justify-between m-auto w-[94%] py-2 text-grey-800 sm:w-full sm:px-2">
          <div className="author  ">
            <b>Avatar</b>: {item?.avatarName}
          </div>
          <div className="font-bold">${item?.totalPrice}</div>
        </div>

        {/* two button */}
        <div className="my-3 w-[94%]  m-auto sm:w-full sm:px-2 sm:mb-0 sm:mt-2">
          {/* clock timer btn */}
          {location.pathname === "/user/experience" && (
            <Link to={`/user/rate-tour/${item?.expId}`}>
              <button className="bg-backgroundFill-900 text-white flex justify-center items-center py-3 gap-2 rounded w-full mt-3 lg:w-[100%]">
                Rate Tour
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedCard;
