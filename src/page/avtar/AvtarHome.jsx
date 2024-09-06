import AddExperienceCard from "@/components/Avatar/HomeScreen/AddExperienceCard";
import PerformanceCard from "@/components/Avatar/HomeScreen/PerformanceCard";
import TitleHeading from "@/components/Avatar/Heading/TitleHeading";
import UserSearch from "@/components/UserTopSearch/UserSearch";
import InstantLiveCard from "@/components/Avatar/HomeScreen/InstantLiveCard";
import EarningCard from "@/components/Avatar/HomeScreen/EarningCard";
import Images from "@/constant/Images";
import RequestedCard from "@/components/Avatar/Card/RequestCard";
import { useEffect, useState } from "react";
import InstantLiveRequestModal from "@/components/Modal/InstantLiveRequestModal";
import socket from "@/utills/socket/Socket";
import { avatarEarningApi } from "@/utills/service/avtarService/Earnings";
import {
  addlocationApi,
  avatarDetailsApi,
  getAllRecentRequest,
} from "@/utills/service/avtarService/HomeService";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { useGeolocated } from "react-geolocated";
import Loader from "@/components/Loader";

const AvtarHome = () => {
  const [recentData, setRecentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [instantLiveModalState, setInstantLiveModalState] = useState(false);
  const [avtarDetails, setAatarDetails] = useState([]);
  const [instanreq, setinstantreq] = useState([]);
  const [earning, setEarning] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const userId = getLocalStorage("user")?._id;
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });


  const avatarEarning = async () => {
    try {
      const response = await avatarEarningApi();
      if (response) {
        setEarning(response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const avatarDetails = async () => {
    try {
      setLoader(true);
      const response = await avatarDetailsApi();
      setLoader(false);
      if (response?.isSuccess) {
        setAatarDetails(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (coords && coords.longitude && coords.latitude) {
      let body = {
        lat: coords?.latitude,
        lng: coords?.longitude,
      };
      try {
        const response = addlocationApi(body);
      } catch (error) {
        console.log(error);
      }
    }
  }, [coords]);

  useEffect(() => {
    avatarDetails();
    avatarEarning();
  }, []);

  useEffect(() => {
    socket.emit("instantLive", userId);
    socket.on("request", (data) => {
      setinstantreq(data);
      if (data?.length !== 0) {
        setInstantLiveModalState(true);
      }
    });

    return () => {
      socket.emit("userOffline", userId);
      socket.off("instantLive");
    };
  }, [userId]);

  const recentRequestData = async () => {
    try {
      setLoader(true);
      const res = await getAllRecentRequest();
      if (res?.isSuccess) {
        setRecentData(res.data);
        setFilteredData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    recentRequestData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = recentData.filter((item) =>
        item?.experienceName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(recentData.slice(0, 6));
    }
  }, [searchTerm, recentData]);

  return (
    <div className="px-4">
      {loader && <Loader />}
      <UserSearch onsearch={setSearchTerm} />
      <div>
        <InstantLiveCard instanreq={instanreq} />
      </div>
      {/* add exp */}
      <AddExperienceCard />
      {/* Your Performances  */}
      <TitleHeading title={"Your Performances"} />
      <div className="grid grid-cols-4 mt-5 sm:gap-[8px] gap-5 my-2">
        {avtarDetails.map((item) => (
          <PerformanceCard key={item.name} item={item} />
        ))}
      </div>
      <TitleHeading title={"Earnings"} />
      <div className="flex gap-2 my-4">
        <EarningCard icon={Images.calendarTick} price={earning?.todayEarnings ? earning?.todayEarnings : "0"} title="Today" />
        <EarningCard icon={Images.calendar30} price={earning?.thisMonthEarnings ? earning?.thisMonthEarnings : ""}  title="This Month" />
      </div>
      <TitleHeading title={"Recent Requests"} />
      {filteredData.length !== 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {filteredData.map((item) => {
            return (
              <RequestedCard key={item?.reqId} item={item} role={"avatar"} />
            );
          })}
        </div>
      ) : (
        <h1 className="font-medium text-sm mb-4">No Recent Request Found</h1>
      )}
      <InstantLiveRequestModal
        instanreq={instanreq}
        role={"avatar"}
        instantLiveModalState={instantLiveModalState}
        setInstantLiveModalState={setInstantLiveModalState}
      />
    </div>
  );
};

export default AvtarHome;
