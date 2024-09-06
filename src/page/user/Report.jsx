import React, { useState } from "react";
import HeaderBack from "@/components/HeaderBack";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { reportBookingApi } from "@/utills/service/userSideService/userService/UserHomeService";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

function Report() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [reportData, setReportData] = useState({
    SexualContent: false,
    VoilentContent: false,
    AbusiveContent: false,
    DangerousContent: false,
    SpamContent: false,
  });

  const handleCheckboxChange = (id, checked) => {
    setReportData((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const response = await reportBookingApi(params.id, reportData);
      setLoader(false);
      if (response?.isSuccess) {
        toast.success(response?.message);
        navigate("/user/book-experience/" + params.id);
      }
      console.log("API response: ", response);
    } catch (error) {
      console.error("API error: ", error);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="container">
        <HeaderBack link="/user/book-experience" text={"Report"} />
        <div className="text-center mt-4">
          <p className="text-grey-800 sm:text-left">
            Do you think this package shouldn&apos;t be on Avatar Walk? Let us
            know your thoughts.
          </p>

          <div className="flex justify-center sm:justify-start items-center py-4 m-auto">
            <div className="flex flex-col items-start space-y-4 p-4 rounded sm:pl-0">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="SexualContent"
                  checked={reportData.SexualContent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("SexualContent", checked)
                  }
                />
                <Label htmlFor="SexualContent" className="reportCheckBox">
                  Sexual Content
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="VoilentContent"
                  checked={reportData.VoilentContent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("VoilentContent", checked)
                  }
                />
                <Label htmlFor="VoilentContent" className="reportCheckBox">
                  Violent or Repulsive Content
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="AbusiveContent"
                  checked={reportData.AbusiveContent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("AbusiveContent", checked)
                  }
                />
                <Label htmlFor="AbusiveContent" className="reportCheckBox">
                  Hateful or Abusive Content
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="DangerousContent"
                  checked={reportData.DangerousContent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("DangerousContent", checked)
                  }
                />
                <Label htmlFor="DangerousContent" className="reportCheckBox">
                  Harmful or Dangerous Acts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="SpamContent"
                  checked={reportData.SpamContent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("SpamContent", checked)
                  }
                />
                <Label htmlFor="SpamContent" className="reportCheckBox">
                  Spam or Misleading
                </Label>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-1 left-0  w-full "
          onClick={handleSubmit}
        >
          <div className="w-full flex justify-center">
            <button className="font-bold lg:w-[90%] p-3 bg-backgroundFill-900 rounded-md text-white w-[40%]">
              Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
