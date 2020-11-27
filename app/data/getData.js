import callApi from "./callApi"
import authStorage from "../auth/storage"
import cache from "./cache"

export default async function getData(endpoint, params = false) {
    const session = await authStorage.getUserSession();
    const stringParams = JSON.stringify(params)
    const cacheKey = endpoint.concat(stringParams)
    var refreshCache, storageObject = await cache.getData(cacheKey)
    if(refreshCache){
        responseData = await callApi(session.idToken.jwtToken, endpoint, params)
        await cache.cacheData(responseData, cacheKey)
        var refreshCache, storageObject = await cache.getData(cacheKey)
        console.log("refreshed the cache")
    } else {
        console.log('using cached response')
    }
    return storageObject.data}

