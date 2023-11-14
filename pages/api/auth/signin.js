import firebase_app from "../../../app/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        result = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
