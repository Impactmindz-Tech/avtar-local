// socket.js
import { io } from "socket.io-client";
import { getLocalStorage } from "@/utills/LocalStorageUtills";


const socket = io(`http://localhost:3000`, {
// const socket = io(`http://localhost:3001/`, {
  reconnectionAttempts: 5, // Number of reconnection attempts before giving up
  transports: ['websocket'], // Use WebSocket transport
  secure: true, // Secure connection should be true for wss://, but for http use false
});



export default socket;
