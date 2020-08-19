const express = require('express');
const firebase = require('firebase');
var admin = require("firebase-admin");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8081;

const errorHandler = require('./src/middlewares/error.handler');

const allowCrossDomain = function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
};
// var firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyAk3EWl1CTdCiFI6LE2gbTLbPqaBR410nc",
  authDomain: "iotnongnghiep-75821.firebaseapp.com",
  databaseURL: "https://iotnongnghiep-75821.firebaseio.com",
  projectId: "iotnongnghiep-75821",
  storageBucket: "iotnongnghiep-75821.appspot.com",
  messagingSenderId: "505810406746",
  appId: "1:505810406746:web:d0d70d3623e87ec87b3763",
  measurementId: "G-RHW0KW4SVN"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


app.use(allowCrossDomain);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('hi')
// })
app.get('/', function (req, res) {
  
  console.log("HTTP Get Request");
  res.send("HTTP GET Request");
  //Insert key,value pair to database
  firebase.database().ref('/TestMessages').set({TestMessage: 'GET Request thu'});
  
});

app.get('/thu', function (req, res) {
  // firebase.database.enableLogging(true)
    console.log("HTTP Get Request");
  var userReference = firebase.database().ref('/thu');
  // .set({TestMessage: 'GET Request'})
    //Attach an asynchronous callback to read the data
    // userReference.on("value", function(snapshot) {
    //     console.log(snapshot.val());
    //   });
      res.send('hi')
	// userReference.once("value", 
	// 		  function(snapshot) {
	// 				console.log(snapshot.val());
	// 				res.json(snapshot.val());
	// 				userReference.off("value");
	// 				}, 
	// 		  function (errorObject) {
	// 				console.log("The read failed: " + errorObject.code);
	// 				res.send("The read failed: " + errorObject.code);
	// 		 });
  });

app.use(errorHandler.errorHandler());

app.listen(port, () => console.log(`Server is listening on port ${port}...`));