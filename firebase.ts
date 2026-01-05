
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA993BjDo1UBUdhyk4uSSCMNEYI1D3cwoU",
  authDomain: "portfolio-portal-27ec6.firebaseapp.com",
  projectId: "portfolio-portal-27ec6",
  storageBucket: "portfolio-portal-27ec6.firebasestorage.app",
  messagingSenderId: "198509416404",
  appId: "1:198509416404:web:40918385379b3fef261041",
  measurementId: "G-JELCXXH1DK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Helper to fetch entire collections
export const fetchCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Helper to fetch a specific document
export const fetchDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};
