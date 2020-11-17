import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (cognitoSession) => {
    const user = cognitoSession
    setUser(user);
    authStorage.storeSession(cognitoSession);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeSession();
  };

  return { user, logIn, logOut };
};
