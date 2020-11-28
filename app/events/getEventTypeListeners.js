import listenerAmplitude from "./listenerAmplitude"

export default async function getEventTypeListeners(eventType){
    switch(eventType){
        case 'userEvent':
            return [
                listenerAmplitude
            ]; break;
        case 'navigationEvent':
            return [
                listenerAmplitude
            ]; break;
    }
}
