import RecordedCard from "@/components/Cards/Recorded/RecordedCard";
import HeaderBack from "@/components/HeaderBack";

function RecordedPage() {
  return (
    <div>
      <HeaderBack text="Recorded Experience" link={""} />
      <div className="my-5 grid grid-cols-4   lg:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 gap-4">
        <RecordedCard />
        <RecordedCard />
        <RecordedCard />
        <RecordedCard />
      </div>
    </div>
  );
}

export default RecordedPage;
