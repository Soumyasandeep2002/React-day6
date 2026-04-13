// CallbackPage.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signinCallback } from "../services/authService";

const CallbackPage = () => {
  const navigate = useNavigate();
  const called = useRef(false); // ← prevents double-call in React StrictMode

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    signinCallback()
      .then((user) => {
        console.log("✅ User logged in:", user);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("❌ Callback error:", error.message);
        navigate("/", { replace: true });
      });
  }, [navigate]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <p>Processing login, please wait...</p>
    </div>
  );
};

export default CallbackPage;