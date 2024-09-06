import Images from "@/constant/Images";

const RequestedCard = () => {
  return (
    <div className="p-4 sm:p-0 sm:mt-2">
      <div className="BoxShadowLessRounded pb-2">
        <div className="flex items-center gap-4 p-4 sm:flex-wrap">
          <div className="sm:w-[100%] ">
            <img src={Images.cardImageRounded} alt="cardImageRounded" className="w-30 h-[100px] sm:w-full object-cover sm:h-[200px] rounded-lg" />
          </div>
          <div className="w-[80%] sm:w-[100%]">
            <div className="flex justify-between">
              <div className="text-[#F5C20B] bg-[#fef9e7] p-1 px-6 rounded-full text-sm font-medium">Requested</div>
            </div>
            <h2 className="text-lg font-bold pt-3 sm:text-sm">Shikara Hotel, India</h2>
            <div className="description flex gap-2 items-center sm:flex-wrap">
              <p className="text-sm text-black">Mon, Mar 21, 2024 </p>
              <li className="text-grey-800">
                <span className="text-black sm:text-sm">8:00 - 8:30 PM</span>
              </li>
            </div>
          </div>
        </div>
        <div className="borderTopBottom flex justify-between m-auto w-[94%] py-2 text-grey-800">
          <div className="author  ">
            <b>Avatar</b>: Melia Jhon
          </div>
          <div className="font-bold">$85.25</div>
        </div>
      </div>
    </div>
  );
};

export default RequestedCard;
