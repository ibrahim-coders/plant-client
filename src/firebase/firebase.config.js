// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: 'AIzaSyCHbSkt6rPMftcoZK1oRupixgAhN4C8Uec',
  // authDomain: 'shoes-51184.firebaseapp.com',
  // projectId: 'shoes-51184',
  // storageBucket: 'shoes-51184.firebasestorage.app',
  // messagingSenderId: '712380594960',
  // appId: '1:712380594960:web:f40108572a8fe5c21c0395',
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_authDomain,
  storageBucket: import.meta.env.VITE_projectI,
  messagingSenderId: import.meta.env.VITE_storageBucket,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
