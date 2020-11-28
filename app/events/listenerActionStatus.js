import pushData from "../data/pushData"
import eventHub from "../events/eventHub"

export default async function listenerActionStatus(eventType, eventTitle, props) {
    await pushData("pushActionStatus", params = [{key:"statusUpdate", value:props.status}, {key:"actionId", value:props.actionId}])
    eventHub.emitEvent('databasePush', 'actionStatusUpdate', props)
}