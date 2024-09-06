import CardThreeSection from "@/components/Avatar/Card/CardThreeSection";
import HeaderBack from "@/components/HeaderBack";
import Images from "@/constant/Images";

function BankAccountPage() {
  return (
    <div className="container">
      <HeaderBack link="/avatar/profile" text={"Bank Account"} />
      <CardThreeSection icon={Images.Stripe} link={"/avatar/stripe"} title={"Stripe Account"} desc={"Click on arrow to add/update your account information."} circle={true} />
    </div>
  );
}

export default BankAccountPage;
