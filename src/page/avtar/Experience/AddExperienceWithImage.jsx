import EditExperienceCard from "@/components/Avatar/Card/EditExperienceCard";
import TitleHeading from "@/components/Avatar/Heading/TitleHeading";
import HeaderBack from "@/components/HeaderBack";
import Images from "@/constant/Images";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import { yupResolver } from "@hookform/resolvers/yup";
import { addExperinceValidation } from "@/utills/formvalidation/FormValidation";

import { AddexperienceApi } from "@/utills/service/avtarService/AddExperienceService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

function AddExperienceWithImagePage() {
  const [loading, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [otherSelectedFiles, setOtherSelectedFiles] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [otherImageURLs, setOtherImageURLs] = useState([]);
  const mainImage = useRef(null);
  const otherImage = useRef(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addExperinceValidation) });

  const handleMainImageClick = () => {
    if (mainImage.current) {
      mainImage.current.click();
    }
  };

  const handleOtherImageClick = () => {
    if (otherImage.current) {
      otherImage.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate that the file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }

      setSelectedFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };
  const handleOtherFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate that all files are images
      const validFiles = files.filter((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(
            `Invalid file detected: ${file.name}. Please select only image files.`
          );
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        setOtherSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
        setOtherImageURLs((prevURLs) => [
          ...prevURLs,
          ...validFiles.map((file) => URL.createObjectURL(file)),
        ]);
      }
    }
  };

  const handleRemoveMainImage = () => {
    setImageURL(null);
    setSelectedFile(null);
  };

  const handleRemoveOtherImage = (index) => {
    const updatedFiles = otherSelectedFiles.filter((_, i) => i !== index);
    const updatedURLs = otherImageURLs.filter((_, i) => i !== index);
    setOtherSelectedFiles(updatedFiles);
    setOtherImageURLs(updatedURLs);
  };

  const fetchCoordinates = async (country, city, state) => {
    try {
      // const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${country},${city},${state}%20india&format=json&limit=1`);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city},${state},${country}&format=json&limit=1`
      );
      const data = await response.json();
      console.log(data, "test");
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat, lon };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      toast.error("Please Select Image");
    }

    const coordinates = await fetchCoordinates(
      countryid?.name,
      stateid?.name,
      cityId?.name
    );
    const formData = new FormData();

    // Append text fields
    formData.append("ExperienceName", data?.ExperienceName);
    formData.append("about", data?.about);
    formData.append("AmountsperMinute", data?.AmountsperMinute);
    formData.append("notesForUser", data?.notesForUser);
    formData.append("country", countryid.name);
    formData.append("State", stateid.name || "");
    formData.append("city", cityId.name || "");
    formData.append("bookinstaltly", isChecked);
    formData.append("lat", coordinates.lat);
    formData.append("lng", coordinates.lon);
    // formData.append("city", cityId.name || "");
    if (countryid.name === undefined) {
      toast.error("Please Select Country");
      return;
    }
    formData.append(`thumbnail`, selectedFile);
    for (let index = 0; index < otherSelectedFiles.length; index++) {
      formData.append(`images`, otherSelectedFiles[index]);
    }
    try {
      setLoader(true);
      const response = await AddexperienceApi(formData);
      setLoader(false);
      if (response?.isSuccess) {
        toast.success(response?.message);
        navigate("/avatar/add-experience");
      }
    } catch (error) {
      console.error("API error: ", error);
    }
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="px-4">
        <HeaderBack link="/avatar/add-experience" text={"Add Experience"} />
        <TitleHeading title={"Add Experience Images"} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex justify-between my-4 flex-wrap">
            <div className="w-[49%] relative">
              <div className="absolute top-2 right-2 flex gap-2">
                {/* <div className="bg-white p-4 sm:p-2 rounded-md BoxShadowLessRounded">
                  <img src={Images.rotate} alt="edit" className="cursor-pointer w-6 h-6" />
                </div> */}
                {selectedFile && (
                  <div
                    className="cursor-pointer bg-white p-4 sm:p-2 rounded-md BoxShadowLessRounded"
                    onClick={handleRemoveMainImage}
                  >
                    <img
                      src={Images.close}
                      alt="remove"
                      className="cursor-pointer w-6 h-6"
                    />
                  </div>
                )}
              </div>

              {!imageURL ? (
                <div
                  onClick={handleMainImageClick}
                  className="border rounded-lg w-full  h-[240px] sm:h-[140px] bg-[#f2f2f2] border-[#e2e2e2] flex justify-center items-center flex-col cursor-pointer group py-5"
                >
                  <input
                    className="hidden"
                    onChange={handleFileChange}
                    ref={mainImage}
                    type="file"
                    accept="image/*"
                  />
                  <div className="flex justify-center p-2 bg-white rounded-md">
                    <img
                      src={Images.add}
                      alt="add"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h1 className="text-center text-grey-800 pt-2 font-semibold group-hover:text-grey-900 sm:text-base">
                    Main Image
                  </h1>
                </div>
              ) : (
                <img
                  src={imageURL}
                  alt="Selected"
                  className="w-full object-cover rounded-2xl z-10 h-[240px] sm:h-[140px]"
                />
              )}
            </div>

            <div className="w-[49%] h-full relative">
              <div
                onClick={handleOtherImageClick}
                className="border  h-[240px] sm:h-[140px] rounded-lg w-full bg-[#f2f2f2] border-[#e2e2e2] flex justify-center items-center flex-col group cursor-pointer py-5"
              >
                <input
                  className="hidden"
                  onChange={handleOtherFileChange}
                  ref={otherImage}
                  type="file"
                  multiple
                  accept="image/*"
                />
                <div className="flex justify-center p-2 bg-white rounded-md">
                  <img
                    src={Images.add}
                    alt="add"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h1 className="text-center text-grey-800 pt-2 font-semibold group-hover:text-grey-900 sm:text-base">
                  Other Images
                </h1>
              </div>
            </div>
          </div>

          <div className="my-6 grid grid-cols-6 2xl:grid-cols-5 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {otherImageURLs.map((url, index) => (
              <EditExperienceCard
                key={index}
                imageURL={url}
                onRemove={() => handleRemoveOtherImage(index)}
              />
            ))}
          </div>

          <div className="my-2">
            <label htmlFor="exp-name" className="font-semibold">
              Add Experience Name
            </label>
            <input
              type="text"
              name="ExperienceName"
              id="exp-name"
              className="input my-2"
              placeholder="Eiffel Tower"
              {...register("ExperienceName")}
            />
            <p className="text-[red]">{errors?.ExperienceName?.message}</p>
          </div>

          <div className="flex flex-col gap-2 my-3">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="country" className="text-primaryColor-900">
                Country
              </label>
              <CountrySelect
                inputClassName="input_border"
                onChange={(e) => {
                  setCountryid(e);
                }}
                placeHolder="Select Country"
              />
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="country" className="text-primaryColor-900">
                State
              </label>
              <StateSelect
                inputClassName="input_border"
                countryid={countryid.id}
                onChange={(e) => {
                  setstateid(e);
                }}
                placeHolder="Select State"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="country" className="text-primaryColor-900">
                City
              </label>
              <CitySelect
                inputClassName="input_border"
                countryid={countryid.id}
                stateid={stateid.id}
                onChange={(e) => {
                  console.log(setCityId(e));
                }}
                placeHolder="Select City"
              />
            </div>
          </div>

          <div className="my-2">
            <label htmlFor="AmountsperMinute" className="font-semibold">
              Add Amount Per Minutes
            </label>
            <input
              type="number"
              name="AmountsperMinute"
              id="AmountsperMinute"
              className="input my-2"
              placeholder="$5"
              {...register("AmountsperMinute")}
            />
            <p className="text-[red]">{errors?.AmountsperMinute?.message}</p>
          </div>

          <div className="my-4 flex justify-between items-center">
            <div className="left">
              {" "}
              <label htmlFor="notesForUser" className="font-semibold flex">
                Add Instant Live
                <input
                  type="checkbox"
                  id="notesForUser"
                  className="hidden"
                  checked={isChecked}
                  onChange={handleToggle}
                />
                <span
                  className={`relative inline-block w-10 h-6 transition-colors duration-300 ease-in-out rounded-full ml-4 ${
                    isChecked ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
                      isChecked ? "translate-x-4" : ""
                    }`}
                  ></span>
                </span>
              </label>
            </div>
            {/* <div className="border-2 border-[#FF7070] p-4 rounded-lg px-6">
              <img src={Images.InstantLiveText} alt="InstantLiveText" />
            </div> */}
          </div>

          <div className="my-2">
            <label htmlFor="about" className="font-semibold">
              About
            </label>
            <textarea
              name="about"
              rows={2}
              id="about"
              className="input my-2 resize-none"
              placeholder="Enter About this experience"
              {...register("about")}
            ></textarea>
            <p className="text-[red]">{errors?.about?.message}</p>
          </div>
          <div className="my-2">
            <label htmlFor="notesForUser" className="font-semibold">
              Notes for Users
            </label>
            <textarea
              name="notesForUser"
              rows={5}
              id="notesForUser"
              className="input my-2 resize-none"
              placeholder="Type notes"
              {...register("notesForUser")}
            ></textarea>
            <p className="text-[red]">{errors?.notesForUser?.message}</p>
          </div>

          <div className="my-2">
            <button
              type="submit"
              className="w-full my-6 rounded-md bottom-1 m-auto left-0 right-0 p-3 cursor-pointer bg-backgroundFill-900 text-white text-center"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddExperienceWithImagePage;
