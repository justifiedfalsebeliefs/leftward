import callApi from "./callApi"
import authStorage from "../auth/storage"

export default async function getData(endpoint, params = false) {
    const session = await authStorage.getUserSession();
    // If there is nothing in the cache for that endpoint
        // Go get it from endpoint. Update cache value
    // If there is something in the cache
        // If the timestamp is older than 10 minutes, get and update
        // If not, return cache value
    
    // Case: push?
    // Case: force update?
    returnData = await callApi(session.idToken.jwtToken, endpoint, params)
    return returnData}

