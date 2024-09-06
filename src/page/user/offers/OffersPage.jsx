import TitleHeading from "@/components/Avatar/Heading/TitleHeading";
import { createOfferValidation } from "@/utills/formvalidation/FormValidation";
import { createOfferApi } from "@/utills/service/userSideService/OfferService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

function Offers() {
  const [countryid, setCountryid] = useState(0);
  const [loader, setLoader] = useState(false);
  const [stateid, setstateid] = useState(0);
  const [cityId, setCityId] = useState(0);

  const countrySelectRef = useRef(null); // Ref for CountrySelect

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createOfferValidation) });

  const onSubmit = async (formData) => {
    if (!countryid.name) {
      return toast.error("Please Select Country");
    }
    let body = {
      ...formData,
      Country: countryid.name,
      City: cityId.name,
      State: stateid.name,
    };
    try {
      setLoader(true);
      const response = await createOfferApi(body);
      if (response?.isSuccess) {
        toast.success(response?.message);
        navigate("/user/offer-success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleCountryFocus = () => {
    if (countrySelectRef.current) {
      countrySelectRef.current.focus();
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="container">
        <TitleHeading title={"Create Offer"} />
        <div className="forms">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex gap-2 lg:flex-col lg:gap-0">
              <div className="my-2 flex-1">
                <label htmlFor="Title" className="font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="Title"
                  id="Title"
                  placeholder="Eg. shikara hotel, india"
                  className="input my-2"
                  {...register("Title")}
                />
                <p className="text-[red]">{errors?.Title?.message}</p>
              </div>

              <div className="my-2 flex-1">
                <label htmlFor="price" className="font-semibold">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Eg. $10"
                  className="input my-2"
                  {...register("price")}
                />
                <p className="text-[red]">{errors?.price?.message}</p>
              </div>
            </div>

            <div className="flex flex-col gap-y-1 ">
              <label
                htmlFor="country"
                className="text-primaryColor-900 font-semibold"
              >
                Country
              </label>
              <CountrySelect
                ref={countrySelectRef} // Attach ref
                inputClassName="input_border"
                onChange={(e) => {
                  setCountryid(e);
                }}
                placeHolder="Select Country"
                onFocus={handleCountryFocus} // Trigger onFocus event
              />
            </div>

            <div className="my-3 flex gap-2 lg:flex-col lg:gap-0">
              <div className="flex-1 flex flex-col gap-y-1 ">
                <label
                  htmlFor="country"
                  className="text-primaryColor-900 font-semibold"
                >
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

              <div className="flex-1 flex flex-col gap-y-1">
                <label
                  htmlFor="country"
                  className="text-primaryColor-900 font-semibold"
                >
                  City
                </label>
                <CitySelect
                  inputClassName="input_border"
                  countryid={countryid.id}
                  stateid={stateid.id}
                  onChange={(e) => {
                    setCityId(e);
                  }}
                  placeHolder="Select City"
                />
              </div>
            </div>

            <div className="flex gap-2 lg:flex-col lg:gap-0">
              <div className="my-2 flex-1">
                <label htmlFor="ZipCode" className="font-semibold">
                  Zipcode
                </label>
                <input
                  type="text"
                  name="ZipCode"
                  id="ZipCode"
                  placeholder="93940"
                  className="input my-2"
                  {...register("ZipCode")}
                />
                <p className="text-[red]">{errors?.ZipCode?.message}</p>
              </div>
              <div className="my-2 flex-1">
                <label htmlFor="Minutes" className="font-semibold">
                  Minutes
                </label>
                <input
                  type="number"
                  name="Minutes"
                  id="Minutes"
                  placeholder="Eg. 15"
                  className="input my-2"
                  {...register("Minutes")}
                />
                <p className="text-[red]">{errors?.Minutes?.message}</p>
              </div>
            </div>

            <div className="my-2">
              <label htmlFor="Notes" className="font-semibold">
                Notes
              </label>
              <textarea
                name="Notes"
                rows={5}
                id="Notes"
                className="input my-2 resize-none"
                placeholder="Tell the avatar what tour would you like"
                {...register("Notes")}
              ></textarea>
              <p className="text-[red]">{errors?.Notes?.message}</p>
            </div>

            <div className="my-2">
              <button className="w-full my-6 rounded-md bottom-1 m-auto left-0 right-0 p-3 cursor-pointer bg-backgroundFill-900 text-white text-center">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Offers;
