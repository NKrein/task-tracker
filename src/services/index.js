import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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

export const googleAuth = () => {
  return new firebase.auth.GoogleAuthProvider();
}
