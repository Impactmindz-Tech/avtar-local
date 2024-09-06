import ChatUserCard from "@/components/Cards/ChatUserCard/ChatUserCard";
import HeaderBack from "@/components/HeaderBack";
import BrandImageHeader from "@/components/UserHeader/BrandImageHeader";
import UserSearch from "@/components/UserTopSearch/UserSearch";
import { useState } from "react";

function Chat() {
  const [userData, setUserData] = useState([]);
  return (
    <div className="container">
      <HeaderBack />

      {/* <BrandImageHeader link={"/user/home"} /> */}

      <div className=" m-auto ">
        {/* <UserSearch /> */}

        <div className="userContainer">
          <ChatUserCard setUserData={setUserData} />
          {userData.length == 0 && <div className="text-grey-800 mt-5">You don&lsquo;t have any bookings yet.</div>}
        </div>
      </div>
    </div>
  );
}

export default Chat;
