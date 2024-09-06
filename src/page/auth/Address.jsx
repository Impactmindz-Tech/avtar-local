import { addAddressApi } from "@/utills/service/authService";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import Image from "../../constant/Images";
import { useGeolocated } from "react-geolocated";

const Address = () => {
  const [loader, setLoader] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const { coords, getPosition, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
    watchPosition: false,
    suppressLocationOnMount: true,
    onError: (error) => {
      setLoader(false);
      if (error.code === 1) {
        toast("Please allow location permissions in your browser.", {
          duration: 4000,
        });
      } else {
        toast("Error fetching location. Please try again.", {
          duration: 4000,
        });
      }
    },
  });

  const addAddress = async () => {
    const id = params?.id;

    if (!countryId || !countryId.name) {
      toast.error("Please Select Country");
      return;
    }

    const data = {
      country: countryId.name,
      State: stateId?.name,
      city: cityId?.name,
      zipCode,
    };

    try {
      setLoader(true);
      const response = await addAddressApi(id, data);
      if (response?.isSuccess) {
        toast.success(response?.message);
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const getLocationFromLatLong = async (lat, lng) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.address) {
        const { country, city, city_district, postcode } = data.address;
        const userId = params?.id;
        const payload = {
          country: country,
          State: city,
          city: city_district,
          zipCode: postcode,
        };

        try {
          setLoader(true);

          const response = await addAddressApi(userId, payload);
          if (response?.isSuccess) {
            toast.success(response?.message);
            navigate("/user/dashboard");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoader(false);
        }
      } else {
        toast.error("Unable to fetch location details.");
      }
    } catch (error) {
      console.error("Geocoding error: ", error);
      toast.error("Error fetching location details.");
    }
  };

  const getCurrentLocation = async () => {
    if (!isGeolocationAvailable) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    if (!isGeolocationEnabled) {
      toast.error("Geolocation is disabled. Please enable it in your browser settings.");
      return;
    }

    setLoader(true);
    getPosition();
  };

  useEffect(() => {
    if (coords && coords.latitude && coords.longitude) {
      getLocationFromLatLong(coords.latitude, coords.longitude);
    }
  }, [coords]);

  return (
    <>
      {loader && <Loader />}
      <div className="w-[50%] mx-auto lg:max-w-full">
        <div className="py-1 "></div>
        <div className="flex flex-col gap-2 my-3 gap-y-4 relative">
          <h1 className="text-textMainColor-900 font-medium">Address</h1>
          <div className="flex flex-col gap-2 my-3">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="country" className="text-primaryColor-900">
                Country
              </label>
              <CountrySelect inputClassName="input_border" value={countryId} onChange={(e) => setCountryId(e)} placeHolder="Select Country" />
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="state" className="text-primaryColor-900">
                State
              </label>
              <StateSelect inputClassName="input_border" countryid={countryId?.id} value={stateId} onChange={(e) => setStateId(e)} placeHolder="Select State" />
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="city" className="text-primaryColor-900">
                City
              </label>
              <CitySelect inputClassName="input_border" countryid={countryId?.id} stateid={stateId?.id} value={cityId} onChange={(e) => setCityId(e)} placeHolder="Select City" />
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="zipcode" className="text-primaryColor-900">
                Zip Code
              </label>
              <input type="number" name="zipcode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} id="zipcode" className="input" placeholder="93940" />
            </div>

            <div className="use-current-location flex gap-x-2 items-center leading-none cursor-pointer" onClick={getCurrentLocation}>
              <img src={Image.iconCurrentLocation} alt="Use current location" />
              Use current location
            </div>
          </div>

          <p className="w-full cursor-pointer text-center mt-20 my-2 underline text-primaryColor-900">
            <Link to="/user/dashboard">Skip</Link>
          </p>

          <div onClick={addAddress}>
            <button className="cursor-pointer w-full bg-primaryColor-900 p-4 text-center text-white mt-2 rounded-xl">Done</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
