// import { usePeer } from "@/utills/socket/PeerProvider";
// import socket from "@/utills/socket/Socket";
// import React, { useCallback, useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const Room = () => {
//     const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream } = usePeer();
//     const [myStream, setMyStream] = useState(null);
//     const [isStreaming, setIsStreaming] = useState(false);
//     const [roomId, setRoomId] = useState("");
//     const [joinRoomId, setJoinRoomId] = useState("");
//     const [liveStreamers, setLiveStreamers] = useState([]);
//     const [viewers, setViewers] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState("");
//     const [remoteStream, setRemoteStream] = useState(null);
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const roomIdMain = useSelector((state) => state.video.stream);
//     const params = useParams();

//     const getUserMediaStream = useCallback(async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 video: true,
//                 audio: true,
//             });
//             setMyStream(stream);
//             return stream;
//         } catch (error) {
//             console.error("Error accessing media devices:", error);
//             alert("Camera and microphone access could not be granted. Please check the permissions.");
//         }
//     }, []);

//     useEffect(() => {
//         if (myStream && localVideoRef.current && !localVideoRef.current.srcObject) {
//             localVideoRef.current.srcObject = myStream;
//         }
//     }, [myStream]);

//     useEffect(() => {
//         getUserMediaStream();
//     }, [getUserMediaStream]);

//     useEffect(() => {
//         if (remoteStream && remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = remoteStream;
//         }
//     }, [remoteStream]);

//     const startStream = async () => {
//         const stream = await getUserMediaStream();
//         if (stream) {
//             setIsStreaming(true);
//             sendStream(stream);
//             stream.getTracks().forEach((track) => peer.addTrack(track, stream));

//             const offer = await createOffer();
//             socket.emit("send-offer", { offer, roomId });
//         }
//     };

//     useEffect(() => {
//         if (roomIdMain) {
//             startStream();
//         }
//     }, [roomIdMain]);

//     const joinStream = () => {
//         setRoomId(params?.id);
//         socket.emit("join-room", { roomId: params?.id, viewerId: socket.id });
//     };

//     useEffect(() => {
//         joinStream();
//     }, [params?.id]);

//     useEffect(() => {
//         const handleRoomCreated = (data) => {
//             setLiveStreamers((prev) => [
//                 ...prev,
//                 { id: data.streamerId, roomId: data.roomId },
//             ]);
//         };

//         const handleViewerJoined = async (data) => {
//             const { viewerId, totalViewers } = data;
//             setViewers(totalViewers);

//             if (isStreaming && myStream) {
//                 const offer = await createOffer();
//                 socket.emit("send-offer", { viewerId, offer, roomId });
//             }
//         };

//         const handleReceiveOffer = async (data) => {
//             const { offer } = data;
//             const answer = await createAnswer(offer);
//             socket.emit("send-answer", { roomId, answer });
//         };

//         const handleReceiveAnswer = async (data) => {
//             const { answer } = data;
//             await setRemoteAnswer(answer);
//         };

//         const handleViewerLeft = (data) => {
//             const { viewerId, totalViewers } = data;
//             setViewers(totalViewers);
//         };

//         const handleNewMessage = (data) => {
//             const { viewerId, message } = data;
//             setMessages((prevMessages) => [...prevMessages, { viewerId, message }]);
//         };

//         const handleStreamEnded = (data) => {
//             const { roomId: endedRoomId } = data;
//             setLiveStreamers((prev) => prev.filter((streamer) => streamer.roomId !== endedRoomId));
//             if (endedRoomId === roomId) {
//                 setIsStreaming(false);
//                 setRoomId("");
//                 setRemoteStream(null);
//                 alert("The stream has ended.");
//             }
//         };

//         socket.on("room-created", handleRoomCreated);
//         socket.on("viewer-joined", handleViewerJoined);
//         socket.on("receive-offer", handleReceiveOffer);
//         socket.on("receive-answer", handleReceiveAnswer);
//         socket.on("viewer-left", handleViewerLeft);
//         socket.on("new-message", handleNewMessage);
//         socket.on("stream-ended", handleStreamEnded);

//         return () => {
//             socket.off("room-created", handleRoomCreated);
//             socket.off("viewer-joined", handleViewerJoined);
//             socket.off("receive-offer", handleReceiveOffer);
//             socket.off("receive-answer", handleReceiveAnswer);
//             socket.off("viewer-left", handleViewerLeft);
//             socket.off("new-message", handleNewMessage);
//             socket.off("stream-ended", handleStreamEnded);
//         };
//     }, [peer, createOffer, createAnswer, setRemoteAnswer, isStreaming, roomId, myStream]);

//     const handleSendMessage = () => {
//         if (messageInput.trim()) {
//             socket.emit("send-message", {
//                 roomId,
//                 viewerId: socket.id,
//                 message: messageInput,
//             });
//             setMessageInput("");
//         }
//     };

//     return (
//         <div className="container mx-auto p-4 z-[1] flex flex-wrap flex-col relative h-svh">
//             <h2 className="text-2xl font-bold mb-4">Live Streaming Room</h2>
//             {!isStreaming && roomId === "" && (
//                 <div>
//                     <h3 className="text-xl font-semibold mt-4 mb-2">Join a Stream</h3>
//                     <input
//                         type="text"
//                         value={joinRoomId}
//                         onChange={(e) => setJoinRoomId(e.target.value)}
//                         placeholder="Enter Room ID to join"
//                         className="border-2 border-gray-300 p-2 rounded mr-2"
//                     />
//                     <button
//                         onClick={() => {
//                             setRoomId(joinRoomId);
//                             socket.emit("join-room", { roomId: joinRoomId, viewerId: socket.id });
//                         }}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Join
//                     </button>
//                 </div>
//             )}
//             {isStreaming && (
//                 <div className="mt-4">
//                     <h3 className="text-xl font-semibold mb-2">
//                         Your Stream {roomId && `(Room ID: ${roomId})`}
//                     </h3>
//                     <video
//                         ref={localVideoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         className="w-full object-cover h-svh"
//                     />
//                     <p className="mt-2">Viewers: {viewers.length}</p>
//                 </div>
//             )}
//             {!isStreaming && roomId !== "" && (
//                 <div className="mt-4">
//                     <h3 className="text-xl font-semibold mb-2">Viewing Stream (Room ID: {roomId})</h3>
//                     <video
//                         ref={remoteVideoRef}
//                         autoPlay
//                         playsInline
//                         className="w-full object-cover h-svh"
//                     />
//                 </div>
//             )}
//             <div className="mt-auto">
//                 <h3 className="text-xl font-semibold mb-2">Chat</h3>
//                 <div className="h-48 overflow-y-scroll border border-gray-300 p-2 mb-2">
//                     {messages.map((msg, index) => (
//                         <p key={index}>
//                             <strong>{msg.viewerId}:</strong> {msg.message}
//                         </p>
//                     ))}
//                 </div>
//                 <input
//                     type="text"
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                     placeholder="Type a message..."
//                     className="border-2 px-4 placeholder-black font-medium border-gray-300 rounded-full text-base w-full h-[46px]"
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Room;
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// Replace with your ngrok URL or server URL
const SOCKET_SERVER_URL = "https://backendcheck-3yb5.onrender.com";
const socket = io(SOCKET_SERVER_URL);

const Room= () => {
  const [videoDevices, setVideoDevices] = useState([]);
  const localVideoRef = useRef(null);
  const videosContainerRef = useRef(null);
  const [roomId, setRoomId] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [peerConnections, setPeerConnections] = useState({});
  const [isBroadcaster, setIsBroadcaster] = useState(false);

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
      return await navigator.mediaDevices.getUserMedia({ video:{width:{exact:1920},height:{exact:1080}}, audio: audio });
    } catch (error) {
      handleMediaError(error);
    }
  };

  const createRoom = () => {
    if (!socket.connected) {
      setErrorMessage("Socket is not connected. Unable to create room.");
      return;
    }
    const generatedRoomId = roomId || Math.random().toString(36).substr(2, 2);
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
      video: { deviceId: { exact: selectedDeviceId },width:{exact:1920},height:{exact:1080} },
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
  
  return (
    <div>
      <h1>WebRTC Video Streaming</h1>
      <div>
        <button onClick={createRoom}>Create Stream</button>
        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Stream</button>
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

export default Room;
