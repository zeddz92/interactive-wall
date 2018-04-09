import firebase from 'firebase';
require("firebase/firestore");


const firebaseConfig = {
    apiKey: "AIzaSyA_brdnpyZA28SwU8w0E0ovJDEbgAo_0RE",
    authDomain: "interactivewall-917d2.firebaseapp.com",
    databaseURL: "https://interactivewall-917d2.firebaseio.com",
    projectId: "interactivewall-917d2",
    storageBucket: "",
    messagingSenderId: "337578983850"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();

export const REF_POSTS = firestore.collection("posts");
export const REF_USERS = firestore.collection("users");
export const REF_CATEGORIES = firestore.collection("categories");

