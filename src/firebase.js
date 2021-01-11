// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
    apiKey: "AIzaSyAznplBlwExFOSTJTbVrZYEV-lqNeXq1Og",
    authDomain: "shopify-movie-awards.firebaseapp.com",
    databaseURL: "https://shopify-movie-awards-default-rtdb.firebaseio.com",
    projectId: "shopify-movie-awards",
    storageBucket: "shopify-movie-awards.appspot.com",
    messagingSenderId: "974472256701",
    appId: "1:974472256701:web:2dd76ef3af57c4e9c52bd4"
};

firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
