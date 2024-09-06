import Images from "@/constant/Images";
import { useState } from "react";
import { Link } from "react-router-dom";
function UserTopSearch({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="flex gap-2 items-center px-4 sm:px-0 my-2 user-top-search">
      <div className="relative flex-1">
        <div className="bg-backgroundFill-900 flex absolute top-1 right-1 p-2.5 rounded-full">
          <img src={Images.search} alt="search Icon" />
        </div>
        <input
          type="search"
          onChange={handleInputChange}
          name="search bar"
          id="search bar"
          className="inputRounded rounded-full"
          placeholder="Search..."
        />
      </div>
      <div className="border  border-[#cccccc] w-[50px] h-[50px] p-2 rounded-full flex items-center justify-center">
        <Link to="/user/filters">
          <img
            src={Images.setting}
            alt="setting icon"
            className="cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}

export default UserTopSearch;
