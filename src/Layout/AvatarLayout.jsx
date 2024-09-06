import MobileNavigation from "@/components/mobile_navigation/MobileNavigation";
import Header from "@/components/UserHeader/Header";

const AvatarLayout = ({ children }) => {
  return (
    <div className="container px-4 sm:px-0 lg:max-w-full md:pb-[100px] sm:pb-[70px]">
      <Header />
      {children}
      <MobileNavigation role="avatar" />
    </div>
  );
};

export default AvatarLayout;
