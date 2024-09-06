import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const PeerContext = createContext(null);

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }) => {
    const [remoteStream, setRemoteStream] = useState(null);
    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    }), []);

    useEffect(() => {
        peer.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("New ICE candidate:", event.candidate);
            }
        };
    }, [peer]);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    };

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
    };

    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const sendStream = (stream) => {
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    };

    peer.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
    };

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream }}>
            {children}
        </PeerContext.Provider>
    );
};
