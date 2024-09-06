import ChatAndSupportCard from "@/components/Cards/ChatAndSupport/ChatAndSupportCard";
import HeaderBack from "@/components/HeaderBack";

function ChatAndSupport() {
  const chatSupport = import.meta.env.VITE_APP_CHATANDSUPPORT;
  return (
    <div className="container relative">
      <HeaderBack link="/user/profile" text={"Chat with Support"} />

      <div className="main">
        <ChatAndSupportCard
          title={"What is Avator Walk?"}
          desc={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          }
        />
        <ChatAndSupportCard
          title={"What is Avator Walk?"}
          desc={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          }
        />
        <ChatAndSupportCard
          title={"What is Avator Walk?"}
          desc={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          }
        />
      </div>

      <div className="my-10">
        <button className="border border-grey-900 text-grey-900 py-4 font-bold rounded md:text-sm w-full">
          Cancel
        </button>

        <a href={chatSupport} className="w-full block my-2">
          <button className="bg-grey-900 text-white py-4 font-bold rounded md:text-sm w-full">
            Still Need Help ?
          </button>
        </a>
      </div>
    </div>
  );
}

export default ChatAndSupport;
