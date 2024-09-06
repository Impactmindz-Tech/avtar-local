import { usePeer } from "@/utills/socket/PeerProvider";
import socket from "@/utills/socket/Socket";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Room = () => {
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream } = usePeer();
    const [myStream, setMyStream] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [viewers, setViewers] = useState([]);
    const [remoteStream, setRemoteStream] = useState(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const roomIdMain = useSelector((state) => state.video.stream);
    const params = useParams();

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
        if (myStream && localVideoRef.current && !localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject = myStream;
        }
    }, [myStream]);

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const startStream = async () => {
        const stream = await getUserMediaStream();
        if (stream) {
            setIsStreaming(true);
            sendStream(stream); // Send stream to peer connection
            stream.getTracks().forEach((track) => peer.addTrack(track, stream));

            // Notify viewers that the stream is available
            socket.emit("stream-started", { roomId, stream });
        }
    };

    const joinStream = () => {
        socket.emit("join-room", { roomId: params?.id, viewerId: socket.id });

        // Trigger listener to start receiving remote stream
        socket.on("receive-offer", async ({ offer }) => {
            const answer = await createAnswer(offer);
            socket.emit("send-answer", { roomId, answer });
        });

        // Handle ICE candidates sent from the streamer
        socket.on("receive-ice-candidate", ({ candidate }) => {
            if (candidate) {
                peer.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

        // Set the remote stream
        peer.ontrack = (event) => {
            setRemoteStream((prevStream) => {
                const updatedStream = new MediaStream(prevStream?.getTracks() || []);
                updatedStream.addTrack(event.track);
                return updatedStream;
            });
        };
    };

    useEffect(() => {
        const handleRoomCreated = (data) => {
            setRoomId(data.roomId);
            if (socket.id === data.streamerId) {
                startStream();
            } else {
                joinStream();
            }
        };

        socket.on("room-created", handleRoomCreated);

        return () => {
            socket.off("room-created", handleRoomCreated);
        };
    }, [startStream, joinStream, socket]);

    useEffect(() => {
        const handleViewerJoined = async (data) => {
            const { viewerId, totalViewers } = data;
            setViewers(totalViewers);
    
            if (isStreaming && myStream) {
                const offer = await createOffer();
                socket.emit("send-offer", { viewerId, offer, roomId });
            }
        };

        // Handle receiving answer from the viewer
        const handleReceiveAnswer = async (data) => {
            const { answer } = data;
            await setRemoteAnswer(answer);
        };

        // Handle ICE candidates received from the viewer
        socket.on("receive-answer", handleReceiveAnswer);

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("send-ice-candidate", {
                    roomId,
                    targetId: socket.id,
                    candidate: event.candidate,
                });
            }
        };

        return () => {
            socket.off("receive-answer", handleReceiveAnswer);
        };
    }, [peer, createOffer, setRemoteAnswer, isStreaming, roomId, myStream]);

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
        </div>
    );
};

export default Room;
