import { useEffect, useRef, useState } from "react";
import moment from "moment";
import Images from "@/constant/Images";
import socket from "@/utills/socket/Socket";
import {
  initClient,
  handleAuthClick,
  handleSignoutClick,
  createGoogleMeet,
  deleteGoogleMeet,
} from "../../meetConfig/googleCalender";
import { getLocalStorage } from "@/utills/LocalStorageUtills";
import { Link } from "react-router-dom";
const InstantLiveRequestModal = ({
  instantLiveModalState,
  setInstantLiveModalState,
  instanreq,
  role,
}) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setInstantLiveModalState();
    }
  };

  const userId = getLocalStorage("user")?._id;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [eventId, setEventId] = useState("");
  const [duration, setDuration] = useState(30); // Default duration 30 minutes
  const [startTime, setStartTime] = useState("");
  const [countdown, setCountdown] = useState("");
  const [isAccepted, setIsAccepted] = useState(false); // Track whether the request is
  const [meetActive, setMeetActive] = useState(false); // Track if the meeting is active
  const [meetWindow, setMeetWindow] = useState(null);

  const updateSignInStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);
  };

  useEffect(() => {
    initClient(updateSignInStatus);
  }, []);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const now = moment();
        const meetingStart = moment(startTime);
        const diff = meetingStart.diff(now);

        if (diff <= 0) {
          clearInterval(interval);
          setCountdown("Meeting is starting now!");
          createMeet();
          setMeetActive(true); // Activate the meeting and show the link
        } else {
          const hours = Math.floor(diff / 3600000);
          const minutes = Math.floor((diff % 3600000) / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setCountdown(`${hours} :: ${minutes} :: ${seconds}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  const createMeet = () => {
    const startDateTime = moment(startTime).toDate();
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    const event = {
      summary: "Google Meet",
      description: "One-on-one meeting",
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/Los_Angeles",
      },
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    };

    const endMeet = () => {
      if (eventId) {
        deleteGoogleMeet(eventId).then(() => {
          resetState();
        });
      }
    };

    createGoogleMeet(event).then((response) => {
      const meetUrl = response.result.hangoutLink;

      const eventId = response.result.id;
      const sendid = instanreq?.reqid;
      const expid = instanreq?.finddetails?._id;
      console.log(sendid, "jsdkfhkjds");
      socket.emit("sendMeet", {
        link: meetUrl,
        eventId: eventId,
        sendid: sendid,
        expid: expid,
      });

      setMeetLink(meetUrl);
      setEventId(eventId);

      const timer = setTimeout(() => {
        endMeet();
      }, duration * 60000);
    });
  };

  const resetState = () => {
    setMeetLink("");
    setEventId("");
    setCountdown("");
    setMeetActive(false);
  };

  const acceptinvite = () => {
    const date = new Date();
    const formattedDate = moment.utc(date).format("YYYY-MM-DDTHH:mm");
    console.log(formattedDate);
    setStartTime(formattedDate);
    handleAuthClick();
  };

  useEffect(() => {
    socket.emit("instantLive", userId);

    return () => {
      socket.emit("userOffline", userId);
      socket.off("instantLive");
    };
  }, [userId]);

  useEffect(() => {
    if (instantLiveModalState) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [instantLiveModalState]);

  if (!instantLiveModalState) return null;

  return (
    <div className="fixed top-0 flex items-start justify-center inset-0 bg-black bg-opacity-50 z-[99]">
      <div
        ref={modalRef}
        className="bg-white BoxShadowModalTop rounded-b-2xl px-7 shadow-lg w-full max-w-4xl xl:max-w-2xl lg:max-w-[90%] p-3 sm:px-2 sm:py-1"
      >
        {/*  */}

        <div className=" pb-2">
          <h1 className="text-center py-2">Instant Lives Request</h1>
          <div className="flex gap-4 p-4 sm:flex-wrap sm:px-2">
            <div className="sm:w-[100%] relative w-[30%]">
              <img
                src={instanreq?.finddetails?.thumbnail}
                alt="cardImageRounded"
                className="m-auto w-[90%] h-[110px] sm:w-full object-cover sm:h-[200px] rounded-lg"
              />
            </div>
            <div className="w-[80%] sm:w-[100%]">
              <h2 className="text-2xl font-bold  sm:text-sm">
                ${instanreq?.finddetails?.AmountsperMinute}
              </h2>
              <h2 className="text-lg font-bold  sm:text-sm">
                {instanreq?.finddetails?.ExperienceName}
              </h2>

              <div className="flex justify-between items-center gap-2 py-1">
                <div className="icon">
                  <img
                    src={Images.location2}
                    alt="location"
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex-1">
                  {instanreq?.finddetails?.city},
                  {instanreq?.finddetails?.country}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between m-auto w-[94%] py-2 text-grey-800">
            <button
              className="border border-primaryColor-900 text-black font-semibold py-2 rounded mr-2 w-[50%]"
              onClick={() => setInstantLiveModalState(false)}
            >
              {role === "avatar" ? "Deny" : "Cancel"}
            </button>
            {role === "avatar" ? (
              meetLink ? (
                <Link
                  className="bg-black text-white text-center py-2 rounded  w-[50%]"
                  to={meetLink}
                >
                  <button className="bg-black text-white py-2 rounded  w-[50%]">
                    Join{" "}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={acceptinvite}
                  className="bg-black text-white py-2 rounded  w-[50%]"
                >
                  Accept
                </button>
              )
            ) : (
              <Link
                className="bg-black text-white text-center py-2 rounded  w-[50%]"
                to={instanreq?.link}
              >
                <button className="bg-black text-white py-2 rounded  w-[50%]">
                  Join{" "}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantLiveRequestModal;
