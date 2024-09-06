import MyExperienceCard from "@/components/Avatar/Card/ExperiencePageCards/MyExperienceCard";
import TitleHeading from "@/components/Avatar/Heading/TitleHeading";
import Loader from "@/components/Loader";
import { getExpApi } from "@/utills/service/avtarService/AddExperienceService";
import React, { useEffect, useState } from "react";

const MyExperienceList = () => {
  const [experience, setExperience] = useState([]);
  const [loader, setLoader] = useState(false);

  const getExp = async () => {
    setLoader(true);
    try {
      const response = await getExpApi();
      if (response?.isSuccess) {
        setExperience(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getExp();
  }, []);
  return (
    <div className="px-4">
      {loader && <Loader />}
      <TitleHeading title={"My Experience"} />
      <div className="grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 my-2">
        {experience?.isSuccess &&
          experience?.data?.map((item) => {
            return (
              <MyExperienceCard key={item?._id} item={item} onDelete={getExp} />
            );
          })}
        {experience?.length == 0 && <h1>No Experience Found</h1>}
      </div>
    </div>
  );
};

export default MyExperienceList;
