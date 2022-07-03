/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import AppEnumeratedComponent from './app-components/AppEnumeratedComponent';
import AppExampleOtherInstanceOfReact from './app-components/AppExampleOtherInstanceOfReact';
import reportWebVitals from "./reportWebVitals";

window.React = React;

/**
 *
 * @description onDocumentReady event\Listener
 */
// eslint-disable-next-line func-names
document.addEventListener("DOMContentLoaded", function () {
  // FIRST EXAMPLE
  ReactDOM.render(
    <React.StrictMode>
      <AppEnumeratedComponent/>
    </React.StrictMode>,
    document.getElementById("react-root-app1")
  );

  // SECOND EXAMPLE
  ReactDOM.render(
    <React.StrictMode>
      <AppExampleOtherInstanceOfReact/>
    </React.StrictMode>,
    document.getElementById("react-root-app2")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
