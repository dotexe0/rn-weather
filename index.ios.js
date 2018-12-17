import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8rkLDGKTq-upbQBXNvzhlnYSjdmmcvAY",
  authDomain: "rn-weather.firebaseapp.com",
  databaseURL: "https://rn-weather.firebaseio.com",
  projectId: "rn-weather",
  storageBucket: "rn-weather.appspot.com",
  messagingSenderId: "18653770946"
};
firebase.initializeApp(config);
