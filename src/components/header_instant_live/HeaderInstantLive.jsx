import iconStop from "../../assets/icons/stop-circle.svg";

const HeaderInstantLive = () => {
  return (
    <header className="flex py-5 px-3 text-white text-sm sm:text-xs gap-3 justify-between items-center font-medium bg-gradient-to-b from-[#787878]/20 to-[#787878]/0">
      <h4 className="max-w-[28%] whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md">
        Richardo Black
      </h4>
      <span className="status bg-gradient-to-r from-[#FF7070] to-[#FF4545] py-2 px-3 sm:py-1 sm:px-2 leading-none rounded-md ml-auto">
        Live
      </span>
      <span className="time-left py-2 px-3 sm:py-1 sm:px-2 leading-none rounded-md bg-[#6d6d6d]/15">
        Time Left: 02:09:27
      </span>
      <img
        src={iconStop}
        alt=""
        className="w-full h-full object-contain max-w-[30px] sm:max-w-[20px]"
      />
    </header>
  );
};

export default HeaderInstantLive;
