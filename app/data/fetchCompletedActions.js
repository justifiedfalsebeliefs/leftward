import {getEndpoint, formatParams} from "./config"
import authStorage from "../auth/storage";

export default async function fetchCompletedActions(guid) {
  const path = "fetchCompletedActions"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid))
  const token = await authStorage.getToken()

  const response = await fetch(REST, { 
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ` + token
    }) })
  listings = await response.json()

  return listings;}
