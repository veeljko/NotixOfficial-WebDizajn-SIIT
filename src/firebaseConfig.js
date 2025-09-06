import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAD9v1ACkFoG6n8m-NnEGsO5IN6Ls_gWCk",
    authDomain: "knjizaradatabase.firebaseapp.com",
    projectId: "knjizaradatabase",
    storageBucket: "knjizaradatabase.firebasestorage.app",
    messagingSenderId: "149550584375",
    appId: "1:149550584375:web:d8999135c8a784fc9765b2",
    measurementId: "G-D2BEEQ8EBC"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };