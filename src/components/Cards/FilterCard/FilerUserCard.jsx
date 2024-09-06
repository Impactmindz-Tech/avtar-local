import Images from "@/constant/Images";
import { Link } from "react-router-dom";
const FilterUserCard = ({ product }) => {
  return (
    <Link
      to={{
        pathname: `/user/book-experience/${product._id}`,
        state: { from: "user/dashboard" },
      }}
    >
      <div className="border shadow-lg flex  rounded-md h-full">
        <div className="imageBox w-[30%]">
          <div className="h-full">
            <img
              src={product.thumbnail}
              alt="cardImageCurve"
              className="object-cover h-full rounded-s-md w-full"
            />
          </div>
        </div>
        <div className="px-3 flex-1 flex flex-col w-[70%]">
          <h1 className="mt-3 font-large sm:mt-1 sm:text-sm lg:text-sm lg:mt-5 line-clamp-2">
            {product?.ExperienceName || ""}, {product?.country || ""}
          </h1>
          <p className="text-borderFill-700 sm:text-sm mb-auto">
            {product?.city && product?.city + ","} {product?.country}
          </p>
          <div className="bottom-0 flex  justify-between items-center mt-5 mb-2 sm:mt-3">
            <div className="flex items-center px-3 pl-1 py-1 justify-center gap-2 bg-borderFill-900 rounded-full sm:py-0 sm:px-2">
              <div className="border-r-2 px-1">
                <img src={Images.star} alt="star" />
              </div>
              <div className="font-extrabold sm:font-medium">4.5</div>
            </div>
            <div className="border bg-grey-300 border-borderFill-300 rounded-lg p-1 cursor-pointer">
              <img src={Images.add} alt="add" className="sm:max-w-3.5 " />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilterUserCard;
