import React, { useEffect, useState } from 'react';
import { initClient, handleAuthClick, handleSignoutClick, createGoogleMeet, deleteGoogleMeet } from './googleCalender.js/index.js';
import { Button, TextField, Typography } from '@mui/material';
import moment from 'moment';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [meetLink, setMeetLink] = useState('');
  const [eventId, setEventId] = useState('');
  const [duration, setDuration] = useState(30); // Default duration 30 minutes
  const [startTime, setStartTime] = useState('');
  const [timerId, setTimerId] = useState(null);
  const [countdown, setCountdown] = useState('');
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
        const start = moment(startTime);
        const diff = start.diff(now);

        if (diff <= 0) {
          clearInterval(interval);
          setCountdown('Meeting is starting now!');
          createMeet();
        } else {
          const hours = Math.floor(diff / 3600000);
          const minutes = Math.floor((diff % 3600000) / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setCountdown(`${hours} hours ${minutes} minutes ${seconds} seconds remaining`);
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

    createGoogleMeet(event).then((response) => {
      const meetUrl = response.result.hangoutLink;
      setMeetLink(meetUrl);
      setEventId(response.result.id);

      // Open the meeting in a new tab
      const newWindow = window.open(meetUrl, '_blank');
      setMeetWindow(newWindow);

      // Schedule the end of the meeting
      const timer = setTimeout(() => {
        endMeet();
      }, duration * 60000);

      setTimerId(timer);
    });
  };

  const endMeet = () => {
    if (eventId) {
      deleteGoogleMeet(eventId).then(() => {
        resetState();
      });
    }
    if (meetWindow) {
      meetWindow.close();
    }
  };

  const resetState = () => {
    setMeetLink('');
    setEventId('');
    setCountdown('');
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  return (
    <section>
      <div className="container custom_height">
        <div className="row justify-content-center">
          <div className="col-lg-5 text-center container_custom">
            <div>
              <h1>Let's Have A Meeting</h1>
            </div>
            {!isSignedIn ? (
              <div className='mt-4'>
                <button className='btn custom_btn' onClick={handleAuthClick}>
                  SIGN IN
                </button>
              </div>
            ) : (
              <div>
                <button className='btn custom_btn me-5 mt-4' onClick={handleSignoutClick}>
                  Sign Out
                </button>
                <div className='mt-4'>
                  <TextField
                    label="Start Time"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <TextField
                    label="Duration (minutes)"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>
                {countdown && (
                  <div className='mt-4'>
                    <Typography variant="body1">
                      {countdown}
                    </Typography>
                  </div>
                )}
                {meetLink && (
                  <div className='mt-4'>
                    <Typography variant="body1">
                      Join the meeting: <a href={meetLink}>{meetLink}</a>
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
