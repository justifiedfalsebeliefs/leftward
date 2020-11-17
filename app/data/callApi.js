import {getEndpoint, formatParams} from "./config"
import { Auth } from "aws-amplify";

export default async function callApi(endpoint, params = false) {
  const token = await Auth.currentAuthenticatedUser();
  const url = getEndpoint(endpoint)

  if (params){
      url = url.concat(formatParams(params[0].key, params[0].value, first=true))
      if (params.length > 1) {
          for (i = 1; i < params.length; i++){
              url = url.concat(formatParams(params[i].key, params[i].value))
          }}}

  const response = await fetch(url, { 
    method: 'POST',
    headers: new Headers({
      'Authorization': `Bearer ` + token.signInUserSession.idToken.jwtToken
    }) })
  responseData = await response.json()

  return responseData;}
