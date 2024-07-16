import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBv8oVGlfYgr8mxBrV6bLsEdCXu1fXYzko",
  authDomain: "greatful-way.firebaseapp.com",
  projectId: "greatful-way",
  storageBucket: "greatful-way.appspot.com",
  messagingSenderId: "805816885274",
  appId: "1:805816885274:web:0f4dfb90d0352f21c2f1a3",
  measurementId: "G-W6KT7DMDTS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const authentication = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();


