import {getEndpoint, formatParams} from "./config"
import authStorage from "../auth/storage";

export default async function pushNewUserGuid(guid) {
const path = "pushNewUserGuid"

const REST = getEndpoint(path).concat(formatParams("newGuid", guid))
const token = await authStorage.getToken()

return response = await fetch(REST, { 
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ` + token
    }) 
 })
}
