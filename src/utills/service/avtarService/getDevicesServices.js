import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const allDevicesDetails = async () => {
  try {
    const res = await axiosInstance.get("/admin/getalldevicesall");
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};