import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (cognitoSessionObject) => {
    const user = jwtDecode(cognitoSessionObject.idToken.jwtToken);
    user.attributes = {
      "custom:GQLuserID":
        cognitoSessionObject.idToken.payload["custom:GQLuserID"],
      "custom:actions": cognitoSessionObject.idToken.payload["custom:actions"],
      "custom:causes": cognitoSessionObject.idToken.payload["custom:causes"],
      email: cognitoSessionObject.idToken.payload.email,
    };
    setUser(user);
    authStorage.storeToken(cognitoSessionObject.accessToken.jwtToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
