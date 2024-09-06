import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const acceptOfferApi = async (id) => {
  try {
    const res = await axiosInstance.get("/avatar/offerdetails/" + id);
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
