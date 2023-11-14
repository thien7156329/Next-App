"use client";
import React, { useEffect } from "react";
import { onAuthStateChanged, getAuth, RecaptchaVerifier } from "firebase/auth";
import firebase_app from "../app/config";
import { useRouter } from "next/navigation";

export const auth = getAuth(firebase_app);
export const AuthContext = React.createContext({} as any);
export const useAuthContext = () => React.useContext(AuthContext);
// export const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//   size: "invisible",
// });

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user, "user");
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
