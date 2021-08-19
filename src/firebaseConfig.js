import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3tgN_3yjnO7G8-nlpE0wUAfdAQ1mHw5Q",
    authDomain: "http-vue-example.firebaseapp.com",
    projectId: "http-vue-example",
    storageBucket: "http-vue-example.appspot.com",
    messagingSenderId: "525273698272",
    appId: "1:525273698272:web:482cf86ddeb38154cda585"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
