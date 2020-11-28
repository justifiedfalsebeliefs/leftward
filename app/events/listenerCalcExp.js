import pushData from "../data/pushData"
import eventHub from "../events/eventHub"

export default async function listenerCalcExp(eventType, eventTitle, props) {
    if (props.status == "COMPLETE"){
        await pushData("pushCalcExp")
        eventHub.emitEvent('userPropChange', 'experienceRecalculation')
    }
}