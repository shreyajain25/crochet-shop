import React, { useEffect, useState } from "react";
import api from "./api";
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/protected/hello");
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Cannot access protected endpoint");
      }
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={logout}>Logout</button>
      <p style={{ marginTop: 20 }}>{message}</p>
    </div>
  );
};

export default HomePage;
