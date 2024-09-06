import Images from "@/constant/Images";
import { Link } from "react-router-dom";

export default function UserAvatarTourCard({ tour }) {
  const formattedAvgRating = tour.avgRating ? tour.avgRating.toFixed(2) : "N/A";

  return (
    <Link to={`/user/book-experience/${tour?._id}`}>
      <div className="">
        <div className="images w-full">
          <img
            src={tour.thumbnail || Images.cardImageRounded}
            alt={`${tour.name} image`}
            className="w-full rounded-md  h-[400px] lg:h-[150px]"
          />
        </div>
        <div className="flex items-start justify-between my-2">
          <div className="left">
            <h1 className="sm:text-sm">{tour?.ExperienceName}</h1>
            <p className="text-black-800">{tour?.country}</p>
          </div>

          <div className="flex gap-2 items-center mt-2 sm:mt-0">
            <img src={Images.star2} alt="star" className="sm:w-[14px]" />
            <h1 className="text-sm lg:text-sm">{formattedAvgRating}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
