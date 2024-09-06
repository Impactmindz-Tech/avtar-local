import { handleBookingRequestApi, createmeeting, refundsApi } from "@/utills/service/avtarService/AddExperienceService";
import { Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import Images from "@/constant/Images.js";
import { formatDate, formatTime, difference } from "@/constant/date-time-format/DateTimeFormat";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { initClient, handleAuthClick, handleSignoutClick, createGoogleMeet, deleteGoogleMeet } from "../../../meetConfig/googleCalender.js";
import socket from "@/utills/socket/Socket.js";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { usePeer } from "@/utills/socket/PeerProvider.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setRoomId, setStream } from "@/store/slice/videoSlice.js";

const RequestedCard = ({ item, getRequests, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserID] = useState("");
  const [avId, setAvId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [eventId, setEventId] = useState("");
  const [duration, setDuration] = useState(30); // Default duration 30 minutes
  const [startTime, setStartTime] = useState("");
  const [countdown, setCountdown] = useState("");
  const [isAccepted, setIsAccepted] = useState(false); // Track whether the request is accepted
  const [meetActive, setMeetActive] = useState(false); // Track if the meeting is active
  const [activebuttonDisable, setactivebuttonDisable] = useState(false);
  const [meetWindow, setMeetWindow] = useState(null);
  const dispatch = useDispatch();

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
          setCountdown("Lets start the Meeting");
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

  const acceptOffer = async (status, item) => {
    const body = {
      action: status,
    };
    const reqdata = {
      userId: item?.userId,
      startTime: item?.bookingTime,
      ReqId: item?.reqId,
      endTime: item?.endTime,
      duration: duration,
    };

    const newData = {
      ...body,
      reqdata,
    };

    setUserID(item?.userId);
    setAvId(item?.avatarId);

    if (status == "accept") {
      try {
        const response = await handleBookingRequestApi(item?.reqId, body);
        if (response?.isSuccess) {
          setactivebuttonDisable(true);
          getRequests("Requested");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("put canscel api");
    }
  };

  return (
    <section>
      <div>
        <div className="BoxShadowLessRounded pb-2">
          <div className="flex gap-4 sm:gap-0 p-4 sm:flex-wrap sm:items-stretch sm:p-2">
            <div className="w-[30%] relative">
              <img src={item?.experienceImage} alt="cardImageRounded" className="w-full object-cover h-full rounded-lg" />
              {role === "avatar" && <div className="absolute bottom-2 right-1 px-2 rounded-full font-bold bg-white sm:text-sm sm:bottom-2">${item?.totalPrice}</div>}
            </div>

            <div className="w-[70%] sm:pl-3">
              {location.pathname === "/user/experience" && (
                <div className="flex justify-between">
                  <div className="text-[#f5c00a] bg-[#fff9e6] p-1 px-6 pb-2 sm:px-4 sm:p-1 rounded-full text-sm font-medium">{item?.status}</div>
                </div>
              )}
              <h2 className="text-lg font-bold sm:text-sm mt-2 sm:mt-1 line-clamp-2">
                {item?.experienceName}, {item?.country}
              </h2>

              <div className="flex justify-between items-center gap-2 py-1 sm:py-[2px] sm:text-xs">
                <div className="icon">
                  <img src={Images?.location} alt="location" className="w-5 h-5 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1">
                  {item?.city && item?.city + ","} {item?.country}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 py-1 sm:py-[2px] sm:text-xs">
                <div className="icon">
                  <img src={Images.calendarIcon} alt="calendarIcon" className="w-5 h-5 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1">{formatDate(item?.bookingDate)}</div>
              </div>
              <div className="flex items-center gap-2 py-1 sm:py-[2px] sm:text-xs">
                <div className="icon">
                  <img src={Images.clock} alt="calendarIcon" className="w-5 h-5 sm:w-3 sm:h-3" />
                </div>
                <div className="flex-1">
                  {formatTime(item?.bookingTime)} - {formatTime(item?.endTime)}
                </div>
              </div>
            </div>
          </div>

          {location.pathname === "/user/experience" && (
            <div className="flex justify-between ps-3 pe-3 border-t border-[#F1F1F1] pt-2 pb-1">
              {/* <hr /> */}
              <p className="text-[#aaaaab] font-semibold">
                Avatar: <span className="font-normal">{item?.avatarName}</span>
              </p>
              <p className="text-[#aaaaab] font-semibold">${item?.totalPrice}</p>
            </div>
          )}

          {role === "avatar" && (
            <>
              <div className="flex justify-between m-auto w-[94%] py-2 text-grey-800 sm:w-full sm:px-2 sm:py-0">
                <button disabled={activebuttonDisable ? true : false} className={`border border-primaryColor-900 text-black ${!activebuttonDisable ? "opacity-1" : "opacity-[0.5]"} font-semibold py-2 rounded mr-2 w-[50%]`} onClick={() => (activebuttonDisable ? null : acceptOffer("reject", item))}>
                  Cancel
                </button>
                <button
                  disabled={activebuttonDisable ? true : false}
                  className={`border border-primaryColor-900 text-white bg-black ${!activebuttonDisable ? "opacity-1" : "opacity-[0.5]"} font-semibold py-2 rounded mr-2 w-[50%]`}
                  onClick={() => (activebuttonDisable ? null : acceptOffer("accept", item))}
                >
                  Accept
                </button>
                {/* <button
                  className={`border border-primaryColor-900 text-white bg-black  font-semibold py-2 rounded mr-2 w-[50%]`}
                  onClick={handleGoLive}
                >
                  tisting btn
                </button> */}
              </div>
            </>
          )}

          {meetActive && meetLink && (
            <button className="bg-backgroundFill-900 text-white flex justify-center items-center py-3 gap-2 rounded w-1/2 mt-3 lg:w-[97%] lg:m-1 ms-auto me-auto">
              <Link to={meetLink} target="_blank">
                {" "}
                <div className="text">{countdown}</div>
              </Link>
            </button>
          )}

          {/* {meetActive && meetLink && (
              <div className="p-3"> <p>
                Your meeting link is <Link to={meetLink}>{meetLink}</Link>
              </p></div>
            )} */}
        </div>
      </div>
    </section>
  );
};

export default RequestedCard;
