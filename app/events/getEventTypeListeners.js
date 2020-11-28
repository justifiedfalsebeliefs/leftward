import listenerAmplitude from "./listenerAmplitude"
import listenerActionStatus from "./listenerActionStatus"
import listenerCalcExp from "./listenerCalcExp"
import listenerUserPropUpdater from "./listenerUserPropUpdater"
import listenerListingsUpdater from "./listenerListingsUpdater"

export default async function getEventTypeListeners(eventType){
    switch(eventType){
        case 'userEvent':
            return [
                listenerAmplitude,
                listenerActionStatus
            ]; break;
        case 'navigationEvent':
            return [
                listenerAmplitude
            ]; break;
        case 'databasePush':
            return [
                listenerCalcExp,
                listenerListingsUpdater
            ]; break;
        case 'userPropChange':
            return [
                listenerUserPropUpdater
            ]; break;
    }
}
