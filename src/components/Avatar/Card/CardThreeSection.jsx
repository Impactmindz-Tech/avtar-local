import Images from "@/constant/Images";
import { Link } from "react-router-dom";

export default function CardThreeSection({ icon, link, title, desc, circle }) {
  return (
    <Link to={link}>
      <div className="border flex items-center justify-between p-4 sm:p-2 gap-4 sm:gap-2 rounded-2xl my-5 cursor-pointer">
        <div
          className={`icon bg-grey-300 rounded-full aspect-square inline-flex items-center justify-center ${
            circle ? "px-5 py-7 sm:px-2 sm:py-2" : "p-3"
          }`}
        >
          <img src={icon} alt={icon} />
        </div>
        <div className="info flex-1">
          <h1 className="text-grey-900 sm:text-sm">{title}</h1>
          <p className="text-grey-800 sm:text-xs">{desc}</p>
        </div>
        <div className="arrow">
          <img src={Images.rightArrowGray} alt="rightArrowGray" />
        </div>
      </div>{" "}
    </Link>
  );
}
//
