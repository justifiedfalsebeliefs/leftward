import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  // const getAttributes = async () => {
  //   try {
  //     const cognitoAttributes = await Auth.currentUserInfo();
  //     return cognitoAttributes.attributes;
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // const getCognito = async () => {
  //   try {
  //     const cognitoToken = await Auth.currentAuthenticatedUser();
  //     return cognitoToken;
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    // Commented sections have the issue with only returning a promise and not actually getting the info.
    // user.attributes = getAttributes();
    // user.cognitoToken = getCognito();
    setUser(user);
    // console.log(user.attributes);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
