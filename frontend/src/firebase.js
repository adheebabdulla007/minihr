// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsegd886BPrhEpnQhzxL94btYrQj_Z1TQ',
  authDomain: 'minihr-22ea0.firebaseapp.com',
  projectId: 'minihr-22ea0',
  storageBucket: 'minihr-22ea0.firebasestorage.app',
  messagingSenderId: '981764434786',
  appId: '1:981764434786:web:1fc28112c897693bdb9a3b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
