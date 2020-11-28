import * as Amplitude from 'expo-analytics-amplitude';

export default async function listenerAmplitude(eventType, eventTitle, props) {
    if (props){
        Amplitude.logEventWithProperties(eventTitle, props)
    } else{
        Amplitude.logEvent(eventTitle)
    }
}