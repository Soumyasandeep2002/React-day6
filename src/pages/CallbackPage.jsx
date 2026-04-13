import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signinCallback } from "../services/authService";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    signinCallback()
      .then((user) => {
        console.log("User logged in:", user);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("Login callback error:", error);
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
