import Images from "@/constant/Images";
import moment from "moment";

const CancelledCard = ({ item }) => {
  // Format date and time
  const bookingDate = moment(item.bookingDate).format("ddd, MMM D, YYYY");
  const bookingTime = moment(item.bookingTime).format("hh:mm A");
  const endTime = moment(item.endTime).format("hh:mm A");
  const cancelledBy = item.cancelledBy || "Unknown";

  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex gap-4 p-4 sm:flex-wrap">
          <div className="sm:w-[100%] relative">
            <img
              src={item?.experienceImage || Images.cardImageRounded}
              alt="cardImageRounded"
              className="w-30 h-[100px] sm:w-full object-cover sm:h-[200px] rounded-lg"
            />
            <div className="absolute bottom-3 right-1 px-2 rounded-full font-bold bg-white">
              ${item?.totalPrice}
            </div>
          </div>
          <div className="w-[80%] sm:w-[100%]">
            <h2 className="text-lg font-bold sm:text-sm">
              {item?.experienceName || "Experience Name"}, {item?.country || "Country"}
            </h2>

            <div className="flex justify-between items-center gap-2 py-1">
              <div className="icon">
                <img src={Images.location} alt="location" className="w-5 h-5" />
              </div>
              <div className="flex-1">
                {item?.city || "City"}, {item?.country || "Country"}
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <div className="icon">
                <img src={Images.calendarIcon} alt="calendarIcon" className="w-5 h-5" />
              </div>
              <div className="flex-1">{bookingDate}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="icon">
                <img src={Images.clock} alt="clock" className="w-5 h-5" />
              </div>
              <div className="flex-1">
                {bookingTime} - {endTime}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between m-auto w-[94%] py-2 text-grey-800">
          <button className="border bg-[#ffebed] border-[#ffebed] text-[#ff3644] font-semibold py-2 rounded mr-2 w-[100%]">
            Cancelled by {item?.cancelledBy}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelledCard;
