import PerformanceCard from "@/components/Avatar/Card/PerformanceCard";
import HeaderBack from "@/components/HeaderBack";
import Images from "@/constant/Images";

function PerformancePage() {
  return (
    <div className="px-4">
      <HeaderBack link="/avatar/profile" text={"Your Performances"} />
      <div className="my-5 flex gap-2 justify-between flex-wrap">
        <PerformanceCard
          icon={Images.maploc}
          title={"14"}
          desc={"Total Tours"}
        />
        <PerformanceCard
          icon={Images.globe}
          title={"02"}
          desc={"Cancel Tours"}
        />
        <PerformanceCard
          icon={Images.mapBlack}
          title={"01"}
          desc={"Today’s Tour"}
        />
        <PerformanceCard
          icon={Images.starBlack}
          title={"4.3"}
          desc={"Average Rating"}
        />
      </div>
    </div>
  );
}

export default PerformancePage;
