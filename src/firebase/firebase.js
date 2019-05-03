import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDAXLqv5a9pU9a1JJMq5hevOuAD0vxN0b0",
    authDomain: "quiz-app-83524.firebaseapp.com",
    databaseURL: "https://quiz-app-83524.firebaseio.com",
    projectId: "quiz-app-83524",
    storageBucket: "quiz-app-83524.appspot.com",
    messagingSenderId: "580173399590"
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  
const googleAuthProvider=new firebase.auth.GoogleAuthProvider();

export{ firebase,googleAuthProvider,database as default};
//,googleAuthProvider