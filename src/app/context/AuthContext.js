"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDatas, setUserData] = useState(null);
 const router = useRouter()
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    if(user){
    router.push('/')
    }
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };

  const appleSignIn = () => {
    const provider = new OAuthProvider("apple.com");
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const createAccountWithEmail = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      // Update the user's profile with the display name
      await updateProfile(user, { displayName: name });

      // Set the user in state
      setUser(user);

      // Save to Firestore
      const userRef = doc(db, "users", user.uid);
      const userData = {
        displayName: name, // Use the provided name
        email: user.email,
        userid: user.uid,
        joinDate: Timestamp.now(),
      };
      await setDoc(userRef, userData, { merge: true });

      return true;
    } catch (error) {
      console.error("Error creating account:", error.message);
      return false;
    }
  };
  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      setUser(user);
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in with email and password:", error.message);
    }
  };
  const getAllUsersData = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const snapshot = await getDocs(usersCollectionRef);
      const usersData = snapshot.docs.map((doc) => doc.data());
      console.log(usersData);
      return usersData;
    } catch (error) {
      console.error("Error fetching all users data:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Save user name and email to Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          userid: currentUser.uid,
          joinDate: Timestamp.now(),
        };
        await setDoc(userRef, userData, { merge: true });

        // Example of sending data to your API endpoint
        const apiEndpoint = "/api/user/";
        const postData = {
          email: currentUser.email,
          name: currentUser.displayName,
          isAdmin: "", // Replace with your logic for isAdmin
          profile: "", // Replace with your logic for cart
          uid: currentUser.uid,
        };

        try {
          const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          if (!response.ok) {
            throw new Error("Failed to send data to server");
          }

          const responseData = await response.json();
          console.log("API Response:", responseData);
        } catch (error) {
          console.error("Error sending data to server:", error.message);
        }

        getAllUsersData(); // Fetch all users data after updating
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        facebookSignIn,
        appleSignIn,
        createAccountWithEmail,
        logOut,
        getAllUsersData,
        loginWithEmailPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
