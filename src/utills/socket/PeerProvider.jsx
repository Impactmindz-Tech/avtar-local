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
                console.log('New ICE candidate:', event.candidate);
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
            await peer.setLocalDescription(new RTCSessionDescription(offer));
            console.log('Offer created:', offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
            throw error;
        }
    };

    const createAnswer = async (offer) => {
        try {
            await peer.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(new RTCSessionDescription(answer));
            console.log('Answer created:', answer);
            return answer;
        } catch (error) {
            console.error('Error creating answer:', error);
            throw error;
        }
    };

    const setRemoteAnswer = async (ans) => {
        try {
            await peer.setRemoteDescription(new RTCSessionDescription(ans));
        } catch (error) {
            console.error('Error setting remote description:', error);
            throw error;
        }
    };

    const sendStream = (stream) => {
        stream.getTracks().forEach((track) => {
            if (!peer.getSenders().find((sender) => sender.track === track)) {
                peer.addTrack(track, stream);
            }
        });
    };

    useEffect(() => {
        peer.ontrack = (event) => {
            const [remoteStream] = event.streams;
            setRemoteStream(remoteStream);
        };
    }, [peer]);

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream }}>
            {children}
        </PeerContext.Provider>
    );
};
