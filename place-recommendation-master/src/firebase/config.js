import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCdgqRPxnClt7VLUonqJ1W8SicS77SaV38",
    authDomain: "be-project-bcb43.firebaseapp.com",
    projectId: "be-project-bcb43",
    storageBucket: "be-project-bcb43.appspot.com",
    messagingSenderId: "365827047201",
    appId: "1:365827047201:web:2385bc87e67172e3710860",
    measurementId: "G-R49EZNBRTX"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //initialize authentication
  const projectAuth = firebase.auth()
  //initialize firestore
  const projectFirestore = firebase.firestore()

  const projectStorage = firebase.storage()


  export { projectAuth, projectFirestore, projectStorage }