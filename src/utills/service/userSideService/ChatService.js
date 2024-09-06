import axiosInstance from "@/utills/AxiosInstance";

export const getavatarChatApi = async () => {
  try {
    const res = await axiosInstance.get("/user/getavatar");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const chatServiceApi = async (id, payload) => {
  try {
    const res = await axiosInstance.post("/user/chat/" + id, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getcChatApi = async (id) => {
  try {
    const res = await axiosInstance.get("/user/getchat/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getChatMessageApi = async (id) => {
  try {
    const res = await axiosInstance.get("chat/api/message/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ChatMessageGetByConversationIdApi = async (id, senderId, receiverId) => {
  if (!id) {
    throw new Error("Invalid conversation ID");
  }

  try {
    const response = await axiosInstance.get(`/chat/api/message/${id}`, {
      params: {
        senderId,
        receiverId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch message error:", error);
    throw error;
  }
};


export const sendMessageApi = async (payload) => {
  try {
    const response = await axiosInstance.post("/chat/api/message/", payload);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};