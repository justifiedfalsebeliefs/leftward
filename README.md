Moved to https://github.com/leftward-app


# Leftward

## Removing the barriers between Values and Action

Dev Environment Instructions

## Clone and set up Expo

In the folder you want do manage the project in (create a project directory):

`npm install -g expo-cli ` - `expo init leftward` - blank managed workflow

Clone the repo to a different folder, then copy the contents into the newly created Leftward folder, overwriting everything you are propted to.

From the Leftward folder: `git remote add origin https://github.com/justifiedfalsebeliefs/leftward` - `git reset origin/master` - `npm i`

# Back End

Ask Luke for keys - or configure your own Cognito environment and update app/auth/amplifyConfig.js and backend/docker-compose.yml.

From Leftward/back end: `docker-compose up`

## Configure an Android AVD and launch the app

Download Android Studio. Install it using defaults. Don't import settings.
To run a virtual device, do configure > AVD manager. Set up a phone and launch it.

With the AVD open: `expo start` - `a`
