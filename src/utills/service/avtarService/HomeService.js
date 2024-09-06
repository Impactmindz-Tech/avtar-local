import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const avatarDetailsApi = async () => {
  try {
    const res = await axiosInstance.get("/avatar/avatardetails/");
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const addlocationApi = async (payload) => {
  try {
    const res = await axiosInstance.post("/avatar/addlocation/" ,payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
export const getAllRecentRequest = async () => {
  try {
    const res = await axiosInstance.get("/avatar/recent");
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};



export const withdraw = async(payload)=>{
  try{
    const res = await axiosInstance.post("/avatar/withdraw",payload);
    return res.data;
  }
  catch(error){
    console.log(error);
  }
}