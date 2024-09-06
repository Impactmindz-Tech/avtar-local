const PerformanceCard = ({ item }) => {
  return (
    <div className="bg-backgroundFill-900 text-center p-4 rounded-xl relative sm:p-2">
      {item?.info !== 0 && <div className="absolute -top-4 right-0  bg-[#FF7070] rounded-full text-white px-2 py-1 font-bold border-2 border-white">+{item?.info}</div>}

      <h1 className="text-white">{item.info}</h1>
      <p className="text-grey-800 sm:leading-5 sm:text-xs">{item.name}</p>
    </div>
  );
};

export default PerformanceCard;
