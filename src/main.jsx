import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./store/Store.js";
import { SocketProvider } from "./store/notification.jsx";
import { PeerProvider } from "./utills/socket/PeerProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <React.StrictMode>
      <SocketProvider>
        <PeerProvider>
          <App />
        </PeerProvider>
      </SocketProvider>
    </React.StrictMode>
  </Provider>
);
