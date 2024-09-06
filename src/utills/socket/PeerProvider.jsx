import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const PeerContext = createContext(null);

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }) => {
    const [remoteStream, setRemoteStream] = useState(null);
    const [iceCandidates, setIceCandidates] = useState([]);
    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
        ],
    }), []);

    useEffect(() => {
        const handleIceCandidate = (event) => {
            if (event.candidate) {
                setIceCandidates((prev) => [...prev, event.candidate]);
            }
        };

        peer.onicecandidate = handleIceCandidate;

        return () => {
            peer.onicecandidate = null;
        };
    }, [peer]);

    const createOffer = async () => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const createAnswer = async (offer) => {
        try {
            await peer.setRemoteDescription(offer);
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
            return answer;
        } catch (error) {
            console.error('Error creating answer:', error);
        }
    };

    const setRemoteAnswer = async (answer) => {
        try {
            await peer.setRemoteDescription(answer);
        } catch (error) {
            console.error('Error setting remote answer:', error);
        }
    };

    const sendStream = (stream) => {
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    };

    useEffect(() => {
        const handleTrackEvent = (event) => {
            setRemoteStream(event.streams[0]);
        };

        peer.ontrack = handleTrackEvent;

        return () => {
            peer.ontrack = null;
        };
    }, [peer]);

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream, iceCandidates }}>
            {children}
        </PeerContext.Provider>
    );
};
