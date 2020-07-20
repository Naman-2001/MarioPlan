import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCocdPqQTm6S5LaG0uGif5aGher5Xlotjw",
  authDomain: "project-planner-awesome.firebaseapp.com",
  databaseURL: "https://project-planner-awesome.firebaseio.com",
  projectId: "project-planner-awesome",
  storageBucket: "project-planner-awesome.appspot.com",
  messagingSenderId: "1059959410378",
  appId: "1:1059959410378:web:59d1a5d77f48b022fdae33",
  measurementId: "G-G2FRFVWDEN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
