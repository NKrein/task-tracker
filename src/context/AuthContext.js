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
      return `${Math.floor(hsAgo(millis))} hora${Math.floor(hsAgo(millis))>1 ? 's' : ''}`
    } else if (hsAgo(millis)>=24 && daysAgo(millis)<30){
      return `${Math.floor(daysAgo(millis))} dia${Math.floor(daysAgo(millis))>1 ? 's' : ''}`
    } else if (daysAgo(millis)>=30 && monthAgo(millis)<12){
      return `${Math.floor(monthAgo(millis))} mese${Math.floor(monthAgo(millis))>1 ? 's' : ''}`
    } else if (monthAgo(millis)>=12) {
      return `${Math.floor(monthAgo(millis)/12)} año${Math.floor(monthAgo(millis)/12)>1 ? 's' : ''}`
    } else {
      return `${Math.floor(minAgo(millis))} minuto${Math.floor(minAgo(millis))>1 ? 's' : ''}`
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
