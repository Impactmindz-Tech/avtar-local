import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const getAllExperience = async (payload) => {
  const { pg, items_per_page } = payload;

  try {
    const res = await axiosInstance.get(`/user/getallexperience`, {
      params: {
        pg,
        items_per_page,
      },
    });
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message || "An error occurred");
    console.log(error);
 
  }
};