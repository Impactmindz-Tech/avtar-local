import HeaderInstantLive from "@/components/header_instant_live/HeaderInstantLive";
import imageInstantLive from "../../assets/images/instant-live.jpg";
import LiveComments from "@/components/live_comments/LiveComments";

const InstantLive = () => {
  return (
    <div
      style={{ backgroundImage: `url(${imageInstantLive})` }}
      className="instant-live h-svh bg-no-repeat bg-cover z-[1] flex flex-col relative before:block before:absolute before:-inset-0 before:bg-black/10 before:z-[-1]"
    >
      <HeaderInstantLive />
      <LiveComments />
    </div>
  );
};

export default InstantLive;
