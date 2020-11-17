import * as SecureStore from "expo-secure-store";

const key1 = "accessToken";
const key2 = "idToken";
const key3 = "refreshToken";


const storeSession = async (cognitoSession) => {
  try {
    await SecureStore.setItemAsync(key1, JSON.stringify(cognitoSession.accessToken));
    await SecureStore.setItemAsync(key2, JSON.stringify(cognitoSession.idToken));
    await SecureStore.setItemAsync(key3, JSON.stringify(cognitoSession.refreshToken));
  } catch (error) {
    console.log("Error storing the session", error);
  }
};

const getSession = async () => {
  try {
    const serialized1 = await SecureStore.getItemAsync(key1)
    const serialized2 = await SecureStore.getItemAsync(key2)
    const serialized3 = await SecureStore.getItemAsync(key3)
    const accessToken = JSON.parse(serialized1)
    const idToken = JSON.parse(serialized2)
    const refreshToken = JSON.parse(serialized3)
    const session = {accessToken, idToken, refreshToken}
    if (session.accessToken === null){
      return null
    }
    return session;
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUserSession = async () => {
  const session = await getSession();
  return session ? session : null;
};

const removeSession = async () => {
  try {
    await SecureStore.deleteItemAsync(key1);
    await SecureStore.deleteItemAsync(key2);
    await SecureStore.deleteItemAsync(key3);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getSession, getUserSession, removeSession, storeSession };
