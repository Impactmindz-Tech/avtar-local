import axiosInstance from "../AxiosInstance";
import toast from "react-hot-toast";

export const loginApi = async (payload) => {

  
  try {
    if(payload?.uid){
      const res = await axiosInstance.post("/user/login",payload);
      return res.data
    }
    else{
      const res = await axiosInstance.post("/user/login", payload);
      return res.data;
    }
    
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
export const forgetPasswordApi = async (payload) => {
  try {
    const res = await axiosInstance.post("/user/checkemail", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
export const verifyOtpApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/verifyOtp/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const registrationApi = async (payload) => {


  try {
    const res = await axiosInstance.post("/user/Adduser", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const changePasswordApi = async (id, payload) => {
  try {
    const res = await axiosInstance.patch("/user/changepassword/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const userRoleApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/userprofile/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const addAddressApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/addprofile/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
export const googlesignupandsigninApi = async (payload) => {
  try {
    const res = await axiosInstance.post("/user/googlesignupandsignin", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
