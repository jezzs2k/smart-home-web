import { initializeApp, getApps } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA4MflFmphgSw0Ae8mKwkh8_i6np4n8iK8",
  authDomain: "smart-home-87480.firebaseapp.com",
  databaseURL: "https://smart-home-87480-default-rtdb.firebaseio.com",
  projectId: "smart-home-87480",
  storageBucket: "smart-home-87480.appspot.com",
  messagingSenderId: "541989752602",
  appId: "1:541989752602:web:d7b2ccdc04ffb3a476a6a3",
  measurementId: "G-5J0G05RQF1",
};

// Initialize Firebase
let app = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export default { app };
