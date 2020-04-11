import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyBXJPG8gfgDt0D8GgXrxacw20WiGwAlENA",
    authDomain: "b-brosj.firebaseapp.com",
    databaseURL: "https://b-brosj.firebaseio.com",
    projectId: "b-brosj",
    storageBucket: "b-brosj.appspot.com",
    messagingSenderId: "1070789194920",
    appId: "1:1070789194920:web:b8cb90e8b9b229435f3e9d"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth } 