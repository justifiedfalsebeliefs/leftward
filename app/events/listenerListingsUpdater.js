import cache from "../data/cache"

export default async function listenerListingsUpdater(eventType, eventTitle, props) {
    console.log("listenerListingsUpdater firing and clearing dashboard listings cache")
    const stringParams = JSON.stringify(false) // not ideal - artifact of param formatting in data/getData
    const cacheKey = "fetchDashboardListings".concat(stringParams)
    await cache.clearCache(cacheKey)

}