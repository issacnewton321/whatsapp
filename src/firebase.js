import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8EhVfhCE-9vLus20qV5bvLKbS9nD4Fyg",
    authDomain: "whatsapp-hq.firebaseapp.com",
    projectId: "whatsapp-hq",
    storageBucket: "whatsapp-hq.appspot.com",
    messagingSenderId: "393379621193",
    appId: "1:393379621193:web:55fbe92173487f181fd298",
    measurementId: "G-NYCLP58PZG"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider}
  export default db;