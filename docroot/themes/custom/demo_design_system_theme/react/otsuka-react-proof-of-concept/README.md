# Getting Started: Otsuka React Components

How to managing content:

In the `src/index.js` file, we define one or more `ReactDOM.render()` methods, depending on how many React "containers" we need, then add the container id to the `public/index.html` file (to be able to work with this container on localhost)


## How To Start

```bash
yarn install
yarn start
```

## Pre Requirements

- `NodeJs` (recommended version of node: v14.0.0),
- `Yarn` (recommended version of Yarn: 1.22.0).

- `eslintrc` is in scope of this project. It would be nice to have it configured and turned on :)

## File structure
```
 package.json
 src
  ├─ App.jsx
  ├─ dist -> compiled-js.js //folder for React application to implemnt on Drupal side
  ├─ App.test.jsx
  ├─┬ assets
  │ └── scss
  │   └── functions.scss
  │   └── main.scss      //hub for every scss file
  │   └── variables.scss
  └── scenes             // folder for "views" - combination of components
  │    └── RootComponent  // folder, all children components
  │     └── hooks.js     // hooks in this localization are mainly responsible for provide data
  │     └── index.jsx
  └── services
  │   └── api
  │     └── constants
  │     └── requests.js // folder for generic HTTP methods
  │     └── utils
  └── shared
      └── components   //  components that could be shared in whole application
      └── mocks        //  folder for mocked data
      └── utils        //  folder for functions that could be shared in whole application
	   └── api
```

## Available Scripts

- `yarn start` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn run build` - Builds the app for production to the `dist` folder.
- `yarn test` - Launches the test runner.
- `yarn test --coverage` - Launches the test runner and generate test coverage report.

## Production build

 In case that we want implemnt React on Drupal application side after command `yarn run build` we are able to put production build on Drupal side, example folder path: ` drupal-otsuka\otsk-docker4drupal\themes\otsk-sandboxes\themes\custom\demo_design_system_theme\assets\react\react-production-build.js`.
After doing so, add a new dependency to the Drupal configuration file, for example `demo_design_system_theme.libraries.yml`.
