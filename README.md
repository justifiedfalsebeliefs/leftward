# leftward

Make the world more equal

Development environment setup
Complete the following before cloning the repo. This process is a bit jank and I'm not sure how to do it better. For now:

Complete the steps on this page - only the first page: https://docs.amplify.aws/start/getting-started/installation/q/integration/react-native

`npm install -g expo-cli `

`expo init RNAmplify`

`cd RNAmplify`

`amplify init`

```
? Enter a name for the project: leftward
? Enter a name for the environment: dev
? Choose your default editor: <Your favorite text editor>
? Choose the type of app that you're building: javascript
? What javascript framework are you using: react-native
? Source Directory Path:  /
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you want to use an AWS profile? Y
? Please choose the profile you want to use: <Your AWS profile from the configuration step>
```

`npm install aws-amplify aws-amplify-react-native @react-native-community/netinfo`

Clone this repo to the directory that the RNAmplify folder was created in - it should just contain the leftward folder and the RNAmplify folder at this point

Copy everything from the cloned repo directory (leftward) into the RNAmplify directory.
Delete the assets folder (this was created by amplify)

Back in the RNAmplify folder, run:
`amplify add auth`

```
 Do you want to use the default authentication and security configuration? Manual configuration
 Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM co
ntrols (Enables per-user Storage features for images or other content, Analytics, and more)
 Please provide a friendly name for your resource that will be used to label this category in the project: (default)
 Please enter a name for your identity pool. (default)
 Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) No
 Do you want to enable 3rd party authentication providers in your identity pool? No
 Please provide a name for your user pool: (default)
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to add User Pool Groups? Yes
? Provide a name for your user pool group: Admin
? Do you want to add another User Pool Group Yes
? Provide a name for your user pool group: orgContributor
? Do you want to add another User Pool Group Yes
? Provide a name for your user pool group: defaultUser
? Do you want to add another User Pool Group No
√ Sort the user pool groups in order of preference · Admin, orgContributor, defaultUser
 Do you want to add an admin queries API? No
 Multifactor authentication (MFA) user login options: OFF
 Email based user registration/forgot password: Enabled (Requires per-user email entry at registration)
 Please specify an email verification subject: Your verification code
 Please specify an email verification message: Your verification code is {####}
 Do you want to override the default password policy for this User Pool? No
 Warning: you will not be able to edit these selections.
 What attributes are required for signing up? Email
 Specify the app's refresh token expiration period (in days): 30
 Do you want to specify the user attributes this app can read and write? No
 Do you want to enable any of the following capabilities?
 Do you want to use an OAuth flow? No
? Do you want to configure Lambda Triggers for Cognito? No
```

`amplify add api`

```
? Please select from one of the below mentioned services: GraphQL
? Provide API name: leftward
? Choose the default authorization type for the API Amazon Cognito User Pool
Use a Cognito user pool configured as a part of this project.
? Do you want to configure advanced settings for the GraphQL API Yes, I want to make some additional changes.
? Configure additional auth types? No
? Configure conflict detection? No
? Do you have an annotated GraphQL schema? Yes
? Provide your schema file path: .\amplify\backend\api\leftwardmvptest\schema.graphql
```

`amplify push`

accept all defaults

Congrats! You've completely configured a connected back end for the app! You can manage things in these places:

- Cognito is where user stuff is handled.
- Appsync is where data goes
- Other stuff is probably somewhere but that's basically all I use

Now in the RNAmplify folder, we need to configure the NPM environment:
`npm i`

(you might have to install expo here too?)
Configure an android virtual device - follow Mosh's instructions at 18 minutes: https://www.youtube.com/watch?v=0-S5a0eXPoc&t=1490s

To run the app:
open the AVD

`expo start`

`a`

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

Now, go to Cognito. Add two custom attributes: "causes" and "attributes". Keep other settings default.

Now EVERYTHING should work and be hooked up to the back end! Woo!!!

Now how to clean up the git jank...

```
git init
git remote add origin url_on_github
git fetch origin
git reset origin/master
git commit
git push --set-upstream origin master
```
