import React from "react";
import { format } from "date-fns";
import { formatTime } from "@/constant/date-time-format/DateTimeFormat";

const UpdateExperienceCard = ({ data }) => {
  console.log(data);

  // Helper function to format date with fallback
  const formatDate = (date) => {
    try {
      return format(new Date(date), "EEE, MMM d, yyyy");
    } catch (error) {
      console.error("Invalid date value:", date);
      return "Invalid Date";
    }
  };

  const formattedDate = formatDate(data?.bookingDate);

  return (
    <div className="sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex items-start gap-4 p-4 sm:flex-wrap">
          <div className="sm:w-[100%]">
            <img
              src={data?.experienceImage}
              alt={data?.experienceImage || "no images"}
              className="w-30 h-[100px] sm:w-full object-cover sm:h-[200px] rounded-lg"
            />
          </div>
          <div className="w-[80%] sm:w-[100%]">
            <h2 className="text-lg font-bold sm:text-sm">
              {data?.experienceName}, {data?.country}
            </h2>
            <div className="description flex gap-2 items-center sm:flex-wrap">
              <p className="text-sm text-black">{formattedDate}</p>
              <li className="text-grey-800">
                <span className="text-black sm:text-sm">
                  {" "}
                  {formatTime(data?.bookingTime)} - {formatTime(data?.endTime)}
                </span>
              </li>
            </div>
            <p className="text-sm text-grey-800">
              {data?.city}, {data?.country}
            </p>
          </div>
        </div>
        <div className="borderTopBottom flex justify-between m-auto w-[98%] lg:w-[90%] py-2 text-grey-800">
          <div className="author">
            <b>Avatar</b>: {data?.avatarName}
          </div>
          <div className="font-bold">${data?.totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExperienceCard;
