// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHZ0-qp6ot6PkSh5T07H66lGff1IZXKrs",
  authDomain: "tasks-21a9b.firebaseapp.com",
  projectId: "tasks-21a9b",
  storageBucket: "tasks-21a9b.appspot.com",
  messagingSenderId: "254649859848",
  appId: "1:254649859848:web:fcc84b03974539b8def6bd",
  measurementId: "G-TK843H5QN2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
