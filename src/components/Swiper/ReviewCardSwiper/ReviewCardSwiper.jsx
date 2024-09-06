import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Images from "@/constant/Images";
import { Rating, Stack } from "@mui/material";

const ReviewCardSwiper = ({ item }) => {
  // Limit the number of reviews to display
  const limitedReviews = item?.slice(0, 6);

  return (
    <Swiper
      slidesPerView={1.4}
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
      {limitedReviews?.map((review, index) => (
        <SwiperSlide key={index}>
          <div className="cardBorder my-5">
            <div className="flex justify-between items-center py-5 border-b border-borderFill-600 px-2 lg:py-2 lg:flex-wrap">
              <div className="star">
                <Stack spacing={1}>
                  <Rating
                    value={review?.rating}
                    name="read-only"
                    readOnly
                    precision={0.5}
                  />
                </Stack>
              </div>
              <div className="text-grey-800 sm:text-xs leading-none">
                {new Date(review?.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="p-3">
              <p className="text-grey-800 sm:text-sm">{review?.comment}</p>
              {/* <div className="font-bold underline my-2 cursor-pointer">Show More</div> */}
              <div className="flex gap-2 pt-5 items-center">
                <div className="userImg">
                  <img
                    className="w-[45px] h-[45px] sm:w-[30px] sm:h-[30px] rounded-full"
                    src={review?.userImage || Images.profileUser}
                    alt="user"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium text-grey-800">
                    {review?.userName}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewCardSwiper;
