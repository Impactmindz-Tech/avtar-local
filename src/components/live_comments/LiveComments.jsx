import Images from "@/constant/Images";

const LiveComments = () => {
  return (
    <div className="live-comments mt-auto py-5 px-3 bg-gradient-to-t from-[#787878]/20 to-[#787878]/0">
      <div className="live-comments-wrap relative pr-[40%] md:pr-[20%] sm:pr-[100px]">
        <div className="live-comment flex flex-wrap mb-4">
          <div className="live-comment-image w-[50px] sm:w-[36px]">
            <img
              src={Images.imageUserTest}
              alt=""
              className="rounded-full w-full aspect-square object-cover"
            />
          </div>
          <div className="live-comment-text pl-[10px] text-white w-[calc(100%-50px)] sm:w-[calc(100%-36px)]">
            <h4 className="font-semibold text-lg sm:text-base line-clamp-1 drop-shadow-md leading-none mb-[10px] sm:mb-[6px]">
              Julian Wan
            </h4>
            <p className="text-sm sm:text-xs line-clamp-3 drop-shadow-md">
              Wow!
            </p>
          </div>
        </div>
        <div className="live-comment flex flex-wrap mb-4">
          <div className="live-comment-image w-[50px] sm:w-[36px]">
            <img
              src={Images.imageUserTest}
              alt=""
              className="rounded-full w-full aspect-square object-cover"
            />
          </div>
          <div className="live-comment-text pl-[10px] text-white w-[calc(100%-50px)] sm:w-[calc(100%-36px)]">
            <h4 className="font-semibold text-lg sm:text-base line-clamp-1 drop-shadow-md leading-none mb-[10px] sm:mb-[6px]">
              Julian Wan
            </h4>
            <p className="text-sm sm:text-xs line-clamp-3 drop-shadow-md">
              Donec bibendum dolor ut molestie interdum. In pharetra malesuada
              felis id sollicitudin. Quisque et sem vel dolor maximus feugiat id
              quis felis. Sed ultrices vehicula tortor sit amet egestas. Aliquam
              sed enim mattis lorem sollicitudin tristique sed quis mauris.
              Aenean eget lorem eget leo mollis sagittis. Fusce ornare a nibh eu
              posuere. Quisque tincidunt, quam eu blandit ultrices, nisl arcu
              efficitur augue, vitae aliquet nunc ligula at tellus. Cras diam
              purus, viverra eget libero et, feugiat commodo nisl. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Duis sit amet pharetra erat, a rhoncus arcu.
            </p>
          </div>
        </div>

        <span className="watching-live-count text-white inline-flex items-center gap-[5px] text-lg sm:text-base absolute top-auto left-auto bottom-0 right-0 leading-none">
          <img src={Images.iconEyeLight} alt="" />
          780
        </span>
      </div>
      <form>
        <input
          type="text"
          placeholder="Send message..."
          className="bg-[#E5E5E5]/30 border-2 px-4 placeholder-white font-medium border-[#E5E5E5]/40 rounded-full text-base sm:text-sm text-white w-full h-[46px]"
        />
      </form>
    </div>
  );
};

export default LiveComments;
