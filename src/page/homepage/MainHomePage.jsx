import MainHomeDashboard from "@/Layout/MainHomeDashboard";
import MainHome from "../user/home/MainHome";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainHomePage = () => {
  let currentUser = getLocalStorage("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.Activeprofile == "user") {
        navigate("/user/dashboard");
      }
      if (currentUser.Activeprofile == "avatar") {
        navigate("/avatar/dashboard");
      }
    }
  }, [currentUser]);
  return (
    <>
      <MainHomeDashboard>
        <MainHome />
      </MainHomeDashboard>
    </>
  );
};

export default MainHomePage;
