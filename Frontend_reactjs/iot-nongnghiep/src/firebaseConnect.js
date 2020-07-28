import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAk3EWl1CTdCiFI6LE2gbTLbPqaBR410nc",
  authDomain: "iotnongnghiep-75821.firebaseapp.com",
  databaseURL: "https://iotnongnghiep-75821.firebaseio.com",
  projectId: "iotnongnghiep-75821",
  storageBucket: "iotnongnghiep-75821.appspot.com",
  messagingSenderId: "505810406746",
  appId: "1:505810406746:web:7edeb37233043d577b3763",
  measurementId: "G-5DCD16XN1P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseConnect = firebase.database().ref();


