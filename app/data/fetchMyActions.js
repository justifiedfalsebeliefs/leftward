import {getEndpoint, formatParams} from "./config"

export default async function fetchMyActions(setActions, guid) {
  const path = "fetchMyActions"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid))

  const response = await fetch(REST, { method: 'POST' })
  listings = await response.json()

  setActions(listings);}
