import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const createOfferApi = async (payload) => {
  try {
    const res = await axiosInstance.post(`/user/createoffer`, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
