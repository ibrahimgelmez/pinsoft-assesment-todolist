import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDPHP1Q0uLSGYSNBtxKpPM6_zEXiR9ZME4",
    authDomain: "pinsoft-assesment-todolist.firebaseapp.com",
    projectId: "pinsoft-assesment-todolist",
    storageBucket: "pinsoft-assesment-todolist.appspot.com",
    messagingSenderId: "1009710810611",
    appId: "1:1009710810611:web:9c81b69859ba3d0ddc3e86"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)