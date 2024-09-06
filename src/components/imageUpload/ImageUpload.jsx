// components/ImageUpload.js
import React, { useState, useRef } from "react";
import Images from "@/constant/Images"; // Adjust the path as needed

const ImageUpload = ({ imageURL, onFileChange, onRemoveImage, altText, placeholderText }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-2 right-2 flex gap-2">
        {imageURL && (
          <>
            <div className="bg-white p-4 sm:p-2 rounded-md BoxShadowLessRounded">
              <img src={Images.rotate} alt="edit" className="cursor-pointer w-6 h-6" />
            </div>
            <div className="bg-white p-4 sm:p-2 rounded-md BoxShadowLessRounded">
              <img onClick={onRemoveImage} src={Images.close} alt="remove" className="cursor-pointer w-6 h-6" />
            </div>
          </>
        )}
      </div>

      {!imageURL ? (
        <div onClick={handleImageClick} className="border rounded-lg w-full h-full bg-[#f2f2f2] border-[#e2e2e2] flex justify-center items-center">
          <input className="hidden" onChange={onFileChange} ref={fileInputRef} type="file" />
          <div className="flex justify-center">
            <img src={Images.add} alt="add" className="w-10 h-10 cursor-pointer" />
          </div>
          <h1 className="text-center text-grey-800 py-2 font-semibold hover:text-grey-900">{placeholderText}</h1>
        </div>
      ) : (
        <img src={imageURL} alt={altText} className="w-full h-[300px] object-cover rounded-2xl sm:h-[140px] z-10" />
      )}
    </div>
  );
};

export default ImageUpload;
