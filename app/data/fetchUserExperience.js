import {getEndpoint, formatParams} from "./config"

export default async function fetchUserExperience(guid) {
  const path = "fetchUserExperience"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid))

  const response = await fetch(REST, { method: 'POST' })
  experience = await response.json()
    return experience[0];}
