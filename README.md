# leftward

Values to Action

To provision a dev back end, here's the high level overview:

- Configure Cognito and AWS Amplify, Configure an Android AVD, Clone the Repo
- Build a Python Flask Server
- Build a MySQL database
- Point the app at your Flask server and dev amplitude

**Configure Cognito and AWS Amplify, Configure an Android AVD, Clone the Repo.**

In the folder you want do manage the project in (create a project directory):

`npm install -g @aws-amplify/cli`

`amplify configure`

Once you’re signed in, Amplify CLI will ask you to create an IAM user.

```
Specify the AWS Region
? region:  # Your preferred region
Specify the username of the new IAM user:
? user name:  # User name for Amplify IAM user
Complete the user creation using the AWS console
```

Create a user with AdministratorAccess to your account to provision AWS resources for you like AppSync, Cognito etc.

Once the user is created, Amplify CLI will ask you to provide the accessKeyId and the secretAccessKey to connect Amplify CLI with your newly created IAM user.

```
Enter the access key of the newly created user:
? accessKeyId:  # YOUR_ACCESS_KEY_ID
? secretAccessKey:  # YOUR_SECRET_ACCESS_KEY
This would update/create the AWS Profile in your local machine
? Profile Name:  # (default)

Successfully set up the new user.
```

`npm install -g expo-cli `

`expo init RNAmplify`

- blank managed workflow

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

`amplify push`

accept all defaults

Congrats! You've completely configured auth for the app! In the AWS console, Cognito is where user stuff is handled.

Now in the RNAmplify folder, we need to configure the NPM environment:
`npm i`

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

Now, go to Cognito. Add three custom attributes: "causes", "attributes" and "GQLuserID". Keep other settings default.

Configure an Android AVD
Download Android Studio. Install it using defaults. Run it. Don't import settings.
To run a virtual device, do configure > AVD manager. Set up a phone and launch it.

To run the app, open the AVD

`expo start`

`a`

Now how to clean up the git jank...

```
git init
git remote add origin url_on_github
git fetch origin
git reset origin/master
git commit
git push --set-upstream origin master
```

**Build a MySQL database**
Download and install MySQL Server https://dev.mysql.com/downloads/mysql/
Set it up with defaults and get a server running on localhost (todo: add detail)
in devbackend/sql, run createdb.sql then create_test_data.sql

**Build a Python Flask Server**
In the devbackend folder, pip install requirements.txt
Update env variables to reflect config.py - replace all with your credentials. `setx MY_ENV_VAR "<some secret>"`
run init.py

**Point the app at your Flask server and dev amplitude**
update slug in data/config.js to "http://10.0.2.2:5000/"
todo: dev amplitude
