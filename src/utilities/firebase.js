// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyAlEc8E6DVrfdTySVyQpDsZrQjIfK29rBc",
    authDomain: "vue-3-tutorial.firebaseapp.com",
    databaseURL: "https://vue-3-tutorial.firebaseio.com",
    projectId: "vue-3-tutorial",
    storageBucket: "vue-3-tutorial.appspot.com",
    messagingSenderId: "624469447140",
    appId: "1:624469447140:web:3b1c0db1a666686b4b77f1"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;