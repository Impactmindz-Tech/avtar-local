import RateTourRating from "@/components/Rating/RateTourRating";
import { Button } from "@/components/ui/button";
import HeaderWithSkipBtn from "@/components/UserHeader/HeaderWithSkipBtn";
import { rateTourApi } from "@/utills/service/userSideService/userService/UserHomeService";
import { useState } from "react";
import toast from "react-hot-toast";
import {  useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";

function RateTour() {
  const navigate = useNavigate();
  let parms = useParams();
  const [tipMoney, setTipMoney] = useState(0);
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const tipCalculate = (price) => {
    setTipMoney(price);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitReview = async () => {
    try {
      setLoading(true);
      const id = parms.id;
      const body = {
        rating,
        comment,
        AmmountTip: tipMoney,
      };
      const res = await rateTourApi(id, body);
      if (res?.isSuccess) {
        if (tipMoney == 0) {
          navigate(-1);
          toast.success("Rate Given Successfully");
        } else {
          navigate("/user/tip",{ state: { item:body,res:res  } });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <HeaderWithSkipBtn
        link="/user/experience"
        text="Tour Rating"
        skipLink="/user/experience"
      />
      <div className="m-auto relative mb-5">
        <h1 className="text-primaryColor-900">Review the Experience</h1>

        <div className="starRate">
          <RateTourRating onRatingChange={handleRatingChange} />{" "}
          {/* Pass the callback */}
        </div>

        <div className="my-3">
          <textarea
            name="Comment"
            placeholder="Type review here..."
            rows="9"
            className="bg-boxFill-900 w-full outline-0 p-3 resize-none rounded-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <p className="my-2">Tip for the Avatar($)</p>
        <div className="btn mb-10">
          <button
            type="button"
            className={`rateTourBtn ${
              tipMoney === "10" && "rateTourBtnActive"
            }`}
            onClick={() => tipCalculate(10)}
          >
            $10
          </button>

          <button
            type="button"
            className={`rateTourBtn ${
              tipMoney === "15" && "rateTourBtnActive"
            }`}
            onClick={() => tipCalculate(15)}
          >
            $15
          </button>

          <button
            type="button"
            className={`rateTourBtn ${
              tipMoney === "20" && "rateTourBtnActive"
            }`}
            onClick={() => tipCalculate(20)}
          >
            $20
          </button>

          <button
            type="button"
            className={`rateTourBtn ${
              tipMoney === "25" && "rateTourBtnActive"
            }`}
            onClick={() => tipCalculate(25)}
          >
            $25
          </button>

          <input
            type="text"
            className="inputCenter"
            placeholder="Enter amount"
            value={tipMoney}
            onChange={(e) => setTipMoney(e.target.value)}
          />
        </div>

        <Button className="w-full bg-[#2d2d2d]" onClick={submitReview}>
          Add Review
        </Button>
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default RateTour;
