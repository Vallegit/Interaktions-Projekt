import firebase from "firebase";
import * as FirebaseConfig from "./firebaseConfig";

const config = {
    apiKey: FirebaseConfig.apiKey,
    authDomain: FirebaseConfig.authDomain,
    databaseURL: FirebaseConfig.databaseURL,
    projectId: FirebaseConfig.projectId,
    storageBucket: FirebaseConfig.storageBucket,
    messagingSenderId: FirebaseConfig.messagingSenderId,
    appId: FirebaseConfig.appId,
    measurementId: FirebaseConfig.measurementId
  };


const Firebase = firebase.initializeApp(config);
export default Firebase;