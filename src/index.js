import React from "react";
import ReactDOM from "react-dom";
import "./css-reset.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Parse from "parse";

Parse.initialize(
  process.env.REACT_APP_PARSE_CLIENT_KEY,
  process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
