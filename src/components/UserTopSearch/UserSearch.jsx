import Images from "@/constant/Images";
function UserSearch({ onsearch }) {
  const handlechange = (e) => {
    const newvalue = e.target.value;
    onsearch(newvalue);
  };
  return (
    <div className="flex items-center w-full my-5 user-top-search">
      <div className="relative w-full">
        <div className="bg-backgroundFill-900 flex absolute top-1 right-1 p-2.5 rounded-full">
          <img src={Images.search} alt="search Icon" />
        </div>
        <input
          type="search"
          name="search bar"
          onChange={handlechange}
          id="search bar"
          className="inputRounded rounded-full"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default UserSearch;
