import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from './App';
import {
    FirebaseAppProvider,
    useFirestore,
    SuspenseWithPerf,
    useFirestoreCollectionData
} from "reactfire";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'

dotenv.config();


const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_DATABASE_URL,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID
} = process.env;

// this is my config. Fork this StackBlitz workspace
// and add your own Firebase config to watch the
// burrito status update in real time
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
};

function Root() {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </FirebaseAppProvider>
    );
}

// Enable Concurrent Mode
// https://reactjs.org/docs/concurrent-mode-adoption.html#enabling-concurrent-mode
ReactDOM.render(<Root/>, document.getElementById('root'));
serviceWorker.unregister();