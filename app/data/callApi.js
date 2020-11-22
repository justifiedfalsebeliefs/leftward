import {getEndpoint, formatParams} from "./config"

export default async function callApi(user, endpoint, params = false) {
    var url = getEndpoint(endpoint)
    if (params){
        url = url.concat(formatParams(params[0].key, params[0].value, true))
        if (params.length > 1) {
            var i;
            for (i = 1; i < params.length; i++){
                url = url.concat(formatParams(params[i].key, params[i].value))
            }}}

    const response = await fetch(url, { 
        method: 'POST',
        headers: new Headers({
        'Authorization': `Bearer ` + user.idToken.jwtToken
        }) })
    responseData = await response.json()

    return responseData;}
