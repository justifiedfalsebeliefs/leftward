import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { Auth } from "aws-amplify";

export default function refreshToken() {
    const useMountEffect = (fun) => useEffect(fun, []);
    const { user, logIn } = useAuth();
    useMountEffect(() => {
        if (user.idToken.payload.exp <= Math.round(Date.now() / 1000)){
            console.log("refreshing token")
            Auth.currentSession().then((data) => {logIn(data);}) // amplify's auth.currentSession() will take a token and refresh it.
        }
    })
}