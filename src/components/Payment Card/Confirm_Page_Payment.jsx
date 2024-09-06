import Images from "@/constant/Images";

const Confirm_Page_Payment = ({ selectedMethod, setSelectedMethod, onchangemethod }) => {
  const handleselectmethod = (e) => {
    const method = e.target.value;
    setSelectedMethod(method);
  };

  return (
    <form className="BoxShadowLessRounded m-auto py-2 px-4">
      <h2 className="text-lg font-medium my-2">Pay with</h2>

      <div className="space-y-4 mb-4">
        <label className={`payment-option flex items-center justify-between p-4 border rounded-lg cursor-pointer ${selectedMethod === "paypal" ? "active" : ""}`}>
          <div className="flex items-center">
            <img src={Images.paypal} alt="PayPal" className="w-6 h-6 mr-2 object-contain" />
            <span className="text-sm font-semibold">PayPal</span>
          </div>
          <input type="radio" name="paymentMethod" value="paypal" onChange={handleselectmethod} className="hidden" />
          <div className="custom-radio"></div>
        </label>
        <label className={`payment-option flex items-center justify-between p-4 border rounded-lg cursor-pointer ${selectedMethod === "stripe" ? "active" : ""}`}>
          <div className="flex items-center">
            <img src={Images.logoStripe} alt="Apple Pay" className="w-6 h-6 mr-2 object-contain" />
            <span className="text-sm font-semibold">Stripe</span>
          </div>
          <input type="radio" name="paymentMethod" value="stripe" defaultChecked={true} onChange={handleselectmethod} className="hidden" />
          <div className="custom-radio"></div>
        </label>
      </div>
      <div className="hidden">
        <div className="py-4">
          <div className="flex items-center justify-between my-4">
            <h2 className="text-sm font-medium mb-2">Platinum Card</h2>
            <div className="flex items-center gap-1">
              <img src={Images.camera} alt="camera" />
              <h4 className="font-medium">Scan Card</h4>
            </div>
          </div>

          <div className="cardNumber relative">
            <div className="absolute top-3 right-2">
              <img src={Images.cardsGateway} alt="cardsGateway" className="" />
            </div>
            <input type="text" placeholder="Card number" className="inputGrayColor" />
          </div>
        </div>

        <div className="flex gap-1">
          {/* month */}

          <div className="cardNumber w-[50%]">
            <input type="text" placeholder="MM / YY" className="inputGrayColor" />
          </div>
          {/* cvv */}
          <div className="cardNumber relative w-[50%]">
            <div className="absolute top-4 right-3">
              <img src={Images.cvv} alt="cvv" />
            </div>
            <input type="text" placeholder="CVC" className="inputGrayColor" />
          </div>
        </div>

        <div className="mt-5 ">
          <label className="block text-sm font-medium mb-2">Billing Address</label>
          <select className="inputGrayColor">
            <option>United States</option>
          </select>
          <input type="text" placeholder="ZIP Code" className="inputGrayColor mt-3" />
        </div>
      </div>
    </form>
  );
};

export default Confirm_Page_Payment;
