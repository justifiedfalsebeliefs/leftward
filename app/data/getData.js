import callApi from "./callApi"
import authStorage from "../auth/storage"
import cache from "./cache"

export default async function getData(endpoint, params = false) {
    const session = await authStorage.getUserSession();
    if (params){
        const stringParams = JSON.stringify(params)
        var cacheKey = endpoint.concat(stringParams)
    } else {
        var cacheKey = endpoint
    }
    var storageObject = await cache.getData(cacheKey)
    if (storageObject){
        console.log('using cached response for cacheKey: '.concat(cacheKey))
        return storageObject.data
    }
    responseData = await callApi(session.idToken.jwtToken, endpoint, params)
    if (responseData !== null){
        await cache.cacheData(responseData, cacheKey)
        console.log("refreshed the cache for cacheKey: ".concat(cacheKey))}
    return responseData
    }

