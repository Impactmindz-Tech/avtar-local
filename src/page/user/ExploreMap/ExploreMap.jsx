import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import MapComponent from "@/components/MapComponent";
import Images from "@/constant/Images";
import UserTopSearch from "@/components/UserTopSearch/UserTopSearch";
import { getLiveTourApi } from "@/utills/service/userSideService/TourService";
import MobileNavigation from "@/components/mobile_navigation/MobileNavigation";

const ExploreMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const query = new URLSearchParams(location.search);
  const tab = query.get("tab");

  const tabLabels = ["instant-live", "tours", "most-popular", "below-$5"];
  const body = [
    { lat: 30.7333, lon: 76.7794 },
    { lat: 30.7375, lon: 76.785 },
    { lat: 30.735, lon: 76.78 },
    { lat: 30.74, lon: 76.78 },
    { lat: 30.7355, lon: 76.772 },
    { lat: 30.73, lon: 76.77 },
    { lat: 30.725, lon: 76.774 },
    { lat: 30.75, lon: 76.78 },
    { lat: 30.74, lon: 76.765 },
    { lat: 30.745, lon: 76.769 },
    { lat: 30.755, lon: 76.77 },
    { lat: 30.757, lon: 76.765 },
    { lat: 30.752, lon: 76.77 },
    { lat: 30.765, lon: 76.78 },
    { lat: 30.76, lon: 76.775 },
    { lat: 30.7425, lon: 76.77 },
    { lat: 30.735, lon: 76.79 },
    { lat: 30.748, lon: 76.78 },
    { lat: 30.752, lon: 76.77 },
    { lat: 30.73, lon: 76.76 },
    { lat: 30.74, lon: 76.77 },
  ];

  const initialValue = tab ? tabLabels.indexOf(tab) : 0;
  const [value, setValue] = useState(initialValue);

  const getLiveTour = async () => {
    try {
      const response = await getLiveTourApi();
      if (response?.isSuccess) {
        setTour(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(tour?.data);

  useEffect(() => {
    getLiveTour();
    if (tab) {
      setValue(tabLabels.indexOf(tab));
    }
  }, [tab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate({
      pathname: location.pathname,
      search: `?tab=${tabLabels[newValue]}`,
    });
  };

  return (
    <>
      <div className="sm:px-4">
        <UserTopSearch />
      </div>
      <Tabs variant="fullWidth" scrollButtons="auto" value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs-explore-map">
        {tabLabels.map((label, index) => (
          <Tab key={index} icon={<img src={Images.toursIcon_img} alt={label} />} label={label.replace("-", " ").toUpperCase()} />
        ))}
      </Tabs>
      <div className="h-[calc(100svh-138px)] md:h-[calc(100svh-217px)] sm:h-[calc(100svh-192px)] relative z-10">
        {value === 0 && <MapComponent selectPosition={tour?.data} />}
        {value === 1 && <MapComponent selectPosition={body} />}
        {value === 2 && <MapComponent selectPosition={body} />}
        {value === 3 && <MapComponent selectPosition={body} />}
      </div>
      <MobileNavigation role="user" />
    </>
  );
};

export default ExploreMap;
