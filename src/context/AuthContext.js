import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services';
import firebase from 'firebase/app';

export const AuthContext = createContext();

const AuthContextProvider = ( { children } ) => {
  
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState();

  const signUp = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
  }

  const emailVerification = () => {
    return auth().currentUser.sendEmailVerification()
  }

  const userUpdate = (name, photo='https://firebasestorage.googleapis.com/v0/b/task-tracker-e0844.appspot.com/o/user.png?alt=media&token=b2ff7a06-41af-4166-8819-af6d6cd1137e') => {
    return auth().currentUser.updateProfile({
      displayName: name,
      photoURL: photo
    })
  }

  const logIn = (email, password) => {
    setLoading(email)
    return auth().signInWithEmailAndPassword(email, password)
  }

  const logOut = () => {
    return auth().signOut()
  }

  const resetPassword = (email) => {
    return auth().sendPasswordResetEmail(email)
  }
  
  //---------------------------------------------------------------Time

  const timeNow = firebase.firestore.Timestamp.fromDate(new Date())

  const minAgo = (millis) => {
    return ((timeNow.toDate()-millis.toDate())/60000)
  }

  const hsAgo = (millis) => {
    return (minAgo(millis)/60)
  }

  const daysAgo = (millis) => {
    return (hsAgo(millis)/24)
  }

  const monthAgo = (millis) => {
    return (daysAgo(millis)/30)
  }

  const timeAgo = (millis) => {
    if (minAgo(millis)>=60 && hsAgo(millis)<24){
      return `${Math.floor(hsAgo(millis))} hour${Math.floor(hsAgo(millis))>1 ? 's' : ''}`
    } else if (hsAgo(millis)>=24 && daysAgo(millis)<30){
      return `${Math.floor(daysAgo(millis))} day${Math.floor(daysAgo(millis))>1 ? 's' : ''}`
    } else if (daysAgo(millis)>=30 && monthAgo(millis)<12){
      return `${Math.floor(monthAgo(millis))} month${Math.floor(monthAgo(millis))>1 ? 's' : ''}`
    } else if (monthAgo(millis)>=12) {
      return `${Math.floor(monthAgo(millis)/12)} year${Math.floor(monthAgo(millis)/12)>1 ? 's' : ''}`
    } else {
      return `${Math.floor(minAgo(millis))} minute${Math.floor(minAgo(millis))>1 ? 's' : ''}`
    }
  }
  //--------------------------------------------------------------------

  useEffect (()=>{
    auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    })
  },[])

  console.log(currentUser)

  const value = { 
    currentUser, 
    signUp,
    emailVerification,
    userUpdate,
    logIn, 
    logOut, 
    resetPassword, 
    timeNow, 
    timeAgo 
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
