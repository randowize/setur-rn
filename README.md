# RNSetur


The project includes:

- React Native
- React Navigation
- TypeScript
- React Native Testing Library
- Firestore
- React Hooks

## Quick Start

The project's structure is like this (Modified Ignite template):



```
rn-setur-project

├── app
│   ├── components
│   ├── config
|   |-- features(different app screens)
│   ├── modules
│   ├── navigation
│   ├── services
│   ├── theme
|   |-- utils
│   ├── app.tsx
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests

└── package.json

```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
app
│── components
│── i18n
├── models
├── navigation
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**modules**
This is where transversal functionalities such as storage, i18n, ui-parsing reside.



**navigation**
This is where your `react-navigation` navigators will live.

**features**
This is where your screen components will live. A feature represent an view with which the end user will interact with your application. It's similar to a page if we were to transpose it to the atomic design methodology. It's React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.


**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application. This is also where you will specify whether you want to run the app in storybook mode.



### ./storybook directory

This is where your stories will be registered and where the Storybook configs will live

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

## Running the Project

1- Setup a Firestore project and open `app/config/end.{dev,prod}` to replace the firestore credentials. [More details for firestore project configuration](https://firebase.google.com/docs/firestore/quickstart). You can also use the default config provided in the project


2- run `yarn install` or `npm install` in a terminal window


2- Open 2 terminal windows


3- In the first terminal run `yarn start` (or `npm run start`)


4- In the second terminal run `yarn run ios` (or `npm run ios`)


## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server.

In `index.js`, change `SHOW_STORYBOOK` to `true` and reload the app.
For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.


