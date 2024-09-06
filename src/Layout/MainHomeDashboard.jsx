import Header from "@/components/UserHeader/Header";
import Images from "@/constant/Images";
import { Link } from "react-router-dom";

const MainHomeDashboard = ({ children }) => {
  return (
    <div className="container px-4 sm:px-0 lg:max-w-full">
      <header className="flex justify-between px-4 items-center my-6">
        <div className="brand">
          <Link to="/">
            <img src={Images.AvatarWalk} alt="AvatarWalk" />
          </Link>
        </div>
        <div>
          <Link
            to="/auth/login"
            className="block bg-grey-900 py-3 px-4 text-white font-medium rounded-lg lg:py-2  lg:text-sm"
          >
            <button>Become a avatar</button>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};

export default MainHomeDashboard;
