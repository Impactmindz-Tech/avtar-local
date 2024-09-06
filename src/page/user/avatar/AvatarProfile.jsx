import AvatarProfileCard from "@/components/Cards/ProfileCard/AvatarProfileCard";
import HeaderBack from "@/components/HeaderBack";
import ReportProfile from "@/components/Modal/ReportProfile";
import AvatarReviewCardSwiper from "@/components/Swiper/AvatarProfileTour/AvatarReviewCardSwiper";
import UserAvatarTourCardSwiper from "@/components/Swiper/AvatarProfileTour/UserAvatarTourCardSwiper";
import Images from "@/constant/Images";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAvatardetail } from "@/utills/service/userSideService/userService/UserHomeService";
import Loader from "@/components/Loader";
import TitleHeading from "@/components/Avatar/Heading/TitleHeading";

function AvatarProfile() {
  const [multipleAddressModalState, setMultipleAddressModalState] =
    useState(false);
  const [avatardetail, setavatardetail] = useState([]);
  const [loader, setLoader] = useState(false);

  const params = useParams();

  const fetchprofile = async () => {
    try {
      setLoader(true);
      let avatarprofile = await getAvatardetail(params?.id);
      setLoader(false);
      if (avatarprofile?.isSuccess) {
        console.log(avatarprofile.data);
        setavatardetail(avatarprofile.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchprofile();
  }, []);
  return (
    <>
      {loader && <Loader />}
      <div className="container">
        <HeaderBack text={"Avatar Profile"} link={""} />

        <AvatarProfileCard avatardetail={avatardetail} />
        <div className="tour">
          <div className="flex justify-between items-center">
            <h1 className="text-grey-900 sm:text-sm">
              {avatardetail?.Profile?.userName}
            </h1>
            {/* <h1 className="text-grey-800 underline underline-offset-4 cursor-pointer sm:text-sm">Show All</h1> */}
          </div>
          <div className="my-6">
            <UserAvatarTourCardSwiper avatardetail={avatardetail} />
          </div>

          <TitleHeading title="What users are saying about Jane Copper" />
          <AvatarReviewCardSwiper avatardetail={avatardetail} />

          <div
            className="BoxShadow border-grey-800 cursor-pointer mb-5"
            onClick={() => setMultipleAddressModalState(true)}
          >
            <div className="flex justify-between items-center py-5 px-3 sm:p-3">
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="">
                  <img
                    src={Images.report}
                    alt="report icon"
                    className="sm:max-h-[22px]"
                  />
                </div>
                <div className="text sm:text-sm">Report this Listing</div>
              </div>
              <div className="text-grey-800 p-2 cursor-pointer border border-grey-800 rounded-full">
                <img src={Images.arrowRight} alt="arrowRight" />
              </div>
            </div>
          </div>
        </div>

        <ReportProfile
          multipleAddressModalState={multipleAddressModalState}
          setMultipleAddressModalState={setMultipleAddressModalState}
        />
      </div>
    </>
  );
}

export default AvatarProfile;
