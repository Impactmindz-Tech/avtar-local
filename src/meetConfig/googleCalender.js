import { gapi } from 'gapi-script';

const CLIENT_ID = '605362718604-3j20grbmoeacl6os46hlq1b6hbi5441r.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCLuQg8b8u2OTIb4VCYPiX3HtnpV-mePoQ';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// Initialize the Google API client
export const initClient = (updateSignInStatus) => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  });
};

// Handle sign-in
export const handleAuthClick = () => {
  gapi.auth2.getAuthInstance().signIn();
};

// Handle sign-out
export const handleSignoutClick = () => {
  gapi.auth2.getAuthInstance().signOut();
};

// Create a Google Meet event
export const createGoogleMeet = (event) => {
  return gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });
};

// Delete a Google Meet event
export const deleteGoogleMeet = (eventId) => {
  return gapi.client.calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId,
  });
};