import { Link } from "react-router-dom";

const AvatarBottomBtn = ({ text, link }) => {
  return (
    <Link to={link}>
      {" "}
      <div className="fixed bottom-1 left-0  w-full">
        <div className="container">
          <div className="w-full flex justify-center">
            <button className="font-bold lg:w-[90%] p-3 bg-backgroundFill-900 rounded-md text-white w-full">{text}</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AvatarBottomBtn;
