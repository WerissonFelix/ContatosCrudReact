import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';


const Config = {
  apiKey: "AIzaSyD_Bv4ya_4i2Gnv_ZTKdFV5MUpvPvLcyUo",
  authDomain: "logincrud-55852.firebaseapp.com",
  projectId: "logincrud-55852",
  storageBucket: "logincrud-55852.firebasestorage.app",
  messagingSenderId: "316043531745",
  appId: "1:316043531745:web:76e10257abcf15a3a7eea0"
};
const app = initializeApp(Config);

const db = getFirestore(app);

export {db};