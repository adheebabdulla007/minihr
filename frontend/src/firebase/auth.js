import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const signup = async (email, password, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Save basic user info (used for access control)
  await setDoc(doc(db, 'users', uid), {
    uid,
    email,
    role,
  });

  // If employee, create a basic profile in employees collection
  if (role === 'employee') {
    await setDoc(doc(db, 'employees', uid), {
      name: email.split('@')[0], // Placeholder name from email
      email,
      department: '',
      phone: '',
      joiningDate: '',
    });
  }

  return userCredential;
};

// Login
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
  return await signOut(auth);
};

// Get user role from Firestore
export const getUserRole = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data().role : null;
};
