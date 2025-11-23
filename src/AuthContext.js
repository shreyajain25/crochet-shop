// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [token, setToken] = useState(null); // optional JWT from Firebase
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const idToken = await fbUser.getIdToken();
        setUser({ uid: fbUser.uid, email: fbUser.email });
        setToken(idToken);
        localStorage.setItem("token", idToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ uid: fbUser.uid, email: fbUser.email })
        );
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const value = { user, token, logout, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
