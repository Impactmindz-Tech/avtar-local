import ReportsCard from "@/components/Avatar/Card/ReportsCard";
import HeaderBack from "@/components/HeaderBack";

const Reports = () => {
  return (
    <div className="container">
      <HeaderBack link="/avatar/profile" text={"Reports"} />
      <div className="grid grid-cols-3 2xl:grid-cols-2 lg:grid-cols-1 mt-5 gap-4 my-2">
        <ReportsCard />
      </div>
    </div>
  );
};

export default Reports;
