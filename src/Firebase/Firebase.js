import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as FirebaseConfig from "./firebaseConfig";

const firebaseConfig = {
    apiKey: FirebaseConfig.apiKey,
    authDomain: FirebaseConfig.authDomain,
    databaseURL: FirebaseConfig.databaseURL,
    projectId: FirebaseConfig.projectId,
    storageBucket: FirebaseConfig.storageBucket,
    messagingSenderId: FirebaseConfig.messagingSenderId,
    appId: FirebaseConfig.appId,
    measurementId: FirebaseConfig.measurementId
  };


class Firebase {
    constructor(){
        app.initializeApp(config);
    }
}
export default Firebase;