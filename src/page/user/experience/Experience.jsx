import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExperiencePageHeader from "@/components/UserHeader/ExperiencePageHeader";
import RequestedCard from "@/components/Avatar/Card/RequestCard";
import BookedCard from "@/components/Cards/ExperiencePageCard/BookedCard";
import CancelledCard from "@/components/Cards/ExperiencePageCard/CancelledCard";
import CompletedCard from "@/components/Cards/ExperiencePageCard/CompletedCard";
import { setExperinceStatus } from "@/store/slice/experinceS/ExperinceSlice";
import { experienceGetUserApi } from "@/utills/service/experienceService/ExperienceService";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import Images from "@/constant/Images";
import RecordItModal from "@/components/Modal/RecordItModal";

function Experience() {
  const dispatch = useDispatch();
  const experinceStatusDetails = useSelector(
    (state) => state?.ExperinceProduct?.experinceStatus
  );

  const [InstantLiveModal, setInstantLiveModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Booked");
  const tabs = ["Requested", "Booked", "Completed", "Cancelled"];
  const [loader, setLoader] = useState(false);
  const experienceGetrequests = async (status) => {
    try {
      setLoader(true);
      const response = await experienceGetUserApi(status);
      dispatch(setExperinceStatus(response));
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    experienceGetrequests(activeTab);
  }, [activeTab]);

  const renderCard = (item) => {
    switch (item.status) {
      case "Requested":
        return <RequestedCard key={item.reqId} item={item} />;
      case "Booked":
        return <BookedCard key={item.reqId} item={item} />;
      case "Completed":
        return <CompletedCard key={item.reqId} item={item} />;
      case "Cancelled":
        return <CancelledCard key={item.reqId} item={item} />;
      default:
        return null;
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="container">
        {/* <ExperiencePageHeader /> */}
        <div className="my-3">
          <div className="p-4 sm:px-0">
            <div className="flex justify-end">
              <Link
                to="/user/recorded"
                className="flex gap-3 underline mb-2"
                onClick={() => setInstantLiveModal(true)}
              >
                <img src={Images.iconCamera} alt="" />
                Recorded Experience
              </Link>
            </div>
            <div className="lg:overflow-x-auto lg:overflow-y-hidden border-b">
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === tab
                        ? "border-primaryColor-900 text-primaryColor-900 font-bold"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Display the relevant cards based on the selected tab */}
            <div className="my-5 grid grid-cols-3 2xl:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {experinceStatusDetails?.isSuccess &&
              experinceStatusDetails?.data?.length > 0 ? (
                experinceStatusDetails.data.map((item) => renderCard(item))
              ) : (
                <h1 className="font-medium text-sm">No data found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <RecordItModal
        InstantLiveModal={InstantLiveModal}
        setInstantLiveModal={setInstantLiveModal}
      />
    </>
  );
}

export default Experience;
