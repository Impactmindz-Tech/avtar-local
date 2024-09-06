import axiosInstance from "../AxiosInstance";

export const googlesignupandsigninApis = async () => {
  try {
    const res = await axiosInstance.get("/user/getrole");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
