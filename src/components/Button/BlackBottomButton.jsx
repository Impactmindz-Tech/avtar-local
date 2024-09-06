import { Link } from "react-router-dom";

const BlackBottomButton = ({ link, text }) => {
  return (
    <Link to={link} className="block my-6">
      <button className="py-3 font-bold w-full rounded-md bottom-1 m-auto left-0 right-0 p-2 cursor-pointer bg-backgroundFill-900 text-white text-center">
        {text}
      </button>
    </Link>
  );
};

export default BlackBottomButton;
