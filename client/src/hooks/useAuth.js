import { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUserDocument = async (user, firstName, lastName, userName) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        userName,
        // Add any other fields you want to store for your users
      });
      console.log("User document created:", user.uid);
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (
    firstName,
    lastName,
    userName,
    email,
    password
  ) => {
    // Include userName parameter
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await createUserDocument(user, firstName, lastName, userName); // Pass userName to createUserDocument
      alert("User registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const { user } = userCredential;
      const [firstName, lastName] = user.displayName.split(" ");
      await createUserDocument(user, firstName, lastName);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return { user, handleLogin, handleSignup, handleGoogleSignIn, handleLogout };
};
