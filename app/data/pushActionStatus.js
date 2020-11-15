import {getEndpoint, formatParams} from "./config"
import authStorage from "../auth/storage";

export default async function pushActionStatus(guid, status, actionId) {
const path = "pushActionStatus"

const REST = getEndpoint(path)
.concat(formatParams("userGuid", guid))
.concat(formatParams("statusUpdate", status))
.concat(formatParams("actionId", actionId.toString()))

const token = await authStorage.getToken()

return response = await fetch(REST, { 
    method: 'POST', 
    headers: new Headers({
        'Authorization': `Bearer ` + token
      }) 
    })
}
