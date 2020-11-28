import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (cognitoSession) => {
    const user = cognitoSession
    setUser(user);
    authStorage.storeSession(cognitoSession);
  };

  const logOut = () => {
    setUser(null);
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys))
    authStorage.removeSession();
  };

  return { user, logIn, logOut };
};
