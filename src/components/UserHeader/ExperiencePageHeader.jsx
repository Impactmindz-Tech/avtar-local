import Images from "@/constant/Images";
import { Link } from "react-router-dom";

const ExperiencePageHeader = () => {
  return (
    <header className="flex justify-between items-center my-3 ">
      <div className="">
        <Link to="">
          <img src={Images.AvatarWalk} alt="AvatarWalk icon" className="sm:w-20  cursor-pointer" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-2 font-bold text-sm">
        <div className="icon">
          <img src={Images.record} alt="record" />
        </div>
       <Link to="/user/recorded">

        <div className="underline underline-offset-4 decoration-grey-800">Recorded Experience</div>
       </Link>
      </div>
    </header>
  );
};

export default ExperiencePageHeader;
