import { initializeApp } from 'firebase/app'
import apiKey from './../apiKey'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "not-atiop.firebaseapp.com",
  projectId: "not-atiop",
  storageBucket: "not-atiop.appspot.com",
  messagingSenderId: "69646674496",
  appId: "1:69646674496:web:14370da9feb34b339ccda5"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig)

export default fireApp