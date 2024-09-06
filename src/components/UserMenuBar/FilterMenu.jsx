import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/slice/experinceS/ExperinceSlice";
import FilterUserCard from "../Cards/FilterCard/FilerUserCard";
import UserSearch from "../UserTopSearch/UserSearch";
import Loader from "../Loader";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { userfilteredExp } from "@/utills/service/userSideService/userService/UserHomeService";

const FilterMenu = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = {
    All: "All",
    Place: "By Name",
    City: "City",
    State: "State",
    Country: "Country",
  };

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userExperienceData = useSelector(
    (state) => state.ExperinceProduct.products
  );

  const fetchUserExperience = useCallback(
    async (tab) => {
      const payload = {
        tab: tab,
        search: search,
      };
      setLoading(true);
      try {
        const response = await userfilteredExp(payload);
        let userId = getLocalStorage("user")?._id;
        if (response?.isSuccess) {
          let newData = response.data.filter(
            (item) => item.availabilities.length !== 0
          );
          let filterNotMyData = newData.filter(
            (item) => item.avatarId !== userId
          );
          let body = { data: filterNotMyData };
          dispatch(setProducts(body));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, search]
  );

  useEffect(() => {
    fetchUserExperience(activeTab);
  }, [activeTab, fetchUserExperience]);

  return (
    <>
      {loading && <Loader />}
      <div className="">
        <UserSearch onsearch={setSearch} />
        <div className="lg:overflow-x-auto lg:overflow-y-hidden  ">
          <div className="flex gap-2">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 whitespace-nowrap rounded border border-[#cccccc] ${
                  activeTab === tab
                    ? "bg-backgroundFill-900 border-[#cccccc] text-white"
                    : "bg-white text-grey-800"
                } hover:bg-backgroundFill-900 hover:border-[#cccccc] hover:text-white`}
                onClick={() => setActiveTab(tab)}
              >
                {tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        <div className="my-5 grid grid-cols-4 2xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {userExperienceData?.data?.map((product) => (
            <FilterUserCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterMenu;
