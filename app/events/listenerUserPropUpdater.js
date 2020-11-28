import cache from "../data/cache"

export default async function listenerUserPropUpdater(eventType, eventTitle, props) {
    if (eventTitle == 'experienceRecalculation') {
        const stringParams = JSON.stringify(false) // not ideal - artifact of param formatting in data/getData
        const cacheKey = "fetchUserExperience".concat(stringParams)
        await cache.clearCache(cacheKey)
    }
}