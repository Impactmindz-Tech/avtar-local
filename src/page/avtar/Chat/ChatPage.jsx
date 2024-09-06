import ChatUserCard from "@/components/Cards/ChatUserCard/ChatUserCard";
import BrandImageHeader from "@/components/UserHeader/BrandImageHeader";
import UserSearch from "@/components/UserTopSearch/UserSearch";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { useEffect, useState } from "react";
import socket from "@/utills/socket/Socket";
import HeaderBack from "@/components/HeaderBack";
const userId = getLocalStorage("user")?._id;

function ChatPageAvatar() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    socket.emit("Onlinchat", userId);
    socket.on("recevied", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <div className="container">
      {/* <HeaderBack /> */}

      <div className=" m-auto ">
        {/* <UserSearch  /> */}

        <div className="userContainer">
          <ChatUserCard setUserData={setUserData} />
          {userData.length == 0 && <div className="text-grey-800 mt-5">You don&lsquo;t have any bookings yet.</div>}
        </div>
      </div>
    </div>
  );
}

export default ChatPageAvatar;
