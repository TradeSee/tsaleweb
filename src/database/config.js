import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "aaaaaaaaaaaaaaa",
  authDomain: "aaaaaaaaaaaaa",
  databaseURL: "aaaaaaaaaaa",
  projectId: "aaaaaaaaaa",
  storageBucket: "aaaaaaaaaa.aaaaaaaaaaaaaaaa.com",
  messagingSenderId: "aaaaaaaaaa",
  appId: "1aaaaaaaaaaa",
  measurementId: "aaaaaaaaaaa",
  storageBucket: "gs://aaaaaaaaaa.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();
