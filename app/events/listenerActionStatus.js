import pushData from "../data/pushData"
import eventHub from "../events/eventHub"

export default async function listenerActionStatus(eventType, eventTitle, props) {
    console.log("listenerActionStatus firing - pushing action status.")
    await pushData("pushActionStatus", params = [{key:"statusUpdate", value:props.status}, {key:"actionId", value:props.actionId}])
    console.log("listenerActionStatus emitting event: 'databasePush', 'actionStatusUpdate' with props.")
    eventHub.emitEvent('databasePush', 'actionStatusUpdate', props)
}