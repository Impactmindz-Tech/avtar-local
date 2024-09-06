const DeviceCard = ({ name, isSelected, onSelect }) => {
    return (
      <div
        className={`border-2 text-lg pl-4 py-3 my-2 rounded-sm cursor-pointer ${
          isSelected ? "bg-black text-white" : "hover:bg-black hover:text-white"
        }`}
        onClick={onSelect}
      >
        {name}
      </div>
    );
  };
  
  export default DeviceCard;
  