import { app } from './firebase-config.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
signInWithEmailAndPassword(auth, "email@example.com", "password123")
  .then((userCredential) => {
    console.log("User signed in:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });