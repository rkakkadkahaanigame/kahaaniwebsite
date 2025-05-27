import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBuS4GoCSGuKQGCbNGA9Syf_ofynjETh0I",
  authDomain: "game0222-c2cf2.firebaseapp.com",
  projectId: "game0222-c2cf2",
  storageBucket: "game0222-c2cf2.firebasestorage.app",
  messagingSenderId: "772564806251",
  appId: "1:772564806251:web:630e89b1709fa2e3af5f2e",
  measurementId: "G-23CP1N3TRK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 