import * as firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyDTHUup3PZNa85V06KQ4_2WPBGki-gEZaQ",
    authDomain: "project77-80f32.firebaseapp.com",
    projectId: "project77-80f32",
    storageBucket: "project77-80f32.appspot.com",
    messagingSenderId: "108304264202",
    appId: "1:108304264202:web:d5048548f956036a03c3f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();