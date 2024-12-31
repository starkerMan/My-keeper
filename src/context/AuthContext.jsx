import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  
    const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
    const logOut = () => signOut(auth);
  
    return (
      <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };