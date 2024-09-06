const ReportsCard = ({ image, title }) => {
  return (
    <div className="reports-card flex gap-[10px] border p-2">
      <div className="r-c-image w-1/3">
        <img
          className="aspect-square object-cover"
          src="https://res.cloudinary.com/dzmy6os8w/image/upload/v1724669188/uploads/file_1724669188379.jpg"
          alt=""
        />
      </div>
      <div className="r-c-text w-2/3">
        <h4 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h4>
        <div className="r-c-buttons flex gap-[4px] mt-2">
          <button className="bg-[#ff5454] pt-[2px] pb-[4px] text-white rounded-lg px-[10px]">
            Listening
          </button>
          <button className="bg-[#ff5454] pt-[2px] pb-[4px] text-white rounded-lg px-[10px]">
            Block
          </button>
          <button className="bg-[#ff5454] pt-[2px] pb-[4px] text-white rounded-lg px-[10px]">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsCard;
