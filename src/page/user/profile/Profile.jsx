import ProfilePageCard from "@/components/Cards/ProfileCard/ProfilePageCard";
import ShareYourProfileModal from "@/components/Modal/ShareYourProfileModal";
import UserLogoutModal from "@/components/Modal/UserLogoutModal";
import Images from "@/constant/Images";
import AvtarAvailability from "@/Drawer/AvtarAvailability";
import { getLocalStorage, setLocalStorage } from "@/utills/LocalStorageUtills";
import { becameRoleApi } from "@/utills/service/userSideService/editProfileService/EditProfileService";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import profilePlaceholderImage from "../../../assets/images/avtar.png";
import Loader from "@/components/Loader";

function Profile() {
  let profileSize = getLocalStorage("profileSize");
  const [loader, setLoader] = useState(false);
  const [userLogoutModalState, setUserLogoutModalState] = useState(false);
  const [shareProfileModalState, setShareProfileModalState] = useState(false);
  const userLen = getLocalStorage("user")
    ? getLocalStorage("user").totalprofile
    : 0;
  const user = getLocalStorage("user") ? getLocalStorage("user") : null;
  const [role, setRole] = useState(
    getLocalStorage("user") ? getLocalStorage("user").Activeprofile : null
  );
  const [disableButton, setDisableButton] = useState(
    getLocalStorage("disableButton")
  );
  const [disableButtons, setDisableButtons] = useState(false);
  const [avalibility, setAvaability] = useState(false);
  const location = useLocation();
  const becomeFunc = async (role) => {
    let id = user._id;
    setLoader(true);
    let body = {
      role: role,
    };

    try {
      let res = await becameRoleApi(id, body);
      if (res?.isSuccess) {
        setDisableButtons(true);
        setLocalStorage("disableButton", true);
        // console.log(res);
        // setLocalStorage("user", res?.data);
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      {loader && <Loader />}
      <div className="container">
        {/* topSection */}

        <div className="m-auto ">
          <div className="bg-black w-100 rounded-b-3xl">
            {/* <div className="p-4">
            <img src={Images.AvatarWalkWhite} alt="AvatarWalkWhite" />
          </div> */}
            <div className="flex justify-between items-center gap-2 p-8 sm:p-3">
              <div className="imageProfile sm:max-w-[70px] sm:max-h-[70px] max-w-[80px] max-h-[80px]">
                <img
                  src={
                    user?.profileimage
                      ? user?.profileimage
                      : profilePlaceholderImage
                  }
                  alt="profile"
                  className="rounded-full object-cover border-[2px] border-dashed border-white min-w-[70px] w-[70px] h-[70px]"
                />
                {/* <img src={Images.profile} alt="profile" className="rounded-full   object-cover border-[2px] border-dashed border-white" /> */}
              </div>
              <div className="flex-1 sm:flex-auto px-2 sm:px-2">
                <h3 className="text-white sm:text-sm">{user?.firstName}</h3>
                <p className="text-primaryColor-300 sm:text-sm break-all">
                  {user?.email}
                </p>
                <p className="text-primaryColor-300 sm:text-sm">
                  @{user?.userName}
                </p>
              </div>
              <div className="editBtn">
                <Link
                  to={`${
                    location.pathname == "/avatar/profile"
                      ? "/avatar/edit-profile"
                      : "/user/edit-profile"
                  }`}
                >
                  <img
                    src={Images.editBtnWhite}
                    alt="editBtnWhite"
                    className="cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="my-5">
            {role === "user" ? (
              <>
                <>
                  {profileSize !== 2 && (
                    <div
                      onClick={() => {
                        if (!disableButton || disableButtons)
                          becomeFunc("avatar");
                      }}
                      style={{
                        opacity: disableButton || disableButtons ? 0.5 : 1,
                        pointerEvents:
                          disableButton || disableButtons ? "none" : "auto",
                      }} // Button disable logic
                    >
                      <ProfilePageCard
                        active={true}
                        icon={Images.userIcon}
                        text="Become an Avatar"
                      />
                    </div>
                  )}
                </>

                <ProfilePageCard
                  active={false}
                  icon={Images.info}
                  text="Account Info"
                  link={"/user/account-info"}
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.payment}
                  text="Payment"
                  link={"/user/payment"}
                />
                {/* <ProfilePageCard active={false} icon={Images.currency} text="Currency" /> */}
                {/* <ProfilePageCard active={false} icon={Images.currency} text="Reports" /> */}
                {/* <ProfilePageCard active={false} icon={Images.notification} text="Notifications" link={"/user/notification"} /> */}
                <div onClick={() => setShareProfileModalState(true)}>
                  <ProfilePageCard
                    active={false}
                    icon={Images.share}
                    text="Share Your Profile"
                  />
                </div>
                <ProfilePageCard
                  active={false}
                  icon={Images.message}
                  text="Chat with Support"
                  link={"/user/chat-support"}
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.term}
                  text="Terms and Services"
                  link={"/user/terms"}
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.term}
                  text="Privacy Policy"
                  link={"/user/privacy"}
                />
              </>
            ) : (
              <>
                {profileSize !== 2 && (
                  <div
                    onClick={() => {
                      if (!disableButton || disableButtons) becomeFunc("user");
                    }}
                    style={{
                      opacity: disableButton || disableButtons ? 0.5 : 1,
                      pointerEvents:
                        disableButton || disableButtons ? "none" : "auto",
                    }} // Button disable logic
                  >
                    <ProfilePageCard
                      active={true}
                      icon={Images.multiUser}
                      text="Become a User"
                    />
                  </div>
                )}
                <ProfilePageCard
                  active={false}
                  icon={Images.payment}
                  text="Earnings"
                  link="/avatar/earnings"
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.flag}
                  text="Add Experience"
                  link="/avatar/add-experience"
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.bank}
                  text="Bank Accounts"
                  link={"/avatar/bank"}
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.info}
                  text="Account Info"
                  link="/avatar/account-info"
                />
                {/* <ProfilePageCard active={false} icon={Images.currency} text="Reports" link={"/avatar/reports"} /> */}
                {/* <ProfilePageCard active={false} icon={Images.notification} text="Notifications" link={"/avatar/notification"} /> */}
                {/* <ProfilePageCard active={false} icon={Images.notification} text={<AvtarAvailability />} /> */}
                <div
                  onClick={() => setAvaability(true)}
                  className={`profileShadow flex mb-2 gap-4 rounded-md  justify-between items-center border  p-4 cursor-pointer  "text-backgroundFill-900 `}
                >
                  <div className="">
                    <img src={Images.notification} alt={"icon"} />
                  </div>
                  <div className="flex-1 font-medium ">{"Availability"}</div>
                  <div className="dropDOwn">
                    {" "}
                    <img src={Images.rightArrowGray} alt="rightArrowGray" />
                  </div>
                </div>
                <div onClick={() => setShareProfileModalState(true)}>
                  <ProfilePageCard
                    active={false}
                    icon={Images.share}
                    text="Share Your Profile"
                  />
                </div>
                <ProfilePageCard
                  active={false}
                  icon={Images.term}
                  text="Terms and Services"
                  link="/avatar/terms"
                />
                <ProfilePageCard
                  active={false}
                  icon={Images.term}
                  text="Privacy Policy"
                  link="/avatar/privacy"
                />
              </>
            )}

            <div
              className="profileShadow flex mb-2 gap-4 rounded-md  justify-between items-center border  p-4 cursor-pointer text-[#FF3544] bg-[#ffebed]"
              onClick={() => setUserLogoutModalState(true)}
            >
              <div className="">
                <img src={Images.logout} alt={"logout"} />
              </div>
              <div className="flex-1 font-medium ">Logout</div>
            </div>
          </div>
        </div>

        <UserLogoutModal
          userLogoutModalState={userLogoutModalState}
          setUserLogoutModalState={setUserLogoutModalState}
        />
        <ShareYourProfileModal
          shareProfileModalState={shareProfileModalState}
          setShareProfileModalState={setShareProfileModalState}
        />
        <AvtarAvailability
          setAvaability={setAvaability}
          avalibility={avalibility}
        />
      </div>
    </>
  );
}

export default Profile;
