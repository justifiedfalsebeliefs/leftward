import getEventTypeListeners from "./getEventTypeListeners"

async function emitEvent(eventType, eventTitle, props = false){
    const listeners = getEventTypeListeners(eventType)
    var i = 0
    while (i < listeners.length) {
        await listeners[i](eventType, eventTitle, props);
        i++;
    }
    return true
}

export default {emitEvent}