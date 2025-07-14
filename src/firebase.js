import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC12P0LwJkQOHLQ4b7GSR84dC0FhMuXBkY",
  authDomain: "local-event-aggregator-490aa.firebaseapp.com",
  projectId: "local-event-aggregator-490aa",
  storageBucket: "local-event-aggregator-490aa.firebasestorage.app",
  messagingSenderId: "91818979975",
  appId: "1:91818979975:web:385b434122b7cb9cfb7e22"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // ✅ This line is what fixes the issue