import cache from "../data/cache"

export default async function listenerUserPropUpdater(eventType, eventTitle, props) {
    if (eventTitle == 'experienceRecalculation') {
        console.log("listenerUserPropUpdater firing - detected experienceRecalculation. Clearing user experience cache.")
        await cache.clearCache("fetchUserExperience")
    }
}