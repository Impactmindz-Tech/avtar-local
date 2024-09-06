import { getAllAvatarChatUserApi, getAllUerChatAvatarApi, getAllUserApi } from "@/utills/service/avtarService/Alluser";
import { ChatMessageGetByConversationIdApi, getavatarChatApi } from "@/utills/service/userSideService/ChatService";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatarPlaceholderImage from "../../../assets/images/avtar.png";
import UserSearch from "@/components/UserTopSearch/UserSearch";
import Loader from "@/components/Loader";

const ChatUserCard = ({setUserData}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [avtar, setAvtar] = useState([]);
  const [message, setMessage] = useState([]);
  const location = useLocation();
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [searchTerm, setSearchTerm] = useState("");

  const getavatarChat = async () => {
    try {
      setLoader(true);
      const responce = location.pathname == "/avatar/chat" ? await getAllAvatarChatUserApi() : await getAllUerChatAvatarApi();
      if (responce?.isSuccess) {
        setAvtar(responce);
        setUserData(responce?.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const ChatMessageGetByConversationId = async (item) => {
    const conversationId = item?.conversationId || "new";
    const body =
      conversationId === "new"
        ? {
            senderId: user?._id,
            receiverId: item?.id,
          }
        : {};

    try {
      setLoader(true);
      const response = await ChatMessageGetByConversationIdApi(conversationId, body.senderId, body.receiverId);
      if (response?.isSuccess) {
        setMessage(response);
        setSelectedConversationId(response?.conversationId);
        setReceiverId(item?.user?.receiverId);
        navigate(location.pathname == "/avatar/chat" ? "/avatar/chatwithuser/" + item?.id : "/user/ChatUser/" + item?.id, { state: { item } });
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getavatarChat();
  }, []);

  const filteredAvtar = avtar?.data?.filter((item) => item.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
  return (
    <>
      {loader && <Loader />}
      <UserSearch onsearch={setSearchTerm} />
      {filteredAvtar?.map((item) => {
        return (
          <div key={item?.id} onClick={() => ChatMessageGetByConversationId(item)} className="flex gap-2 items-center w-full mb-5 cursor-pointer">
            <div className="image">
              <img className="w-[56px] h-[56px] sm:w-[36px] sm:h-[36px] rounded-full" src={item.profile ? item.profile : avatarPlaceholderImage} alt="user3" />
            </div>
            <div className="flex-1 relative ">
              <h3 className="font-medium text-primaryColor-900 text-lg sm:text-sm">{item.name}</h3>
              <p className="text-primaryColor-900 text-base sm:text-xs line-clamp-2">{item?.Thank}</p>
            </div>
            <div className="flex items-center text-grey-800 text-xs mb-auto mt-[2px]">{item?.time}</div>
          </div>
        );
      })}
    </>
  );
};

export default ChatUserCard;
