import {getEndpoint, formatParams} from "./config"
import authStorage from "../auth/storage";

export default async function fetchDashboardListings(guid, cause) {
  const path = "fetchDashboardListings"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid)).concat(formatParams("userCause", cause))
  const token = await authStorage.getToken()

  const response = await fetch(REST, { 
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ` + token
    })  
  })
  listings = await response.json()
  return listings;}
