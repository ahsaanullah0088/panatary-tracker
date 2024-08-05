import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import {addDoc, collection, query, where, getDocs,orderBy } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBTIjWsgvtJFE4Y_NZidIBr3ln45pY6lsg",
  authDomain: "pantry-tracker-48385.firebaseapp.com",
  projectId: "pantry-tracker-48385",
  storageBucket: "pantry-tracker-48385.appspot.com",
  messagingSenderId: "809094753792",
  appId: "1:809094753792:web:72b47147c8385abce432e5",
  measurementId: "G-68V85GR579"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, collection, query, where, getDocs, storage, analytics,addDoc,orderBy  };


