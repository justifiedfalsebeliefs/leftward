import pushData from "../data/pushData"
import eventHub from "../events/eventHub"

export default async function listenerCalcExp(eventType, eventTitle, props) {
    if (props.status == "COMPLETE"){
        console.log("listenerCalcExp firing - detected action status COMPLETE.")
        const responseData = await pushData("pushCalcExp")
        console.log("listenerCalcExp emitting event: 'userPropChange', 'experienceRecalculation'.")
        eventHub.emitEvent('userPropChange', 'experienceRecalculation')
        if (responseData.levelUp){
            console.log("listenerCalcExp emitting event: 'userPropChange', 'levelUp' with props")
            eventHub.emitEvent('userPropChange', 'levelUp', {newLevel: responseData.newLevel})
        }
    }
}