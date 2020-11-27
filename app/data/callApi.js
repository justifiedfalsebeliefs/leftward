import getEndpoint from "./config"
import formatParams from "./formatParams"

export default async function callApi(token, endpoint, params = false) {
    var url = getEndpoint(endpoint)
    url = formatParams(url, params)

    const response = await fetch(url, { 
        method: 'POST',
        headers: new Headers({
        'Authorization': `Bearer ` + token
        }) })
    responseData = await response.json()

    return responseData;}
