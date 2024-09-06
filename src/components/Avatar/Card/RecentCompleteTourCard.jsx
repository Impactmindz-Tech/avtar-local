import Images from "@/constant/Images";

export default function RecentCompleteTourCard({ data }) {
  const bookingDate = new Date(data?.bookingDate);
  const formattedDate = bookingDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <div className="imgs lg:w-full">
        <img src={Images.cardImageRounded} alt="cardImageRounded" className="w-[150px] object-cover sm:h-[250px] lg:w-full" />
      </div>
      <div className="flex-1">
        <h1>
          {data?.experienceName}, {data?.country}
        </h1>
        <p>
          {data?.city && `${data.city},`} {data?.country}
        </p>
        <p>{formattedDate}</p>
      </div>
      <div className="dollar font-bold">${data?.totalPrice}</div>
    </div>
  );
}
