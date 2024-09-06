import Images from "@/constant/Images";
import { Link } from "react-router-dom";

const BrandImageHeader = ({ link }) => {
  return (
    <header className="flex  my-3">
      <div className="">
        <Link to={link}>
          <img src={Images.AvatarWalk} alt="AvatarWalk icon" className="cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};

export default BrandImageHeader;
