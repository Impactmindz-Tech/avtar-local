import BookedCard from "@/components/Avatar/Card/ExperiencePageCards/BookedCard";
import CancelCard from "@/components/Avatar/Card/ExperiencePageCards/CancelCard";
import CompletedCard from "@/components/Avatar/Card/ExperiencePageCards/CompletedCard";
import OffersCard from "@/components/Avatar/Card/OffersCard";
import RequestedCard from "@/components/Avatar/Card/RequestCard";
import Loader from "@/components/Loader";

import { setExperinceStatus } from "@/store/slice/avtar/ExperienceFiltter";
import { getRequestsApi } from "@/utills/service/avtarService/AddExperienceService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ExperiencePage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Requested");
  const [loading, setLoading] = useState(false);
  const tabs = ["Offers", "Requested", "Booked", "Completed", "Cancelled"];
  // const experinceStatus = useSelector((state) => state.avatar.experinceStatuss);
  const [experinceStatus, setExperinceStatus] = useState(null);

  const getRequests = async (search) => {
    setLoading(true);
    try {
      const responce = await getRequestsApi(search);
      if (responce?.isSuccess) {
        setExperinceStatus(responce);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRequests(activeTab);
  }, [activeTab]);

  return (
    <>
      {loading && <Loader />}
      <div className="">
        <div className="p-4 ">
          <div className="lg:overflow-x-auto lg:overflow-y-hidden border-b  ">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button key={tab} className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab ? "border-primaryColor-900 text-primaryColor-900 font-bold" : "border-transparent text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="my-5 grid grid-cols-3 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {experinceStatus?.data?.length > 0 ? (
              experinceStatus?.data?.map((item) => {
                const key = item?.expid || item?.id || Math.random();
                if (item?.status === "Requested") {
                  return <RequestedCard key={key} item={item} getRequests={getRequests} role="avatar" />;
                }
                if (item?.status === "Booked") {
                  return <BookedCard key={key} item={item} role="avatar" />;
                }
                if (item?.status === "Completed") {
                  return <CompletedCard key={key} item={item} role="avatar" />;
                }
                if (item?.status === "Cancelled") {
                  return <CancelCard key={key} item={item} role="avatar" />;
                }
                if (item?.type === "Offers") {
                  return <OffersCard key={item?.id} item={item} />;
                }
                return null;
              })
            ) : (
              <h1 className="font-medium text-sm">No data found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperiencePage;
