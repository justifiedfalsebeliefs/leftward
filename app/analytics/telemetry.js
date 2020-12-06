import * as Amplitude from 'expo-analytics-amplitude';
import storage from "../auth/storage"

export default async function telemetry(eventTitle, props=false) {
    if (props){
        Amplitude.logEventWithProperties(eventTitle, props)
    } else{
        Amplitude.logEvent(eventTitle)
    }
    if (eventTitle == 'viewDashboard'){
        const session = await storage.getUserSession()
        Amplitude.setUserId(session.idToken.payload["custom:userGuid"]);
    }
}