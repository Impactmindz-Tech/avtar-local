import HeaderBack from "@/components/HeaderBack";
import Loader from "@/components/Loader";
import { formatTime } from "@/constant/date-time-format/DateTimeFormat";
import Images from "@/constant/Images";
import {
  ChatMessageGetByConversationIdApi,
  sendMessageApi,
} from "@/utills/service/userSideService/ChatService";
import socket from "@/utills/socket/Socket";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const ChatUser = () => {
  const [loader,setLoader]=useState(false)
  const params = useParams();
  const location = useLocation();
  const [name, setName] = useState(location?.state?.item);
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [messages, setMessages] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const simpleBarRef = useRef(); // Ref for SimpleBar
  const containRef = useRef(); // Ref for the message container

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user?._id);

      const handleIncomingMessage = (data) => {
        if (data.receiverId === user?._id) {
          toast(`New message from ${data.user.fullname}: ${data.message}`, {
            duration: 6000,
          });
        }
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: data.user, message: data.message },
        ]);
      };

      socket.on("getMessage", handleIncomingMessage);

      return () => {
        socket.off("getMessage", handleIncomingMessage);
      };
    }
  }, [socket, user?._id]);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    socket.emit("sendMessage", {
      conversationId: selectedConversationId || "new",
      senderId: user?._id || "",
      message: inputMessage,
      receiverId: params?.id,
    });

    const body = {
      conversationId: selectedConversationId || "new",
      senderId: user?._id,
      message: inputMessage,
      receiverId: params?.id,
    };

    setInputMessage("");

    try {
      const response = await sendMessageApi(body);
      if (response?.message === "message sent successfully") {
        console.log("Message sent successfully");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [inputMessage, socket, selectedConversationId, user?._id, params?.id]);

  const fetchMessages = useCallback(async () => {
    const conversationId = "new";
    const body =
      conversationId === "new"
        ? { senderId: user?._id, receiverId: params?.id }
        : {};

    try {
      setLoader(true)
      const response = await ChatMessageGetByConversationIdApi(
        conversationId,
        body.senderId,
        body.receiverId
      );
      if (response?.isSuccess) {
        setMessages(response.messages || []);
        setSelectedConversationId(response?.conversationId || "");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    finally{
      setLoader(false)

    }
  }, [user?._id, params?.id]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (simpleBarRef.current) {
      // Scroll to the bottom of the chat when messages change
      simpleBarRef.current.getScrollElement().scrollTop =
        simpleBarRef.current.getScrollElement().scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Reset messages when user ID or conversation changes
    setMessages([]);
  }, [params?.id]);

  return (
    <>
    {loader&&<Loader />}
    <div className="container chat-with-user">
      <HeaderBack link="/avatar/chat" text={name?.name} />
      <div className="m-auto h-[80vh] sm:h-[72vh] relative px-[10px]">
        <SimpleBar
          ref={simpleBarRef}
          className="h-[70vh] sm:h-[62vh]" // SimpleBar wrapper
        >
          <div ref={containRef} className="w-full py-2 flex flex-col">
            <div className="child h-full text-center">
              <div className="rounded-lg bg-boxFill-900 text-grey-800 inline-block p-2 leading-none sm:py-1 sm:text-xs">
                Today
              </div>
            </div>

            {messages.map(({ message, user: { id } = {} }, index) => {
              const isCurrentUser = id === user?._id;
              return (
                <div
                  key={index}
                  className={`pt-[10px] ${
                    isCurrentUser ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`max-w-[55%] sm:max-w-[80%] inline-block sm:text-sm p-3 ${
                      isCurrentUser
                        ? "bg-primary text-white rounded-b-lg rounded-tl-xl ml-auto"
                        : "bg-secondary rounded-b-lg"
                    }`}
                  >
                    {message}
                  </div>
                  <p className="text-grey-800 mt-1 text-xs leading-none">
                    {formatTime(new Date())}
                  </p>
                </div>
              );
            })}
          </div>
        </SimpleBar>
        <div className="absolute bottom-0 left-0 w-full h-20 sm:h-auto gap-2 flex justify-between items-center">
          <div className="relative flex-1">
            <input
              type="text"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Send message..."
              className="p-3 px-5 w-full bg-boxFill-900 rounded-md outline-none"
            />
          </div>

          <div
            onClick={sendMessage}
            className="bg-backgroundFill-900 rounded-md cursor-pointer p-3 sm:w-[15%] w-[8%] flex justify-center items-center"
          >
            <img src={Images.sendIcon} alt="send icon" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatUser;
