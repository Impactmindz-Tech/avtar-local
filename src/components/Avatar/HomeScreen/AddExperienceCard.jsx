import Images from "@/constant/Images";
import TitleHeading from "../Heading/TitleHeading";
import { Link } from "react-router-dom";

export default function AddExperienceCard() {
  return (
    <Link to="/avatar/add-experience">
      {" "}
      <div className="py-2">
        <TitleHeading title={"Add Experience"} />
        <div className="rounded-2xl my-2 px-6 py-4 bg-backgroundFill-900 flex justify-around items-center sm:p-3">
          <div className="text flex-1">
            <h3 className="text-white">Add New Experience</h3>
            <p className="text-grey-800 sm:text-xs">
              Click on the card to add new experience
            </p>
          </div>
          <div className="bg-white flex justify-center items-center rounded-md p-3 cursor-pointer">
            <img src={Images.add} alt="add" />
          </div>
        </div>
      </div>
    </Link>
  );
}
