import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

// Create a context for Peer connections
const PeerContext = createContext(null);

// Custom hook to use the Peer context
export const usePeer = () => useContext(PeerContext);

// PeerProvider component that provides WebRTC-related functionality
export const PeerProvider = ({ children }) => {
    const [remoteStream, setRemoteStream] = useState(null);  // State to hold the remote stream
    const [iceCandidates, setIceCandidates] = useState([]);  // State to hold ICE candidates

    // Create a new RTCPeerConnection with STUN servers for ICE candidate gathering
    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
        ],
    }), []);

    // Handle ICE candidates as they are discovered and store them for sending to the other peer
    useEffect(() => {
        const handleIceCandidate = (event) => {
            if (event.candidate) {
                setIceCandidates((prev) => [...prev, event.candidate]);  // Add new ICE candidate to state
            }
        };

        peer.onicecandidate = handleIceCandidate;  // Attach the ICE candidate handler

        return () => {
            peer.onicecandidate = null;  // Cleanup the ICE candidate handler on unmount
        };
    }, [peer]);

    // Function to create an offer and set it as the local description
    const createOffer = async () => {
        try {
            const offer = await peer.createOffer();  // Create the WebRTC offer
            await peer.setLocalDescription(offer);  // Set the offer as the local description

            return offer;  // Return the offer to send to the other peer
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    // Function to create an answer and set it as the local description after receiving an offer
    const createAnswer = async (offer) => {
        try {
            await peer.setRemoteDescription(offer);  // Set the received offer as the remote description
            const answer = await peer.createAnswer();  // Create the WebRTC answer
            await peer.setLocalDescription(answer);  // Set the answer as the local description

            return answer;  // Return the answer to send to the other peer
        } catch (error) {
            console.error('Error creating answer:', error);
        }
    };

    // Function to set the remote answer after receiving it
    const setRemoteAnswer = async (answer) => {
        try {
            await peer.setRemoteDescription(answer);  // Set the remote description with the received answer
        } catch (error) {
            console.error('Error setting remote answer:', error);
        }
    };

    // Function to send local stream by adding its tracks to the peer connection
    const sendStream = (stream) => {
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));  // Add each track to the peer connection
    };

    // Handle the reception of remote tracks and store them in the remoteStream state
    useEffect(() => {
        const handleTrackEvent = (event) => {
            setRemoteStream((prevStream) => {
                if (!prevStream) {
                    // If no stream exists, create a new one and add the received track
                    const newStream = new MediaStream();
                    newStream.addTrack(event.track);
                    return newStream;
                } else {
                    // If a stream already exists, add the new track to it
                    prevStream.addTrack(event.track);
                    return prevStream;
                }
            });
        };

        peer.ontrack = handleTrackEvent;  // Attach the track event handler

        return () => {
            peer.ontrack = null;  // Cleanup the track handler on unmount
        };
    }, [peer]);

    // Provide the WebRTC methods and state to the component tree
    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream, iceCandidates }}>
            {children}
        </PeerContext.Provider>
    );
};
