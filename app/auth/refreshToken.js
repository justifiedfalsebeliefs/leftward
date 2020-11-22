if (user.idToken.payload.exp <= Math.round(Date.now() / 1000)){
    console.log("refreshing token")
    user = await Auth.currentSession();
} 