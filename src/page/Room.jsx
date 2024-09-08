import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
// Replace with your ngrok URL or server URL
const SOCKET_SERVER_URL = "https://backend-avatar-local.onrender.com";
const socket = io(SOCKET_SERVER_URL);

const WebRTCStreaming = () => {
  const [videoDevices, setVideoDevices] = useState([]);
  const localVideoRef = useRef(null);
  const videosContainerRef = useRef(null);
  const [roomId, setRoomId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [peerConnections, setPeerConnections] = useState({});
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const params = useParams();
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  useEffect(() => {
    // Fetch the available media devices
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
      setVideoDevices(videoInputDevices);
    }).catch(error => {
      console.error('Error accessing devices:', error);
    });
  }, []);

  useEffect(() => {
    // Check connection status and handle errors
    const handleConnectionError = (error) => {
      console.error("Socket connection error:", error);
      setErrorMessage("Socket connection error. Please try again.");
    };

    socket.on("connect", () => {
      console.log("Connected to server");
      setErrorMessage("");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setErrorMessage("Disconnected from server. Please check your connection.");
    });

    socket.on("connect_error", handleConnectionError);
    socket.on("connect_timeout", handleConnectionError);

    socket.on("created", async (room) => {
      setErrorMessage(`Created room ${room}. Waiting for viewers...`);
      setIsBroadcaster(true);
      const stream = await getUserMedia();
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });

    socket.on("joined", async (room) => {
      setErrorMessage(`Joined room ${room}`);
      setIsBroadcaster(false);
      const stream = await getUserMedia(false);
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });

    socket.on("viewer", (viewerId) => handleViewerJoined(viewerId));
    socket.on("offer", (offer, broadcasterId) => handleOffer(offer, broadcasterId));
    socket.on("answer", (answer, viewerId) => handleAnswer(answer, viewerId));
    socket.on("ice-candidate", (candidate, viewerId) => handleICECandidate(candidate, viewerId));
    socket.on("stop", handleStop);
    socket.on("broadcaster-left", handleBroadcasterLeft);
    socket.on("viewer-left", handleViewerLeft);

    return () => {
      // Cleanup socket events on unmount
      socket.off("created");
      socket.off("joined");
      socket.off("viewer");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("stop");
      socket.off("broadcaster-left");
      socket.off("viewer-left");
      socket.off("connect_error");
      socket.off("connect_timeout");
    };
  }, [peerConnections, localStream]);

  const getUserMedia = async (audio = true) => {
    try {
      return await navigator.mediaDevices.getUserMedia({ video:{width:{ideal:1920},height:{ideal:1080}}, audio: audio });
    } catch (error) {
      handleMediaError(error);
    }
  };

  const createRoom = () => {
    if (!socket.connected) {
      setErrorMessage("Socket is not connected. Unable to create room.");
      return;
    }
    const generatedRoomId = params?.id;
  setRoomId(generatedRoomId);
    socket.emit("create", generatedRoomId);
  };

  const joinRoom = () => {
    if (!socket.connected) {
      setErrorMessage("Socket is not connected. Unable to join room.");
      return;
    }
    if (roomId) {
      socket.emit("join", roomId);
    } else {
      setErrorMessage("Please enter a room ID.");
    }
  };

  const stopStream = () => {
    if (!socket.connected) {
      setErrorMessage("Socket is not connected. Unable to stop stream.");
      return;
    }
    if (roomId) {
      socket.emit("stop", roomId);
      localStream.getTracks().forEach((track) => track.stop());
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
    }
  };

  const exitRoom = () => {
    if (!socket.connected) {
      setErrorMessage("Socket is not connected. Unable to exit room.");
      return;
    }
    if (roomId) {
      socket.emit("exit", roomId);
      localStream.getTracks().forEach((track) => track.stop());
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
    }
  };

  const handleViewerJoined = (viewerId) => {
    const peerConnection = new RTCPeerConnection(configuration);
    setPeerConnections((prev) => ({ ...prev, [viewerId]: peerConnection }));

    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate, roomId, viewerId);
      }
    };

    peerConnection.createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        socket.emit("offer", peerConnection.localDescription, roomId, viewerId);
      });
  };

  const handleOffer = async (offer, broadcasterId) => {
    const peerConnection = new RTCPeerConnection(configuration);
    setPeerConnections((prev) => ({ ...prev, [broadcasterId]: peerConnection }));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate, roomId, broadcasterId);
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteVideo = document.createElement("video");
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.autoplay = true;
      remoteVideo.playsInline = true;
      if (videosContainerRef.current) {
        videosContainerRef.current.innerHTML = ""; // Clear previous videos
        videosContainerRef.current.appendChild(remoteVideo);
      }
    };

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", answer, roomId, broadcasterId);
  };

  const handleAnswer = (answer, viewerId) => {
    const peerConnection = peerConnections[viewerId];
    peerConnection.setRemoteDescription(answer);
  };

  const handleICECandidate = (candidate, viewerId) => {
    const peerConnection = peerConnections[viewerId];
    peerConnection.addIceCandidate(candidate);
  };

  const handleStop = () => {
    localStream.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (videosContainerRef.current) videosContainerRef.current.innerHTML = "";
  };

  const handleBroadcasterLeft = () => {
    setErrorMessage("Broadcaster has left the room.");
    exitRoom();
  };

  const handleViewerLeft = (viewerId) => {
    const peerConnection = peerConnections[viewerId];
    if (peerConnection) {
      peerConnection.close();
      setPeerConnections((prev) => {
        const { [viewerId]: removed, ...remaining } = prev;
        return remaining;
      });
    }
  };

  const handleMediaError = (error) => {
    setErrorMessage(`Media Error: ${error.message}`);
  };
  navigator.mediaDevices.enumerateDevices().then(gotDevices=>{
    console.log(gotDevices);
  })


  const handleCameraChange = async (event) => {
    const selectedDeviceId = event.target.value;

    // Stop the existing video tracks before starting a new one
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Get new stream with the selected camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: selectedDeviceId },width:{ideal:1920},height:{ideal:1080} },
      audio: true // Keep audio as before
    });

    // Set the new stream to the video element
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    setLocalStream(stream); // Update localStream

    // Replace the video tracks in peer connections with the new ones
    Object.values(peerConnections).forEach((peerConnection) => {
      const videoSender = peerConnection.getSenders().find((sender) => sender.track.kind === 'video');
      if (videoSender) {
        videoSender.replaceTrack(stream.getVideoTracks()[0]);
      }
    });
  };
useEffect(()=>{
 if(roomId){
  return;
 }
 else{
  createRoom();
 }
},[])
useEffect(()=>{
  joinRoom();
},[])
  return (
    <div>
      <h1>WebRTC Video Streaming</h1>
      <div>
        {/* <button onClick={createRoom}>Create Stream</button>
        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        /> */}
        {/* <button onClick={joinRoom}>Join Stream</button> */}
        <div className="controls">
          <button onClick={stopStream}>Stop Stream</button>
          <button onClick={exitRoom}>Exit Room</button>
        </div>
      </div>
      <div id="error-message" style={{ color: "red", fontWeight: "bold" }}>
        {errorMessage}
      </div>


      <div id="videos">
        {isBroadcaster?(<>
          <div>
        <label>Select Camera:</label>
        <select onChange={handleCameraChange}>
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>

        <video className="videoStyle" ref={localVideoRef} autoPlay playsInline muted></video></> ):( <div className="videoStyle" ref={videosContainerRef}></div>)}


      </div>
    </div>
  );
};

export default WebRTCStreaming;
