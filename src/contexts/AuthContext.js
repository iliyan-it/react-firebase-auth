import React, { useContext, useState, useEffect } from "react";
import firebaseAuthApp from "./firebaseAuthApp";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(firebaseAuthApp, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseAuthApp, email, password);
  }

  function logout() {
    return signOut(firebaseAuthApp);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(firebaseAuthApp, email, {
      url: window.location.origin,
    });
  }

  function updateEmail(email) {
    return firebaseUpdateEmail(user, email);
  }

  function updatePassword(password) {
    return firebaseUpdatePassword(user, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuthApp, (user) => {
      setUser(user);
      setLoadingUser(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loadingUser && children}
    </AuthContext.Provider>
  );
}
