import firebase from "firebase";

  const firebaseConfig = {
  apiKey: "AIzaSyCo3GIxJ_WTstoas4rsptLGrqOJ6vGNAw8",
  authDomain: "testelcalculator.firebaseapp.com",
  projectId: "testelcalculator",
  storageBucket: "testelcalculator.appspot.com",
  messagingSenderId: "861762964692",
  appId: "1:861762964692:web:fd60d39923a5f965fabf41",
  measurementId: "G-9RY5GJVYC4"
};
  // Initialize Firebase
	firebase.initializeApp(firebaseConfig);

export default firebase;