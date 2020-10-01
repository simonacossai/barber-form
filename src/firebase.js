import React from 'react';
import firebase from "firebase/app"
import "firebase/firestore";

var config = {
    apiKey: "AIzaSyDcyWX-LtRtOatlOyEwp0o3jkLyFXG-Wxc",
    authDomain: "barber-form.firebaseapp.com",
    databaseURL: "https://barber-form.firebaseio.com",
    projectId: "barber-form",
    storageBucket: "barber-form.appspot.com",
    messagingSenderId: "795973899626",
    appId: "1:795973899626:web:f05d6ac30400af30790113",
    measurementId: "G-D125F66HEX"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
 

  export const firestore = firebase.firestore()
  export default firebase
  const db = firebase.firestore();
  export { db };