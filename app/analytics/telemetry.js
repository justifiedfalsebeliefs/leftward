import * as Amplitude from "expo-analytics-amplitude";
import storage from "../auth/storage";

export default async function telemetry(eventTitle, props = false) {
  if (props) {
    Amplitude.logEventWithPropertiesAsync(eventTitle, props);
  } else {
    Amplitude.logEventAsync(eventTitle);
  }
  if (eventTitle == "viewDashboard") {
    const session = await storage.getUserSession();
    Amplitude.setUserIdAsync(session.idToken.payload["custom:userGuid"]);
  }
}
