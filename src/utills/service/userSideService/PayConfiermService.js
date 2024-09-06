import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const payoutApi = async (payload) => {
  try {
    const res = await axiosInstance.post(`/user/payout`, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
