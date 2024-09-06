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
    const [joinRoomId, setJoinRoomId] = useState("");
    const [liveStreamers, setLiveStreamers] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
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
            sendStream(stream);
            stream.getTracks().forEach((track) => peer.addTrack(track, stream));
        }
    };

    useEffect(() => {
        if (roomIdMain) {
            startStream();
        }
    }, [roomIdMain]);

    const joinStream = () => {
        setRoomId(params?.id);
        socket.emit("join-room", { roomId: params?.id, viewerId: socket.id });
    };

    useEffect(() => {
        joinStream();
    }, [params?.id]);

    useEffect(() => {
        const handleRoomCreated = (data) => {
            setLiveStreamers((prev) => [
                ...prev,
                { id: data.streamerId, roomId: data.roomId },
            ]);
        };

        const handleViewerJoined = async (data) => {
            const { viewerId, totalViewers } = data;
            setViewers(totalViewers);

            if (isStreaming && myStream) {
                const offer = await createOffer();
                socket.emit("send-offer", { viewerId, offer, roomId });
            }
        };

        const handleReceiveOffer = async (data) => {
            const { offer } = data;
            const answer = await createAnswer(offer);
            socket.emit("send-answer", { roomId, answer });
        };

        const handleReceiveAnswer = async (data) => {
            const { answer } = data;
            await setRemoteAnswer(answer);
        };

        const handleViewerLeft = (data) => {
            const { viewerId, totalViewers } = data;
            setViewers(totalViewers);
        };

        const handleNewMessage = (data) => {
            const { viewerId, message } = data;
            setMessages((prevMessages) => [...prevMessages, { viewerId, message }]);
        };

        const handleStreamEnded = (data) => {
            const { roomId: endedRoomId } = data;
            setLiveStreamers((prev) => prev.filter((streamer) => streamer.roomId !== endedRoomId));
            if (endedRoomId === roomId) {
                setIsStreaming(false);
                setRoomId("");
                setRemoteStream(null);
                alert("The stream has ended. It stopped from the avatar side.");
            }
        };

        socket.on("room-created", handleRoomCreated);
        socket.on("viewer-joined", handleViewerJoined);
        socket.on("receive-offer", handleReceiveOffer);
        socket.on("receive-answer", handleReceiveAnswer);
        socket.on("viewer-left", handleViewerLeft);
        socket.on("new-message", handleNewMessage);
        socket.on("stream-ended", handleStreamEnded);

        peer.ontrack = (event) => {
            setRemoteStream((prevStream) => {
                const updatedStream = new MediaStream(prevStream?.getTracks() || []);
                updatedStream.addTrack(event.track);
                return updatedStream;
            });
        };

        return () => {
            socket.off("room-created", handleRoomCreated);
            socket.off("viewer-joined", handleViewerJoined);
            socket.off("receive-offer", handleReceiveOffer);
            socket.off("receive-answer", handleReceiveAnswer);
            socket.off("viewer-left", handleViewerLeft);
            socket.off("new-message", handleNewMessage);
            socket.off("stream-ended", handleStreamEnded);
        };
    }, [
        socket,
        peer,
        createOffer,
        createAnswer,
        setRemoteAnswer,
        isStreaming,
        roomId,
        myStream,
    ]);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            socket.emit("send-message", {
                roomId,
                viewerId: socket.id,
                message: messageInput,
            });
            setMessageInput("");
        }
    };

    return (
        <div className="container mx-auto p-4 z-[1] flex flex-wrap flex-col relative before:block before:absolute before:-inset-0 before:bg-black/10 before:z-[-1] h-svh">
            <h2 className="text-2xl font-bold mb-4">Live Streaming Room</h2>

            <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                    <h3 className="text-xl font-semibold mb-2">Your Stream</h3>
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-64 object-cover"
                    />
                </div>

                <div className="w-1/2 pl-2">
                    <h3 className="text-xl font-semibold mb-2">Remote Stream</h3>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 object-cover"
                    />
                </div>
            </div>

            <div className="mt-auto">
                <h3 className="text-xl font-semibold mb-2">Chat</h3>
                <div className="h-48 overflow-y-scroll border border-gray-300 p-2 mb-2">
                    {messages.map((msg, index) => (
                        <p key={index}>
                            <strong>{msg.viewerId}:</strong> {msg.message}
                        </p>
                    ))}
                </div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-[#E5E5E5]/30 border-2 px-4 placeholder-white font-medium border-[#E5E5E5]/40 rounded-full text-base sm:text-sm text-white w-full h-[46px]"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Room;
