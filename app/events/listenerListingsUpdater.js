import cache from "../data/cache"

export default async function listenerListingsUpdater(eventType, eventTitle, props) {
    console.log("listenerListingsUpdater firing and clearing listings cache")
    await cache.clearCache("fetchDashboardListings")
    await cache.clearCache("fetchMyActions")
    await cache.clearCache("fetchCompletedActions")
    await cache.clearCache("fetchHiddenActions")
}