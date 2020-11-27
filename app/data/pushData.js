import callApi from "./callApi"
import authStorage from "../auth/storage"

export default async function pushData(endpoint, params = false) {
    const session = await authStorage.getUserSession();
    returnData = await callApi(session.idToken.jwtToken, endpoint, params)
    return returnData}

