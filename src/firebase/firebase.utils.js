import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDdNYhB4sDFCNOFIh--ZBgx0xiB1XOd2so",
    authDomain: "crwn-db-79f32.firebaseapp.com",
    databaseURL: "https://crwn-db-79f32.firebaseio.com",
    projectId: "crwn-db-79f32",
    storageBucket: "crwn-db-79f32.appspot.com",
    messagingSenderId: "823317228314",
    appId: "1:823317228314:web:386b0543ea2d0fef2f1aa3",
    measurementId: "G-09M4X2NC69"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName, 
          email, 
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  };

  firebase.initializeApp(config); 

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;