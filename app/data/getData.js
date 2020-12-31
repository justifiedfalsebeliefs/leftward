import authStorage from "../auth/storage";
import getEndpoint from "./config";
import { create } from "apisauce";
import wait from "../utility/wait";

export default async function getData(endpoint, params = false) {
  console.log(endpoint);
  params ? console.log(params) : null;

  async function getApi() {
    const session = await authStorage.getUserSession();
    const token = session.idToken.jwtToken;
    return create({
      baseURL: getEndpoint(),
      headers: { Authorization: `Bearer ` + token },
    });
  }

  var api = await getApi();
  var responseData = await api.post(endpoint, {}, { params: params });
  if (!responseData.ok) {
    console.log("Api error! Waiting a second and retrying...");
    if (responseData.data.hasOwnProperty("message")) {
      if (responseData.data.message == "Token is expired") {
        await Auth.currentSession() // refreshes token
          .then((data) => {
            authStorage.storeSession(data);
            console.log("Token Refreshed!");
          });
      }
    }
    console.log(responseData);
    await wait(1500);
    var api = await getApi();
    var responseData = await api.post(endpoint, {}, { params: params });
  }
  console.log("responseOk: " + responseData.ok);
  return responseData.data;
}
