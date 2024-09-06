import axiosInstance from "@/utills/AxiosInstance";

export const experienceGetrequestsApi = async (status) => {
  // const status = payload?.status;
  try {
    const res = await axiosInstance.get("/avatar/getrequests?status=" + status);
    // const res = await axiosInstance.get("/user/expStatus?status=" + status);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const experienceGetUserApi = async (status) => {
  // const status = payload?.status;
  try {
    const res = await axiosInstance.get("user/expStatus?status=" + status);
    // const res = await axiosInstance.get("/user/expStatus?status=" + status);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
