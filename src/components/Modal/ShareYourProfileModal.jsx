import { useState, useEffect, useRef } from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import Images from "@/constant/Images";
import toast from "react-hot-toast";

const ShareYourProfileModal = ({
  shareProfileModalState,
  setShareProfileModalState,
}) => {
  const [shareUrl, setShareUrl] = useState("");
  const user = getLocalStorage("user");
  const modalRef = useRef();

  useEffect(() => {
    if (user) {
      const currentUrl = `${window.location.origin}/user/avatar-profile/${user._id}`;
      setShareUrl(currentUrl);
    }
  }, [user]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShareProfileModalState();
    }
  };

  useEffect(() => {
    if (shareProfileModalState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareProfileModalState]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => toast.error("Failed to copy text: ", err));
  };

  if (!shareProfileModalState) return null;

  return (
    <div className="fixed flex items-end justify-center inset-0 bg-black bg-opacity-50 z-[99]">
      <div
        ref={modalRef}
        className="bg-white rounded-t-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-full p-3 sm:px-3"
      >
        <div className="flex justify-between items-center mb-4">
          <button className="focus:outline-none">
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="text-xl font-bold">Share Your Profile</span>
          <button className="focus:outline-none">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="p-4 flex gap-4 justify-center m-auto w-[80%]">
          <FacebookShareButton url={shareUrl}>
            <div className="bg-[#1877F2] rounded-full p-4 cursor-pointer">
              <img
                src={Images.facebook}
                alt="facebook"
                className="bg-white rounded-full sm:min-w-[25px]"
              />
            </div>
          </FacebookShareButton>

          <div
            className="insta rounded-full p-4 cursor-pointer"
            onClick={copyToClipboard}
          >
            <img src={Images.insta} alt="insta" className="sm:min-w-[25px]" />
          </div>

          <WhatsappShareButton
            url={shareUrl}
            title={`Avatar Walk Profile Link of ${user?.firstName} ${user?.lastName}`}
            separator=":: "
          >
            <div className="bg-[#48c857] rounded-full p-4 cursor-pointer">
              <img
                src={Images.whatsapp}
                alt="whatsapp"
                className="sm:min-w-[25px]"
              />
            </div>
          </WhatsappShareButton>

          <div
            className="bg-[#000000] rounded-full p-4 cursor-pointer"
            onClick={copyToClipboard}
          >
            <img src={Images.tiktok} alt="tiktok" className="sm:min-w-[25px]" />
          </div>
        </div>

        <div className="flex justify-between mt-4 bg-slate-100 p-4 rounded-md mb-5 sm:m-0">
          <div
            className="text font-bold cursor-pointer"
            onClick={copyToClipboard}
          >
            Share via link
          </div>
          <div className="flex gap-3">
            <div
              className="text-grey-800 cursor-pointer"
              onClick={copyToClipboard}
            >
              Copy link
            </div>
            <img
              src={Images.copy}
              alt="copy"
              className="cursor-pointer"
              onClick={copyToClipboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareYourProfileModal;
