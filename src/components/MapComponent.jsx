import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PaymentPage from "@/page/user/Payment";
import { useDispatch } from "react-redux";
import { setTourDetails } from "@/store/slice/TourSlice";

// Extend the L.Icon.Default class to set the default options
class DefaultIcon extends L.Icon.Default {
  constructor() {
    super();
    this.options.iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
    this.options.iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
    this.options.shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";
  }
}

// Apply the extended default icon options
L.Icon.Default.prototype = new DefaultIcon();

const defaultPosition = [30.7333, 76.7794]; // Default position in Chandigarh

const RecentCenterView = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions && Array.isArray(positions) && positions.length > 0) {
      const lastPosition = positions[positions.length - 1];
      map.setView([lastPosition.lat, lastPosition.lon], 16, {
        animate: true,
      });
    }
  }, [positions, map]);

  return null;
};

const CurrentLocationButton = ({ onClick }) => {
  const map = useMapEvents({
    click() {
      onClick();
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        backgroundColor: "#fff",
        padding: "5px",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
      }}
      onClick={map.click}
    >
      Show Current Location
    </div>
  );
};

const MapComponent = ({ selectPosition, setHeight }) => {
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [payemntDetails, setPayemntDetails] = useState(false);
  const dispatch = useDispatch()

  const safeSelectPosition = Array.isArray(selectPosition) ? selectPosition : [];
  const initialPosition = safeSelectPosition.length > 0 ? [safeSelectPosition[0].lat, safeSelectPosition[0].lon] : defaultPosition;
  const mapHeight = setHeight ? "400px" : "100vh";

  const handleMarkerClick = () => {
    setPayemntDetails(true);
  };

  const handleCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setNewMarkerPosition({ lat: latitude, lon: longitude });
      // You may want to use the map object to set view directly
      const map = useMap();
      map.setView([latitude, longitude], 100, { animate: true });
    });
  };

  return (
    <>
      <MapContainer center={initialPosition} zoom={5} style={{ height: "100%", width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Basic Map">
            <TileLayer url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=eA3MBleCC9aTtUBJHL6C" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Satellite View">
            <TileLayer url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=eA3MBleCC9aTtUBJHL6C" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          </LayersControl.BaseLayer>
        </LayersControl>
        {safeSelectPosition.length > 0 &&
          safeSelectPosition.map((position, index) => {
            dispatch(setTourDetails(position))
            return (
              <Marker
                eventHandlers={{
                  click: () => handleMarkerClick(),
                }}
                key={index}
                position={[position.lat, position.lon]}
              >
                <Popup>{position?.ExpId?.ExperienceName}</Popup>
              </Marker>
            );
          })}
        {newMarkerPosition && (
          <Marker position={[newMarkerPosition.lat, newMarkerPosition.lon]}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
        <RecentCenterView positions={safeSelectPosition} />
        <CurrentLocationButton onClick={handleCurrentLocationClick} />
        <PaymentPage payemntDetails={payemntDetails} setPayemntDetails={setPayemntDetails} selectPosition={selectPosition} />
      </MapContainer>
    </>
  );
};

export default MapComponent;
