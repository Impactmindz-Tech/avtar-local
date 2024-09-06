import TitleHeading from "@/components/Avatar/Heading/TitleHeading";
import HeaderBack from "@/components/HeaderBack";
import Images from "@/constant/Images";
import { Link } from "react-router-dom";

function AddNewExperienceNewPage() {
  return (
    <div className="px-4">
      <HeaderBack link="/avatar/add-experience" text={"Add Experience"} />

      <TitleHeading title={"Add Experience Images"} />

      <div className="flex justify-between my-4  flex-wrap sm:gap-4">
        <div className="border rounded-lg p-10 w-[49%] bg-[#f2f2f2] border-[#e2e2e2] sm:w-[100%]">
          <div className="flex justify-center">
            <Link to="/avatar/add-experience-image">
              <img
                src={Images.add}
                alt="add"
                className="w-10 h-10 cursor-pointer"
              />
            </Link>
          </div>
          <h1 className="text-center text-grey-900 py-2 font-semibold">
            Main Image
          </h1>
        </div>

        <div className="border rounded-lg p-10 w-[49%] bg-[#f2f2f2] border-[#e2e2e2] sm:w-[100%]">
          <div className="flex justify-center">
            <Link to="/avatar/add-experience-image">
              <img
                src={Images.add}
                alt="add"
                className="w-10 h-10 cursor-pointer"
              />
            </Link>
          </div>
          <h1 className="text-center text-grey-800 py-2 font-semibold hover:text-grey-900">
            Other Image
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AddNewExperienceNewPage;
