import OffersCard from "@/components/Avatar/Card/OffersCard";
import BlackBottomButton from "@/components/Button/BlackBottomButton";
import HeaderBack from "@/components/HeaderBack";
import Images from "@/constant/Images";
import { getLocalStorage } from "@/utills/LocalStorageUtills.jsx";
import socket from "@/utills/socket/Socket.js";
import { initClient, handleAuthClick, handleSignoutClick, createGoogleMeet, deleteGoogleMeet } from "../../../meetConfig/googleCalender.js";
import { acceptOfferApi } from "@/utills/service/avtarService/acceptOffer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "@/components/MapComponent";
import moment from "moment";

function OffersPage() {
  const params = useParams();
  const [offerDetails, setOfferDetails] = useState(null);
  const [selectPosition, setSelectPosition] = useState(null);

  const userId = getLocalStorage('user')?._id;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [meetLink, setMeetLink] = useState('');
  const [eventId, setEventId] = useState('');
  const [duration, setDuration] = useState(30); // Default duration 30 minutes
  const [startTime, setStartTime] = useState('');
  const [countdown, setCountdown] = useState('');
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
          setCountdown('Meeting is starting now!');
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
      summary: 'Google Meet',
      description: 'One-on-one meeting',
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: {
            type: "hangoutsMeet"
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
      console.log(sendid,'jsdkfhkjds');
      socket.emit('sendMeet',{
        link:meetUrl,
        eventId:eventId,
        sendid:sendid,
        expid:expid

      })
    
    

      setMeetLink(meetUrl);
      setEventId(eventId);

      const timer = setTimeout(() => {
        endMeet();
      }, duration * 60000);
    });
  };
  const resetState = () => {
    setMeetLink('');
    setEventId('');
    setCountdown('');
    setMeetActive(false);
  };





  
  useEffect(() => {

    socket.emit('instantLive',userId);
  


    return () => {
      socket.emit("userOffline", userId);
      socket.off("instantLive");
    };
  }, [userId]);


  const handleclick =async()=>{
    const date = new Date();
    const formattedDate = moment.utc(date).format('YYYY-MM-DDTHH:mm');
    console.log(formattedDate);
    setStartTime(formattedDate);
    handleAuthClick();
    try {
      const response = await acceptOfferApi(params?.id);
      if (response?.isSuccess) {
        setOfferDetails(response?.data); // Ensure it's an array
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleclick();
  }, []);
  return (
    <div>
      <HeaderBack link={"/avatar/experience"} text={"Offers"} />
      <OffersCard item={offerDetails} state={true} />

      <div className="my-4">
        <h1 className="font-bold">User requested a tour at this location</h1>

        <div className="map">
                
                  <div className="my-3 relative">
                    <div className="centerImageIcon relative  w-full flex flex-col gap-2 justify-center">
                      <div className="w-[50%] m-auto lg:w-[98%]">
                        <div className="shape text-sm text-center">Exact location provided after booking.</div>
                        <div className="flex w-full justify-center">
                          <div className="triangleDown"></div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <img src={Images.homeIcon} alt="home icon" className="cursor-pointer lg:w-10 lg:h-10" />
                      </div>
                    </div>
                    <MapComponent selectPosition={selectPosition} />
                  </div>
                  {/* <h4 className="font-bold">
                    {item?.State}, {item?.country}
                  </h4> */}
                  <h5 className="font-medium my-2">About this Tour</h5>
                  {/* <p className="text-grey-800">{item?.about}</p> */}
                </div>


        <h4 className="font-bold">Notes</h4>
        <p className="text-grey-800">{offerDetails?.Notes}</p>
      </div>

      <div className="w-full my-6 rounded-md bottom-1 m-auto left-0 right-0 p-2 cursor-pointer bg-backgroundFill-900 text-white text-center">
        <button onClick={handleclick} className="py-1 font-bold ">Accept</button>
      </div>
    </div>
  );
}

export default OffersPage;
