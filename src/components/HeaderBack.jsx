import Images from "@/constant/Images";
import { useNavigate } from "react-router-dom";

const HeaderBack = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex items-center mt-2">
      <div
        className="border cursor-pointer border-[#cccccc] w-[50px] h-[50px] p-2 rounded-full flex items-center justify-center"
        onClick={goBack}
      >
        <img
          src={Images.arrowLeft}
          alt="arrowLeft icon"
          className="cursor-pointer"
        />
      </div>
      <div className="flex-1 flex justify-center 2xl:text-lg font-bold 4xl:text-xl">
        {text}
      </div>
    </header>
  );
};

export default HeaderBack;
