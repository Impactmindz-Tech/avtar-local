import { useState } from "react";

import OffersCard from "../Avatar/Card/OffersCard";
import RequestedCard from "../Avatar/Card/ExperiencePageCards/RequestCard";
import BookedCard from "../Avatar/Card/ExperiencePageCards/BookedCard";
import CancelledCard from "../Avatar/Card/ExperiencePageCards/CancelledCard";
import CompletedCard from "../Avatar/Card/ExperiencePageCards/CompletedCard";
const ExperienceTabAvatar = () => {
  const [activeTab, setActiveTab] = useState("Offers");
  const tabs = ["Offers", "Requested", "Booked", "Completed", "Cancelled"];
  return (
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
        {activeTab === "Offers" && (
          <>
            <div className="my-5 grid grid-cols-4  sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <OffersCard />
              <OffersCard />
              <OffersCard />
              <OffersCard />
              <OffersCard />
              <OffersCard />
            </div>
          </>
        )}
        {activeTab === "Booked" && (
          <>
            <div className="my-5 grid grid-cols-4  lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3  gap-4">
              <BookedCard />
              <BookedCard />
              <BookedCard />
              <BookedCard />
              <BookedCard />
            </div>
          </>
        )}
        {activeTab === "Requested" && (
          <>
            <div className="my-5 grid grid-cols-4  lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3  gap-4">
              <RequestedCard />
              <RequestedCard />
              <RequestedCard />
              <RequestedCard />
              <RequestedCard />
            </div>
          </>
        )}
        {activeTab === "Completed" && (
          <>
            <div className="my-5 grid grid-cols-4  lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3  gap-4">
              <CompletedCard />
              <CompletedCard />
              <CompletedCard />
              <CompletedCard />
              <CompletedCard />
              <CompletedCard />
            </div>
          </>
        )}
        {activeTab === "Cancelled" && (
          <>
            <div className="my-5 grid grid-cols-4  lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3  gap-4">
              <CancelledCard />
              <CancelledCard />
              <CancelledCard />
              <CancelledCard />
              <CancelledCard />
              <CancelledCard />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExperienceTabAvatar;
