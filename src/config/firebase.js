import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyCoJ09cJKy5Vx4kql4eaqsF5Ft5Op8zQVc",
  authDomain: "bonecole-2f0f4.firebaseapp.com",
  projectId: "bonecole-2f0f4",
  storageBucket: "bonecole-2f0f4.appspot.com",
  messagingSenderId: "314467559669",
  appId: "1:314467559669:web:295c9a98a021390e897dbc",
  measurementId: "G-D0LW2Q5E1L"
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';






