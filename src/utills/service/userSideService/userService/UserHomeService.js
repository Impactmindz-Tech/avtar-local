import axiosInstance from "@/utills/AxiosInstance";
import toast from "react-hot-toast";

export const userExperienceApi = async (payload) => {
  const { tab, country, search, items_per_page, page } = payload;
  try {
    const res = await axiosInstance.get(`/user/getExperience?filters=${tab}&country=${country}&search=${search}&items_per_page=${items_per_page}&pg=${page}`);
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const userExperienceListApi = async (id) => {
  try {
    const res = await axiosInstance.get("/user/getdetailExp/" + id);
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const getAllcountryApi = async () => {
  try {
    const res = await axiosInstance.get("/user/getAllcountry/");
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const bookingExperinceApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/booking/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const getBookingDetailsApi = async (id) => {
  try {
    const res = await axiosInstance.get("/user/getBookingDetails/" + id);
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const updateBookingTimeApi = async (id, payload) => {
  try {
    const res = await axiosInstance.patch("/user/updateBookingTime/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const updateBookingDateApi = async (id, payload) => {
  try {
    const res = await axiosInstance.patch("/user/updateBookingDate/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const userfilteredExp = async (payload) => {
  const { tab, search } = payload;

  try {
    const res = await axiosInstance.get(`/user/getExpcategorywise?${tab}=${search}`);
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const getAvatardetail = async (id) => {
  try {
    let res = await axiosInstance("/avatar/avatardetail/" + id);
    return res.data;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

export const bookingSlotsApi = async (id, payload) => {
  try {
    const queryParams = new URLSearchParams(payload).toString();
    const res = await axiosInstance.get(`/user/bookingslots/${id}?${queryParams}`);
    return res.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const reportBookingApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/report/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
export const reportAvatarApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/avatarReport/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const deleteAccountApi = async (status) => {
  try {
    const res = await axiosInstance.patch(`/user/deleteAcc/${status}`, null);
    return res.data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
    console.log(error);
  }
};
export const rateTourApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("user/giveRating/" + id, payload);
    return res.data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
    console.log(error);
  }
};

export const checkout = async (payload) => {
  try {
    const res = await axiosInstance.post("avatar/checkout", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data.message);
  }
};

export const paypalcheckout = async (payload) => {
  try {
    const res = await axiosInstance.post("avatar/payCheckout", payload);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data.messsage);
  }
};

export const getAvailableApi = async () => {
  try {
    const res = await axiosInstance.get("avatar/getAvailable");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendTipApi = async (payload) => {
  try {
    const res = await axiosInstance.post("user/sendTip", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
