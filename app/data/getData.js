import callApi from "./callApi"
import authStorage from "../auth/storage"

export default async function getData(endpoint, params = false) {
    const session = await authStorage.getUserSession();
    return await callApi(session.idToken.jwtToken, endpoint, params)
    }

