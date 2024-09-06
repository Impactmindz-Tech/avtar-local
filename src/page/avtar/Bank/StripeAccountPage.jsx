import AvatarBottomBtn from "@/components/Avatar/Button/AvatarBottomBtn";
import HeaderBack from "@/components/HeaderBack";
import Loader from "@/components/Loader";
import {
  AddstripeApi,
  fetchstripeApi,
} from "@/utills/service/avtarService/Earnings";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function StripeAccountPage() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    const body = {
      StripeEmail: email,
    };

    try {
      const res = await AddstripeApi(body);
      if (res?.isSuccess) {
        toast.success(res?.message || "Account added/updated successfully.");
      } else {
        toast.error(res?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchstripe = async () => {
      try {
        const res = await fetchstripeApi();
        console.log(res);
        if (res?.isSuccess) {
          setEmail(res?.data?.stripeEmail);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchstripe();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="container">
        <HeaderBack link="/avatar/bank" text={"Stripe Account"} />
        <div className="mt-5">
          <label htmlFor="account">Add Stripe Account</label>
          <input
            type="email"
            id="account"
            className="input mt-2"
            value={email}
            placeholder="Eg. rohansharma@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          {/* <AvatarBottomBtn text={"Add/Update Account"} /> */}
          <div className="fixed bottom-1 left-0 w-full sm:bottom-[70px] md:bottom-[100px]">
            <div className="container">
              <div className="w-full flex justify-center">
                <button
                  onClick={handleClick}
                  className={`font-bold lg:w-[90%] md:w-full p-3 bg-backgroundFill-900 rounded-md text-white w-full`}
                >
                  {email ? "Update Account" : "Add Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StripeAccountPage;
