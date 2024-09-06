import Images from "@/constant/Images";
import React from "react";

export default function RecordedCard() {
  return (
    <div className="flex gap-3 lg:flex-wrap BoxShadowLessRounded p-2">
      <div className="relative lg:w-[100%]">
        <div className="absolute  bottom-1 right-1 rounded-full font-bold px-4 text-sm py-2 bg-white sm:text-sm">30 Min</div>
        <img src={Images.cardImageRounded} alt="cardImageRounded" className="w-[200px] h-[100%] lg:h-[250px] lg:w-full object-cover  rounded-md" />
      </div>
      <div className="right">
        <h1>Shikara Hotel, India</h1>
        <p>Mon, Mar 21, 2024</p>
        <p>Georgia, US</p>

        <div className="bg-grey-900 text-center text-white py-2 rounded-lg w-[50%] my-2 cursor-pointer font-semibold">Share</div>
      </div>
    </div>
  );
}
