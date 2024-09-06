import axiosInstance from "@/utills/AxiosInstance";

export const getLiveTourApi = async () => {
  try {
    const res = await axiosInstance.get(`/user/tours`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
