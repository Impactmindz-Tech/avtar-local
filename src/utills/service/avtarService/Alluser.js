import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const getAllUserApi = async () => {
  try {
    const res = await axiosInstance.get("/user/getAlluser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllAvatarChatUserApi = async () => {
  try {
    const res = await axiosInstance.get("/avatar/chatwithuser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUerChatAvatarApi = async () => {
  try {
    const res = await axiosInstance.get("/user/chatwithavatar");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
