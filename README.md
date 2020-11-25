# Leftward

## Removing the barriers between Values and Action

To provision a dev back end, here's the high level overview:

- Clone and set up expo environment
- Configure an Android AVD
- Build a Python Flask Server
- Build a MySQL database
- Point the app at your Flask server and dev amplitude

## Clone and set up expo environment.

In the folder you want do manage the project in (create a project directory):

`npm install -g expo-cli `

`expo init leftward`

- blank managed workflow

`npm install aws-amplify aws-amplify-react-native @react-native-community/netinfo`

Clone the repo to a different folder, then copy the contents into the newly created leftward folder. Overwrite all. You can remove the original folder you cloned to now. Change directory into leftward.

`git remote add origin https://github.com/justifiedfalsebeliefs/leftward`

`git reset origin/master`

`npm i`

For your own Cognito user pool follow the instructions at the end of the document. Unless you want to, skip it and use shared dev information.

## Configure an Android AVD

Download Android Studio. Install it using defaults. Run it. Don't import settings.
To run a virtual device, do configure > AVD manager. Set up a phone and launch it.

To run the app, open the AVD

`expo start`

`a`

# Back End

## Build a MySQL database

Download and install MySQL Server https://dev.mysql.com/downloads/mysql/
Set it up with defaults and get a server running on localhost (todo: add detail)
in devbackend/sql, run createdb.sql then create_test_data.sql

## Build a Python Flask Server

In the devbackend folder, pip install requirements.txt
Update env variables to reflect config.py - replace all with your credentials. `setx MY_ENV_VAR "<some secret>"`
run init.py

## Point the app at your Flask server and dev amplitude

update slug in data/config.js to "http://10.0.2.2:5000/"
todo: dev amplitude

You're done!

### Optional: Configuring your own Cognito User Pool.

---

Create a user pool in AWS Cognito: - Username sign in - Case insensitive - Email required - Remove password character requirements for your own sanity - Custom attributes: causes and userGuid - Add a lambda trigger when prompted: [readme] - All default until add an app client - do so. - Create and record the app client id, don't generate a secret. - Fill out amplifyConfig.js in app/auth

As a final step, we need to implement a lambda function to auto-authorize users. This skips the step of needing to verify an email to log in.

- Go to AWS console and open Lambda
- Create a new function called "autoAuthorize"
- Dump in this code and save it:

```
exports.handler = (event, context, callback) => {
        event.response.autoConfirmUser = true;
    callback(null, event);
};
```

Then go to your user pool on Cognito, click "Triggers" on the side, and set pre sign-up to autoAuthorize. Save.

Now, go to Cognito. Add custom attributes: "causes" and "userGuid". Keep other settings default.
