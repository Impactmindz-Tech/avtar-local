import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Images from "@/constant/Images";
import { Rating, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AvatarReviewCardSwiper = ({ avatardetail }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <Swiper
      slidesPerView={1.5}
      spaceBetween={10}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      modules={[FreeMode]}
      className="reviewCardSwiper"
    >
      {avatardetail.Reviews?.map((reviews) => (
        <SwiperSlide key={reviews?._id}>
          <div className="cardBorder my-5">
            <div className="flex justify-between items-center py-5 border-b-2 border-borderFill-600 px-2 lg:py-2 lg:flex-wrap">
              <div className="star">
                <Stack spacing={1}>
                  <Rating
                    value={reviews?.rating}
                    name="read-only"
                    readOnly
                    precision={0.5}
                  />
                </Stack>
              </div>
              <div className="text-grey-800 sm:text-xs">
                {formatDate(reviews?.createdAt)}
              </div>
            </div>
            <div className="p-2">
              <p className="text-grey-800 sm:text-sm">{reviews?.comment}</p>

              {/* <div className="font-bold underline my-2 cursor-pointer">Show More</div> */}
              <div className="flex gap-2 pt-5 items-center justify-between">
                <div className="flex gap-2 items-center">
                  {/* <Link to={(reviews?.userId?._id)?`/user/avatar-profile/${reviews?.userId?._id}`:""}>  */}
                  <div className="userImg">
                    <img
                      className="w-[45px] h-[45px] sm:w-[30px] sm:h-[30px] rounded-full"
                      src={reviews?.userImage || Images.avatarProfile}
                      alt={reviews?.userName}
                    />
                  </div>
                  {/* </Link>   */}
                  <div className="flex flex-col">
                    <h3 className="font-medium text-grey-800">
                      {/* <Link to={(reviews?.userId?._id)?`/user/avatar-profile/${reviews?.userId?._id}`:""}> */}
                      {reviews?.userId?.userName}
                      {/* </Link> */}
                    </h3>
                  </div>{" "}
                </div>

                <div className="font-medium text-sm">
                  <Link to={"/user/book-experience/" + reviews?.ExperienceId}>
                    View Experience
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AvatarReviewCardSwiper;
