import { useState, useEffect } from "react";
import firebase from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (firstName, lastName, email, password) => {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
      alert("User registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(firebase.auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(firebase.auth);
      setUser(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return { user, handleLogin, handleSignup, handleGoogleSignIn, handleLogout };
};
