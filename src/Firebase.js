import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage,ref } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBFi6IPSS5K1eZim_awyhn6YVYz52O-BjM",
    authDomain: "snapchat-clone-yt-b8ae4.firebaseapp.com",
    projectId: "snapchat-clone-yt-b8ae4",
    storageBucket: "snapchat-clone-yt-b8ae4.appspot.com",
    messagingSenderId: "192497188212",
    appId: "1:192497188212:web:b3c78084ac85a809c7c021"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  // const storage=firebase.storage();
  const storage = getStorage(firebaseApp);
  
  const provider=new firebase.auth.GoogleAuthProvider();

  export {db,auth,storage,provider}