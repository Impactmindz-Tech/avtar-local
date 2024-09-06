import Images from "@/constant/Images";
import IconText from "../Heading/IconText";
import { Link, useNavigate } from "react-router-dom";

export default function OffersCard({ state, item }) {
  const navigate = useNavigate();

  const handleRouting = (item) => {
    if (!state) {
      navigate(`/avatar/offers/` + item?.id);
    }
  };
  return (
    <div className="squareShadow p-5 text-grey-900" onClick={() => handleRouting(item)}>
      <h1 className="text-2xl">${item?.totalPrice}</h1>
      <h2 className="font-bold">
        {item?.ExperienceName}, {item?.Country}
      </h2>
      {state ? "" : <IconText icon={Images.multiUser} text={item?.UserName} />}
      <IconText icon={Images.clock} text={`${item?.Duration} , Minutes`} />
      <IconText icon={Images.location} text={`${item?.Country} , ${item?.ZipCode}`} />
    </div>
  );
}
