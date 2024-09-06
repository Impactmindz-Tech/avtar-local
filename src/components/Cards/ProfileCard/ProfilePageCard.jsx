import Images from "@/constant/Images";
import { Link } from "react-router-dom";

const ProfilePageCard = ({ active, icon, text, link }) => {
  return (
    <Link to={link}>
      {" "}
      <div
        className={`profileShadow flex mb-2 gap-4 rounded-md  justify-between items-center border  p-4 cursor-pointer ${
          active
            ? "text-white bg-backgroundFill-900"
            : "text-backgroundFill-900 "
        }`}
      >
        <div className="">
          <img
            src={icon}
            alt={icon}
            // style={active ? { filter: "invert(1)" } : {}}
          />
        </div>
        <div className="flex-1 font-medium ">{text}</div>
        <div className="dropDOwn">
          {active ? (
            <img src={Images.rightArrowWhite} alt="rightArrowWhite" />
          ) : (
            <img src={Images.rightArrowGray} alt="rightArrowGray" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProfilePageCard;
