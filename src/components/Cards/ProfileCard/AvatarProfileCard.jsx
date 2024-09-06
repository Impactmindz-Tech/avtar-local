import Images from "@/constant/Images";

export default function AvatarProfileCard({ avatardetail }) {
  const calculateAverageRating = (reviews) => {
    if (reviews?.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      return (totalRating / reviews.length).toFixed(1);
    }
    return 0;
  };

  const averageRating = calculateAverageRating(avatardetail?.Reviews);

  return (
    <div
      className="w-full gap-4 my-8 flex justify-center border border-slate-100 rounded-lg p-4"
      style={{ boxShadow: "0 0 8px rgba(0,0,0,0.05)" }}
    >
      <div className="flex justify-center items-center gap-4 m-auto">
        <div className="left">
          <div className="profile">
            <img
              src={avatardetail?.Profile?.avatarImage || Images.user}
              alt="avatarProfile"
              className="w-[150px] sm:w-[100px] rounded-full"
            />
          </div>
          <h1 className="text-center text-grey-900">
            {avatardetail?.Profile?.userName}
          </h1>
          <p className="text-center text-grey-800">Avatar</p>
        </div>

        <div className="">
          <div className="pl-6">
            <div className="border-b p-3">
              <h1 className="text-grey-900 text-2xl sm:text-sm">
                {avatardetail?.Reviews?.length}
              </h1>
              <p className="text-xl sm:text-sm">Reviews</p>
            </div>

            <div className="border-b p-3">
              <h1 className="text-grey-900 text-2xl flex gap-2 sm:text-sm">
                {averageRating}{" "}
                <img src={Images.star2} alt="star" className="sm:w-[14px]" />
              </h1>
              <p className="text-xl sm:text-sm">Ratings</p>
            </div>
            {/* <div className="p-3 w-full">
              <h1 className="text-grey-900 text-2xl sm:text-sm">2</h1>
              <p className="text-xl sm:text-sm">As Avatar</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
