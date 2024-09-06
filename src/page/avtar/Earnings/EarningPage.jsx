import RecentCompleteTourCard from "@/components/Avatar/Card/RecentCompleteTourCard";
import { EarningChart } from "@/components/Avatar/Chart/EarningChart";
import HeaderBack from "@/components/HeaderBack";
import Loader from "@/components/Loader";
import {
  avatarEarningApi,
  fetchstripeApi,
  withdrawAmountApi,
} from "@/utills/service/avtarService/Earnings";
import { experienceGetrequestsApi } from "@/utills/service/experienceService/ExperienceService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Images from "@/constant/Images";

function EarningPage() {
  const [amountDetail, setAmountDetails] = useState(null);
  const [CompleteExperince, setCompleteExperince] = useState([]);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");

  const fetchstripe = async () => {
    try {
      const res = await fetchstripeApi();
      console.log(res, "ttttttt");
      if (res?.isSuccess) {
        setEmail(res?.data?.stripeEmail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const avatarEarning = async () => {
    try {
      const response = await avatarEarningApi();
      setAmountDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawAmount = () => {
    const body = {
      StripeEmail: email,
      amount: amountDetail?.totalEarnings,
    };
    try {
      // const response = withdrawAmountApi(body);
      // console.log(response);
      toast.error(
        "StripeInvalidRequestError: Your destination account needs to have at least one of the following capabilities enabled: transfers, crypto_transfers, legacy_payments"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const experienceGetrequests = async () => {
    const status = "Completed";
    try {
      setLoader(true);
      const response = await experienceGetrequestsApi(status);
      if (response?.isSuccess) {
        setCompleteExperince(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchstripe();
    experienceGetrequests();
    avatarEarning();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="px-4">
        <HeaderBack link="/avatar/profile" text={"Your Earnings"} />

        <div
          className="flex justify-between items-center mt-4 p-3 rounded-lg border border-slate-200 mb-6"
          style={{ boxShadow: "0 0 8px rgba(0,0,0,.08)" }}
        >
          <div className="left">
            <p className="text-grey-800">Withdraw Balance</p>
            <h1 className="text-grey-900 text-2xl">
              ${amountDetail?.totalEarnings}
            </h1>
          </div>
          <div className="right" onClick={withdrawAmount}>
            {/* <Link to="/avatar/instant-cash"> */}
            <button className="bg-grey-900 rounded-md px-8 py-4 text-white font-bold sm:py-2 sm:px-6 lg:py-3 lg:px-7">
              Withdraw
            </button>
            {/* </Link> */}
          </div>
        </div>

        <div className="chart my-8">
          <EarningChart />
        </div>
        <div className="bg-[#F9F9F9] p-4 rounded-lg">
          <div className="text-center my-2 bg-[#ffffff] p-3 rounded-lg mb-4 relative">
            <img
              src={Images.pattern}
              alt="pattern"
              className="absolute bottom-0 right-0"
            />
            <img
              src={Images.pattern}
              alt="pattern"
              className="absolute top-0 left-0 rotate-180"
            />
            <h1>$380.00</h1>
            <p>Total Earnings</p>
          </div>
          <div className="anatical">
            <h1>Analytics</h1>
            <div className="flex justify-between items-center my-2">
              <p>Earnings in (This Month)</p>
              <h1 className="sm:text-base">
                ${amountDetail?.thisMonthEarnings}
              </h1>
            </div>
            {/* <div className="flex justify-between items-center my-2">
          <p>Upcoming Experience</p>
          <h1 className="sm:text-base">$00.00</h1>
        </div> */}
            <div className="flex justify-between items-center my-2">
              <p>Completed Tours</p>
              <h1 className="sm:text-base">{amountDetail?.completedTours}</h1>
            </div>
            {/* <div className="flex justify-between items-center my-2">
          <p>Average Experience Charges</p>
          <h1 className="sm:text-base">$05.00</h1>
        </div> */}
            <div className="flex justify-between items-center my-2">
              <p>Available for Withdraw</p>
              <h1 className="sm:text-base">${amountDetail?.totalEarnings}</h1>
            </div>
          </div>

          <div className="mt-6">
            <h1>Revenue</h1>
            {/* <div className="flex justify-between items-center my-2">
          <p>Earning Till Date</p>
          <h1 className="sm:text-base">$38000</h1>
        </div> */}
            <div className="flex justify-between items-center my-2">
              <p>Today’s Earning</p>
              <h1 className="sm:text-base">${amountDetail?.todayEarnings}</h1>
            </div>
          </div>
        </div>

        <div className="my-9">
          <h1>Recent Completed Tours</h1>
          {CompleteExperince.length !== 0 ? (
            <>
              <div className="my-5 grid grid-cols-4 2xl:grid-cols-3  lg:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 gap-4">
                {CompleteExperince.map((item) => {
                  return <RecentCompleteTourCard data={item} key={item._id} />;
                })}
              </div>
            </>
          ) : (
            <h1>No Recent Completed Tours</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default EarningPage;
