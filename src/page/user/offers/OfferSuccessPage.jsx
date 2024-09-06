import Images from "@/constant/Images";

function OfferSuccessPage() {
  return (
    <div className="container">
      {/* <OnlyBrandNameHeader text={"Payment Status"} /> */}
      <div className="max-w-2xl m-auto ">
        <div>
          {/* success */}
          <div className="main h-[90vh] flex flex-col justify-center">
            <div className="flex justify-center items-center ">
              <img src={Images.paymentSuccess} alt="paymentSuccess" className="w-[150px] " />
            </div>
            <h1 className="text-center text-success pt-5">Your offer Successful Sent</h1>
            <p className="text-grey-800 text-center py-3">Your offer has been sent waiting for avatar to accept.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferSuccessPage;
