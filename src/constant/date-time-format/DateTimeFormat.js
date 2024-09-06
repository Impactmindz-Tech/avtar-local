import { format } from "date-fns";
export const formatTimeToHHMM = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
export const formatTime = (timeString) => {
  if (!timeString) {
    return "";
  }
  const date = new Date(timeString);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC" };
  return date.toLocaleString("en-US", options); // Format to '12:00 PM'
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }
  
  const date = new Date(dateString);
  return format(date, "dd MMMM yyyy"); // Format to '25 July 1995'
};
export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) {
    return "";
  }

  // Convert the input dateTimeString to a Date object
  const date = new Date(dateTimeString);

  // Format date as '25 July 1995' and time as '12:00 PM' in local time zone
  const formattedDate = format(date, "dd MMMM yyyy");
  const formattedTime = format(date, "hh:mm a");

  return `${formattedDate} at ${formattedTime}`;
};

export function getDateTimeForTimezone(timezoneStr) {
  try {
    const date = new Date();

    const options = {
      timeZone: timezoneStr,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);

    // Get the timezone abbreviation
    const timeZoneAbbr = new Intl.DateTimeFormat("en-US", {
      timeZone: timezoneStr,
      timeZoneName: "short",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName").value;

    return `${formattedDate} ${timeZoneAbbr}`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

export const difference = (item) => {
  const bookingTime = moment(item.bookingTime);
  const endTime = moment(item.endTime);
  const duration = moment.duration(endTime.diff(bookingTime));
  const hours = Math.floor(duration.asHours());
  const minutesPart = Math.floor(duration.asMinutes()) % 60;
  return minutesPart;
};

export const formatTo24Hour = (timeString) => {
  if (!timeString) {
    return "";
  }

  // पहले ISO 8601 प्रारूप के समय को `Date` ऑब्जेक्ट में बदलें
  const date = new Date(timeString);
  
  if (isNaN(date.getTime())) {
    // अगर `date` वैध नहीं है, तो एक एरर फेंकें या खाली स्ट्रिंग लौटाएं
    return "Invalid time value";
  }

  // अब समय को 24 घंटे के प्रारूप में निकालें
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // दो अंकों वाला समय प्रारूप (HH:mm) लौटाएं
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
};
