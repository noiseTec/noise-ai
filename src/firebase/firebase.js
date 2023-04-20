import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBk2WycDuzH9KMp9XeqXu5Uh_A1HAB-eUA",
  authDomain: "noise-f5a8d.firebaseapp.com",
  projectId: "noise-f5a8d",
  storageBucket: "noise-f5a8d.appspot.com",
  messagingSenderId: "740713545450",
  appId: "1:740713545450:web:5f51dc31a74e40f5e72193",
  measurementId: "G-HPNBBJ7H7H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
