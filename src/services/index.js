import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYkccly-23jc7bGoXZaIz_2TSK-nUCPhE",
  authDomain: "task-tracker-e0844.firebaseapp.com",
  projectId: "task-tracker-e0844",
  storageBucket: "task-tracker-e0844.appspot.com",
  messagingSenderId: "658354945093",
  appId: "1:658354945093:web:2fedd11043b5353417b72c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const getFirebase = () => {
  return app;
}

export const getFirestore = () => {
  return firebase.firestore(app);
}

export const getStorage = () => {
  return firebase.storage();
}

//Auth Config
export const auth = () => {
  return app.auth();
}
