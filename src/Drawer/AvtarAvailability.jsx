import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimezoneSelect from "react-timezone-select";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Drawer } from "@mui/material";
import { avtarAvailableApi, getAvailableApi } from "@/utills/service/avtarService/AddExperienceService";
import { formatTimeToHHMM } from "@/constant/date-time-format/DateTimeFormat";

const AvtarAvailability = ({ avalibility, setAvaability }) => {
  const [loader, setLoader] = useState(false);
  const [formValues, setFormValues] = useState({
    from: "",
    to: "",
    timeZone: "",
  });

  const [errors, setErrors] = useState({
    from: "",
    to: "",
    timeZone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAvailableApi();
      if (res?.isSuccess) {
        const data = res.data;

        // Convert 'from' and 'to' to the 'HH:MM' format
        const fromTime = formatTimeToHHMM(data.from);
        const toTime = formatTimeToHHMM(data.to);

        setFormValues({
          from: fromTime || "",
          to: toTime || "",
          timeZone: {
            value: data.timeZone || "",
            offset: parseFloat(data.timeahead) || 0,
          },
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTimezoneChange = (selectedTimezone) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      timeZone: selectedTimezone,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const [fromHours] = formValues.from.split(":");
    const [toHours] = formValues.to.split(":");

    if (!formValues.from) newErrors.from = "From field is required.";
    if (!formValues.to) newErrors.to = "To field is required.";
    if (!formValues.timeZone) newErrors.timeZone = "Time Zone field is required.";

    if (parseInt(fromHours) >= parseInt(toHours)) {
      newErrors.to = "'To' time must be after 'From' time.";
    }

    setErrors(newErrors);
    Object.values(newErrors).forEach((error) => toast.error(error));

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const ZoneHead = formValues.timeZone.offset.toString();
      const formData = {
        from: formValues.from,
        to: formValues.to,
        timeahead: ZoneHead,
        timeZone: formValues.timeZone.value,
      };
      try {
        setLoader(true);
        const response = await avtarAvailableApi(formData);
        setLoader(false);
        if (response?.isSuccess) {
          toast.success(response?.message);
          setAvaability(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {loader && <Loader />}
      <Drawer anchor="right" open={avalibility} onClose={() => setAvaability(false)}>
        <div className="px-10 py-10 min-lg:w-[40vw] sm:w-[280px] sm:max-w-none sm:px-4">
          <h1 className="text-center">Avtar Available</h1>
          <div className="grid gap-4 py-4">
            <form onSubmit={onSubmit}>
              <div className="mt-2">
                <div className="py-2 rounded-md">
                  <h3 className="font-normal mb-2">From</h3>
                  <div className="grid w-full items-center gap-1.5">
                    <input type="time" id="from" name="from" value={formValues.from} onChange={handleChange} className="outline-none border border-[#ccc] p-2 rounded-md w-full" />
                  </div>
                  {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
                </div>
              </div>

              <div className="my-4">
                <div className="py-2 rounded-md">
                  <h3 className="font-normal mb-2">To</h3>
                  <input type="time" id="to" name="to" value={formValues.to} onChange={handleChange} className="outline-none border border-[#ccc] p-2 rounded-md w-full" />
                  {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor="timeZone" className="mb-2 block">
                  Time Zone
                </label>
                <TimezoneSelect value={formValues.timeZone} onChange={handleTimezoneChange} className="outline-none border border-[#ccc] p-2 rounded-md w-full" />
                {errors.timeZone && <p className="text-red-500 text-sm">{errors.timeZone}</p>}
              </div>

              <Button className="mt-10" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AvtarAvailability;
