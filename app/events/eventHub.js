import getEventTypeListeners from "./getEventTypeListeners"

async function emitEvent(eventType, eventTitle, props = false){
    const listeners = await getEventTypeListeners(eventType)
    var i = 0
    while (i < listeners.length) {
        await listeners[i](eventType, eventTitle, props);
        i++;
    }
}

export default {emitEvent}