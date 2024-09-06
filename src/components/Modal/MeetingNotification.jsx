import React, { useEffect, useState } from "react";

const MeetingNotification = ({ data }) => {
  const [notificationData, setNotificationData] = useState(() => {
    // Retrieve notification data from localStorage
    const savedData = localStorage.getItem("notificationData");
    return savedData ? JSON.parse(savedData) : data;
  });

  useEffect(() => {
    // Save notification data to localStorage whenever it changes
    if (notificationData) {
      localStorage.setItem("notificationData", JSON.stringify(notificationData));
    }
  }, [notificationData]);

  const onJoin = () => {
    const data = notificationData.roomId;
    window.location.href = `/room/${data}`;
  };

  const onCancel = () => {
    // Clear notification data from state and localStorage
    setNotificationData(null);
    localStorage.removeItem("notificationData");
  };

  // If no notification data, return null (component won't render)
  if (!notificationData) return null;

  return (
    <div className="fixed notification w-30  top-40 right-4 bg-white shadow-lg rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={notificationData?.item?.experienceImage} alt="Experience" className="w-16 h-16 rounded-md mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{notificationData?.item?.experienceName}</h3>
          <p className="text-gray-500">{notificationData?.item?.state}</p>
          <p className="text-gray-800">${notificationData?.item?.totalPrice}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded-md">
          Cancel
        </button>
        <button onClick={onJoin} className="bg-black text-white px-4 py-2 rounded-md">
          Join
        </button>
      </div>
    </div>
  );
};

export default MeetingNotification;
