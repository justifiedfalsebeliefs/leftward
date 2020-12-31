import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "../data/getData";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (cognitoSession, newUser = false) => {
    const user = cognitoSession;
    await authStorage.storeSession(cognitoSession);
    newUser ? await getData("createNewUser") : null;
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
    authStorage.removeSession();
  };

  return { user, logIn, logOut };
};
