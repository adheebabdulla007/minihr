import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCsegd886BPrhEpnQhzxL94btYrQj_Z1TQ',
  authDomain: 'minihr-22ea0.firebaseapp.com',
  projectId: 'minihr-22ea0',
  storageBucket: 'minihr-22ea0.appspot.com',
  messagingSenderId: '981764434786',
  appId: '1:981764434786:web:1fc28112c897693bdb9a3b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
