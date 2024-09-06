import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  const token = getLocalStorage("token");
  const currentState = getLocalStorage("user")?.Activeprofile;

  useEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    } else if (currentState) {
      switch (currentState) {
        case "user":
          navigate("/user/dashboard", { replace: true });
          break;
        case "avatar":
          navigate("/avatar/dashboard", { replace: true });
          break;
        default:
          navigate("/auth/login", { replace: true });
      }
    }
  }, [token, currentState, navigate]);

  return null;
};

export default Root