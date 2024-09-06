import React from "react";
import Image from "../constant/Images";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-[#fafafa] p-8 sm:p-4">
      <div className="w-full min-h-full bg-white rounded-3xl p-8 sm:p-4 flex gap-x-6">
        <div className="flex-1 flex items-center justify-center border border-blue-900 rounded-3xl lg:hidden">
          <img src={Image.auth_img} alt="" />
        </div>
        <div className="flex-1 self-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
