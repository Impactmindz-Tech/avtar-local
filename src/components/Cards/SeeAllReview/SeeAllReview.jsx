import Images from "@/constant/Images";

const SeeAllReview = ({ overallRating, cleanlinessRating, accuracyRating }) => {
  // Calculate percentage for each rating
  const ratingCounts = {
    5: (overallRating[5] || 0),
    4: (overallRating[4] || 0),
    3: (overallRating[3] || 0),
    2: (overallRating[2] || 0),
    1: (overallRating[1] || 0),
  };

  const totalReviews = Object.values(ratingCounts).reduce((acc, count) => acc + count, 0);

  const calculateWidth = (rating) => (totalReviews > 0 ? (ratingCounts[rating] / totalReviews) * 100 : 0);

  return (
    <div className="mx-auto bg-white BoxShadow lg:p-3 gap-1 rounded-lg p-6 flex lg:gap-y-5 flex-wrap">
      <div className="min-w-[45%] lg:min-w-[100%] lg:border-none border-r border-gray-200 pr-7">
        <h2 className="text-lg font-medium mb-2 pl-3 lg:text-sm text-grey-800">Overall Rating</h2>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div className="flex items-center" key={rating}>
              <span className="w-6 text-right mr-2 text-grey-800">{rating}</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${calculateWidth(rating)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cleanliness */}
      <div className="flex lg:w-full 4xl:justify-center flex-1 items-center">
        <div className="lg:w-[50%] w-[50%] flex lg:items-center items-center border-r lg:px-4 border-gray-200 px-8 flex-col">
          <div className="w-16 h-16 lg:w-10 lg:h-10 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
            <img src={Images.Cleanliness} alt="Cleanliness" />
          </div>
          <h2 className="text-lg font-medium text-grey-800 lg:text-sm">Cleanliness</h2>
          <p className="text-xl font-semibold text-grey-700 lg:text-sm">{cleanlinessRating}</p>
        </div>
        {/* Accuracy */}
        <div className="lg:w-[50%] w-[50%] flex lg:items-center items-center lg:px-4 border-gray-200 px-8 flex-col">
          <div className="w-16 h-16 lg:w-10 lg:h-10 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
            <img src={Images.correct} alt="correct icon" />
          </div>
          <h2 className="text-lg font-medium text-grey-800 lg:text-sm">Accuracy</h2>
          <p className="text-xl font-semibold text-grey-700 lg:text-sm">{accuracyRating}</p>
        </div>
      </div>
    </div>
  );
};

export default SeeAllReview;
