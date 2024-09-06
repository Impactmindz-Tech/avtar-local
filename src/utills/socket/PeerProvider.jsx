import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const PeerContext = createContext(null);

export const usePeer = () => useContext(PeerContext);

export const PeerProvider = ({ children }) => {
    const [remoteStream, setRemoteStream] = useState(null);
    const [iceCandidates, setIceCandidates] = useState([]);

    // Setup the RTCPeerConnection with STUN servers
    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
        ],
    }), []);

    useEffect(() => {
        // Handle ICE candidates as they are discovered
        const handleIceCandidate = (event) => {
            if (event.candidate) {
                // Store ICE candidates to send to the other peer
                setIceCandidates((prev) => [...prev, event.candidate]);
            }
        };

        peer.onicecandidate = handleIceCandidate;

        return () => {
            peer.onicecandidate = null;
        };
    }, [peer]);

    // Create an offer and set local description
    const createOffer = async () => {
        try {
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);

            // Once local description is set, you can send the offer to the viewer
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    // Create an answer when receiving an offer and set remote description
    const createAnswer = async (offer) => {
        try {
            await peer.setRemoteDescription(offer);  // Set the received offer as the remote description
            const answer = await peer.createAnswer();  // Create the answer
            await peer.setLocalDescription(answer);  // Set the answer as the local description

            // Once local description is set, you can send the answer back to the streamer
            return answer;
        } catch (error) {
            console.error('Error creating answer:', error);
        }
    };

    // Set the remote answer after receiving it
    const setRemoteAnswer = async (answer) => {
        try {
            await peer.setRemoteDescription(answer);
        } catch (error) {
            console.error('Error setting remote answer:', error);
        }
    };

    // Add local media (stream) tracks to the peer connection
    const sendStream = (stream) => {
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    };

    // Listen for the remote stream and set it when tracks are received
    useEffect(() => {
        const handleTrackEvent = (event) => {
            setRemoteStream((prevStream) => {
                if (!prevStream) {
                    // Create a new stream object to attach the received tracks
                    const newStream = new MediaStream();
                    newStream.addTrack(event.track);
                    return newStream;
                } else {
                    // If we already have a stream, add the new track to it
                    prevStream.addTrack(event.track);
                    return prevStream;
                }
            });
        };

        peer.ontrack = handleTrackEvent;

        return () => {
            peer.ontrack = null;
        };
    }, [peer]);

    // Return the peer context with all relevant WebRTC methods
    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream, iceCandidates }}>
            {children}
        </PeerContext.Provider>
    );
};
