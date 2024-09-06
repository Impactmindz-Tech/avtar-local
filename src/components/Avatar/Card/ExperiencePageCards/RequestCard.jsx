import Images from "@/constant/Images";

const RequestedCard = () => {
  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex  gap-4 p-4 sm:flex-wrap">
          <div className="sm:w-[100%] relative">
            <img
              src={Images.cardImageRounded}
              alt="cardImageRounded"
              className="w-30 h-[100px] sm:w-full object-cover sm:h-[200px] rounded-lg"
            />
            <div className="absolute bottom-3 right-1 px-2 rounded-full font-bold bg-white">
              $80
            </div>
          </div>
          <div className="w-[80%] sm:w-[100%]">
            <h2 className="text-lg font-bold  sm:text-sm">
              Shikara Hotel, India
            </h2>

            <div className="flex justify-between items-center gap-2 py-1">
              <div className="icon">
                <img src={Images.location} alt="location" className="w-5 h-5" />
              </div>
              <div className="flex-1">Grand Park, New York</div>
            </div>

            <div className="flex justify-between items-center gap-2 ">
              <div className="icon">
                <img
                  src={Images.calendarIcon}
                  alt="calendarIcon"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex-1">Mon, Mar 21, 2024</div>
            </div>
            <div className="flex  items-center gap-2">
              <div className="icon">
                <img
                  src={Images.clock}
                  alt="calendarIcon"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex-1">08:00 PM - 08:30 PM</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between m-auto w-[94%] py-2 text-grey-800 sm:w-full sm:px-2 sm:py-0">
          <button className="border border-primaryColor-900 text-black font-semibold py-2 rounded mr-2 w-[50%]">
            Cancel
          </button>
          <button className="bg-black text-white py-2 rounded  w-[50%]">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestedCard;
