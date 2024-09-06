import Images from "@/constant/Images";

const EditExperienceCard = ({ imageURL, onRemove }) => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div className="bg-grey-900 rounded-full p-2 absolute -top-2 -right-2 cursor-pointer border-4 border-white sm:p-1 sm:border-2">
        <img
          src={Images.closeWhite}
          alt="close"
          className="w-5 h-5 sm:h-2 sm:w-2"
          onClick={onRemove}
        />
      </div>
      <img
        src={imageURL}
        alt="Experience"
        className="w-full object-cover rounded-lg aspect-video"
      />
    </div>
  );
};

export default EditExperienceCard;
