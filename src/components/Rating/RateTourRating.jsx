import ReactStars from "react-rating-stars-component";

function RateTourRating({ onRatingChange }) {
  const ratingChanged = (newRating) => {
    onRatingChange(newRating); // Pass the rating back to the parent component
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={36}
        isHalf={true}
        color="#E2E2E2"
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  );
}

export default RateTourRating;
