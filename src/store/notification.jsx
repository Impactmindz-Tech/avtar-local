import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "@/utills/socket/Socket";
import toast from "react-hot-toast";
import MeetingNotification from "@/components/Modal/MeetingNotification";
import { setLocalStorage } from "@/utills/LocalStorageUtills";
import { googlesignupandsigninApi } from "@/utills/service/authService";
import { googlesignupandsigninApis } from "@/utills/service/getRole";

export const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = (props) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || {});
  const [meetLink, setMeetLink] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    if (socket && user?._id) {
      // socket.emit("addUser", user._id);
      socket.emit("userOnline", user._id);

      const handleIncomingMessage = (data) => {
        if (data.receiverId === user._id) {
          toast(`New message from ${data.user.fullname}: ${data.message}`, {
            duration: 6000,
          });
        }
      };

      socket.on("getMessage", handleIncomingMessage);

      socket.on("meetLink", (data) => {
        setMeetLink(data.link);
        setMeetingData(data);
        setLocalStorage("notificationData", data);
      });
        socket.on("roomId",(data)=>{
          console.log(data,'hello sir ');
          setMeetLink(data?.roomId);
          setMeetingData(data);
        })
      return () => {
        socket.off("getMessage", handleIncomingMessage);
        socket.off("meetLink");
      };
    }
  }, [user._id]);




  const baba = "sanju";
  const contextvalue = { baba, meetLink, showNotification, meetingData };

  return <SocketContext.Provider value={contextvalue}>{props.children}</SocketContext.Provider>;
};
