import {getEndpoint, formatParams} from "./config"

export default async function fetchDashboardListings(guid, cause) {
  const path = "fetchDashboardListings"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid)).concat(formatParams("userCause", cause))

  const response = await fetch(REST, { method: 'POST' })
  listings = await response.json()
  return listings;}
