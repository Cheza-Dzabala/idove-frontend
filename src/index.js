import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  FirebaseAppProvider,
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollectionData,
} from "reactfire";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import dotenv from "dotenv";
import "./index.css";
import { ParseContext, LiveQueryContext } from "./contexts/RealtimeContext";
const Parse = require("parse");

Parse.initialize("hermes", "sjs99sm3992w", "nsndjksdjhsdu3");
Parse.serverURL = "http://localhost:1337/hermes";
Parse.liveQueryServerURL = "ws://localhost:1337/hermes";
var client = new Parse.LiveQueryClient({
  applicationId: "hermes",
  serverURL: "ws://localhost:1337/hermes",
  javascriptKey: "sjs99sm3992w",
});

function Root() {
  return (
    <ParseContext.Provider value={Parse}>
      <LiveQueryContext.Provider value={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LiveQueryContext.Provider>
    </ParseContext.Provider>
  );
}

// Enable Concurrent Mode
// https://reactjs.org/docs/concurrent-mode-adoption.html#enabling-concurrent-mode
ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
