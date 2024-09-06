import React, { useEffect, useState } from "react";
import SwiperSlider from "@/components/Swiper/UserDashboardCardSwiper/SwiperSlider";
import { Link, useNavigate } from "react-router-dom";
import Images from "@/constant/Images";
import socket from "@/utills/socket/Socket";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { bookingSlotsApi } from "@/utills/service/userSideService/userService/UserHomeService";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const HomeExperienceList = ({ product }) => {
  const navigate = useNavigate();

  const [meetlink, setmeetlink] = useState("");
  const [loader, setLoader] = useState(false);
  const userId = getLocalStorage("user")?._id;
  const username = getLocalStorage("user")?.userName;

  const golive = async (data) => {
    navigate("/auth/login");
  };

  return (
    <>
      {loader && <Loader />}

      <Link to={"/auth/login"}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg sm:max-w-[90%] sm:m-auto h-full relative">
          {" "}
          <SwiperSlider
            setheight={true}
            item={product.images || Images.cardRoundedEqual}
            thumnail={product?.thumbnail}
          />
          <div className="px-5 py-4">
            <div className="font-bold text-xl mb-2 relative first-letter:capitalize">
              <Link to={"/auth/login"}>{product.ExperienceName}</Link>
              <div className="absolute -top-12 right-0 z-40">
                <img
                  src={product.avatarImage || Images.user2}
                  alt="user"
                  className="w-[60px] h-[60px] sm:w-14 sm:h-14 rounded-full"
                />
              </div>
            </div>
            <p className="text-grey-800 text-base">
              {/* <Link to={`/user/book-experience/${product._id}`}> */}
              {product?.city && product?.city + " ,"} {product.country}
              {/* </Link> */}
            </p>
            <div className="flex gap-2 items-center justify-between">
              <p className="text-gray-700 text-base w-[60%] lg:w-[58%]">
                Starts at: ${product.AmountsperMinute} (Per Minute)
              </p>
              {product?.bookinstaltly && (
                <button
                  onClick={() => golive(product)}
                  className="flex items-center px-4 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-[10px] text-white font-semibold rounded-md shadow-md"
                >
                  <span className="mr-2 text-[10px] animate-pulse">
                    <img src={Images.hotsport} alt="hosport" />
                  </span>
                  Instant Live
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HomeExperienceList;
