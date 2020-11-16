import {getEndpoint, formatParams} from "./config"
import authStorage from "../auth/storage";

export default async function pushCalcExp(guid) {
const path = "pushCalcExp"

const REST = getEndpoint(path).concat(formatParams("userGuid", guid))
const token = await authStorage.getToken()

return response = await fetch(REST, { 
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ` + token
    }) 
 })
}
