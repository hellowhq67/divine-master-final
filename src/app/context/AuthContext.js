'use client'
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase";
import { collection, doc, setDoc, getDocs, Timestamp } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDatas, setUserData] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };

  const appleSignIn = () => {
    const provider = new OAuthProvider('apple.com');
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const updateProfile = async (displayName, bio, phoneNumber, location, profileImage) => {
    try {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {
          displayName: displayName,
          email: auth.currentUser.email,
          bio: bio,
          phoneNumber: phoneNumber,
          location: location,
          profileImage: profileImage,
        };
        await setDoc(userRef, userData, { merge: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const AddressDetails = async (name, streetAddress, country, apt, state, zipcode) => {
    try {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = {
          addressName: name,
          streetAddress: streetAddress,
          country: country,
          apt: apt,
          state: state,
          zipcode: zipcode,
        };
        await setDoc(userRef, userData, { merge: true });
        console.log("Address updated successfully");
      } else {
        console.error("No user logged in");
      }
    } catch (error) {
      console.error("Error updating address:", error.message);
    }
  };

  const createAccountWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      setUser(user);
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };

  const getAllUsersData = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const snapshot = await getDocs(usersCollectionRef);
      const usersData = snapshot.docs.map(doc => doc.data());
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
          cart: [], // Replace with your logic for cart
          uid: currentUser.uid,
        };

        try {
          const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          });

          if (!response.ok) {
            throw new Error('Failed to send data to server');
          }

          const responseData = await response.json();
          console.log('API Response:', responseData);
        } catch (error) {
          console.error('Error sending data to server:', error.message);
        }

        getAllUsersData(); // Fetch all users data after updating
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, facebookSignIn, appleSignIn, logOut, updateProfile, AddressDetails, getAllUsersData, createAccountWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
