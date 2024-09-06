import { usePeer } from "@/utills/socket/PeerProvider";
import socket from "@/utills/socket/Socket";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Room = () => {
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream } = usePeer();  // Peer functionalities from custom hook
    const [myStream, setMyStream] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [viewers, setViewers] = useState([]);
    const [messages, setMessages] = useState([]);  // Chat messages state
    const [messageInput, setMessageInput] = useState("");  // Chat input state
    const [remoteStream, setRemoteStream] = useState(null);

    const localVideoRef = useRef(null);  // Reference to local video element
    const remoteVideoRef = useRef(null);  // Reference to remote video element
    const roomIdMain = useSelector((state) => state.video.stream);  // Room ID from Redux state
    const params = useParams();  // Room ID from URL parameters

    // Get local media stream (camera and microphone)
    const getUserMediaStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setMyStream(stream);
            return stream;
        } catch (error) {
            console.error("Error accessing media devices:", error);
            alert("Camera and microphone access could not be granted. Please check the permissions.");
        }
    }, []);

    useEffect(() => {
        // Attach the local video stream to the video element
        if (myStream && localVideoRef.current && !localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject = myStream;
        }
    }, [myStream]);

    useEffect(() => {
        // Get user media stream on component mount
        getUserMediaStream();
    }, [getUserMediaStream]);

    useEffect(() => {
        // Attach the remote stream to the remote video element
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    // Start streaming when the broadcaster creates a room
    const startStream = async () => {
        const stream = await getUserMediaStream();
        if (stream) {
            setIsStreaming(true);
            sendStream(stream);  // Send stream through WebRTC
            stream.getTracks().forEach((track) => peer.addTrack(track, stream));  // Add tracks to peer connection
        }
    };

    // Join the stream as a viewer
    const joinStream = () => {
        socket.emit("join-room", { roomId: params?.id, viewerId: socket.id });
    };

    useEffect(() => {
        // Handle room creation and joining
        const handleRoomCreated = (data) => {
            setRoomId(data.roomId);
            if (socket.id === data.streamerId) {
                startStream();  // Start stream if user is the broadcaster
            } else {
                joinStream();  // Join stream as viewer
            }
        };

        socket.on("room-created", handleRoomCreated);

        return () => {
            socket.off("room-created", handleRoomCreated);
        };
    }, [startStream, joinStream]);

    useEffect(() => {
        // Handle viewer joining
        const handleViewerJoined = async (data) => {
            const { viewerId, totalViewers } = data;
            setViewers(totalViewers);  // Update viewer count

            if (isStreaming && myStream) {
                const offer = await createOffer();  // Create WebRTC offer
                socket.emit("send-offer", { viewerId, offer, roomId });  // Send offer to viewer
            }
        };

        // Handle receiving offer (from broadcaster) as a viewer
        const handleReceiveOffer = async (data) => {
            const { offer } = data;
            const answer = await createAnswer(offer);  // Create WebRTC answer
            socket.emit("send-answer", { roomId, answer });  // Send answer back to broadcaster
        };

        // Handle receiving answer (from viewer) as the broadcaster
        const handleReceiveAnswer = async (data) => {
            const { answer } = data;
            await setRemoteAnswer(answer);  // Set remote description with the received answer
        };

        // Listen for the various socket events
        socket.on("viewer-joined", handleViewerJoined);
        socket.on("receive-offer", handleReceiveOffer);
        socket.on("receive-answer", handleReceiveAnswer);

        // Handle receiving remote stream
        peer.ontrack = (event) => {
            setRemoteStream((prevStream) => {
                const updatedStream = new MediaStream(prevStream?.getTracks() || []);  // Get current tracks
                updatedStream.addTrack(event.track);  // Add new track to the stream
                return updatedStream;
            });
        };

        return () => {
            socket.off("viewer-joined", handleViewerJoined);
            socket.off("receive-offer", handleReceiveOffer);
            socket.off("receive-answer", handleReceiveAnswer);
        };
    }, [peer, createOffer, createAnswer, setRemoteAnswer, isStreaming, roomId, myStream]);

    // Chat functionality
    useEffect(() => {
        // Listen for new chat messages
        socket.on("new-message", (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);  // Append new messages to the chat
        });

        return () => {
            socket.off("new-message");
        };
    }, []);

    const handleSendMessage = () => {
        // Send chat message
        if (messageInput.trim()) {
            const messageData = {
                roomId,
                viewerId: socket.id,
                message: messageInput,
            };
            socket.emit("send-message", messageData);  // Send message via socket
            setMessages((prevMessages) => [...prevMessages, messageData]);  // Add message to local state
            setMessageInput("");  // Clear input field
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Live Streaming Room</h2>

            {isStreaming && (
                <div>
                    <h3>Your Stream (Room ID: {roomId})</h3>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full"
                    />
                    <p>Viewers: {viewers.length}</p>
                </div>
            )}

            {!isStreaming && remoteStream && (
                <div>
                    <h3>Viewing Stream (Room ID: {roomId})</h3>
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full" />
                </div>
            )}

            {/* Chat Section */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Chat</h3>
                <div className="border p-2 h-64 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <p key={index}>
                            <strong>{msg.viewerId}:</strong> {msg.message}
                        </p>
                    ))}
                </div>
                <div className="flex mt-2">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 border p-2"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 bg-blue-500 text-white px-4 py-2"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
