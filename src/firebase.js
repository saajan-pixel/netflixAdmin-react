import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAQhiLRAweVmmKHq2FfGFBRCo4Z-OmY8h8",
  authDomain: "netflix-d5561.firebaseapp.com",
  projectId: "netflix-d5561",
  storageBucket: "netflix-d5561.appspot.com",
  messagingSenderId: "791993109483",
  appId: "1:791993109483:web:5f6c9be497b7e8a1c027ae",
  measurementId: "G-3H1K7526S9",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
