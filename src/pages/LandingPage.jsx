import React from "react";
import CBOILogo from "../components/CBOILogo";
import { login } from "../services/authService";

const LandingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa, #e4ecf5)",
        fontFamily: "Segoe UI, Arial",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0px 20px 40px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <CBOILogo />
        <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "16px" }}>
          Merchant Portal
        </h1>
        <p style={{ color: "#666", marginBottom: "32px", fontSize: "14px" }}>
          Welcome to the Central Bank of India Merchant Portal. 
          Please sign in to manage your account.
        </p>
        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2b6cb0",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#2c5282")}
          onMouseOut={(e) => (e.target.style.background = "#2b6cb0")}
        >
          Sign In with Authentik
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
