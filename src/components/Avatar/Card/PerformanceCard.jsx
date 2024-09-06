export default function PerformanceCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col  items-center p-2 w-[24%] sm:w-[47%]">
      <div className="my-5">
        <img src={icon} alt={icon} className="w-[50px]" />
      </div>
      <div className="text text-center">
        <h1 className="text-3xl sm:text-lg">{title}</h1>
        <p className="font-semibold sm:text-sm">{desc}</p>
      </div>
    </div>
  );
}
