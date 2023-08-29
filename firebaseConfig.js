import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAM950xQgTYX04k6W9hiDzVAU_YZSHKoHc",
  authDomain: "gram-gadget.firebaseapp.com",
  projectId: "gram-gadget",
  storageBucket: "gram-gadget.appspot.com",
  messagingSenderId: "406914520253",
  appId: "1:406914520253:web:3e830cbd2c7e2b23b713d4",
  measurementId: "G-SF7P5Z6ECW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app)