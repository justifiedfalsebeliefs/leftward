import {getEndpoint, formatParams} from "./config"
import authStorage from "../auth/storage";

export default async function fetchUserExperience(guid) {
  const path = "fetchUserExperience"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid))
  const token = await authStorage.getToken()
  
  const response = await fetch(REST, { 
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ` + token
    }) })
  experience = await response.json()
    return experience[0];}
