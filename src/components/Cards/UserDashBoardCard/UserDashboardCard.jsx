import SwiperSlider from "@/components/Swiper/UserDashboardCardSwiper/SwiperSlider";
import Images from "@/constant/Images";
import { Link } from "react-router-dom";

function UserDashboardCard() {
  return (
    <Link to="/user/book-experience">
      <div className="max-w-sm rounded overflow-hidden shadow-lg sm:max-w-full h-full">
        <SwiperSlider />
        <div className="px-5 py-4 ">
          <div className="font-bold text-xl mb-2 relative first-letter:capitalize">
            Shikara Hotel, India
            <div className="absolute -top-12 right-0 z-40">
              <img src={Images.user} alt="user" className="w-20 h-20" />
            </div>
          </div>
          <p className="text-grey-800 text-base">Georgia, US</p>
          <div className="flex gap-2 items-center justify-between">
            <p className="text-gray-700 text-base">
              Starts at: $5 (Per Minute)
            </p>
            <img
              src={Images.InstantLiveBtn}
              alt="InstantLiveBtn"
              className="w-30 xl:w-20 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserDashboardCard;
