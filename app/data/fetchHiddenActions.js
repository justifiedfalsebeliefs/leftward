import {getEndpoint, formatParams} from "./config"

export default async function fetchHiddenActions(setActions, guid) {
  const path = "fetchHiddenActions"
  const REST = getEndpoint(path).concat(formatParams("userGuid", guid))

  const response = await fetch(REST, { method: 'POST' })
  listings = await response.json()

  setActions(listings);}
