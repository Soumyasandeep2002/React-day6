import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CBOILogo from "../components/CBOILogo";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #f5f7fa, #e4ecf5)",
        fontFamily: "Segoe UI, Arial",
      }}
    >
      {/* CENTER CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "380px",
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 15px 35px rgba(0,0,0,0.08)",
            textAlign: "center",
            boxSizing: "border-box", // ✅ ensures proper width inside
          }}
        >
          {/* LOGO */}
          <div style={{ marginBottom: "15px" }}>
            <CBOILogo />
          </div>

          <h2 style={{ marginBottom: "20px", color: "#333" }}>
            Login to your Account
          </h2>

          {/* USERNAME */}
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label
              style={{
                fontSize: "13px",
                color: "#555",
                display: "block",
              }}
            >
              Username
            </label>
            <input
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #dcdfe6",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#ffffff",
                color: "#000",
                boxSizing: "border-box", // ✅ key fix
              }}
            />
          </div>

          {/* PASSWORD */}
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label
              style={{
                fontSize: "13px",
                color: "#555",
                display: "block",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #dcdfe6",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#ffffff",
                color: "#000",
                boxSizing: "border-box", // ✅ key fix
              }}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "11px",
              background: "#2b6cb0",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "15px",
              cursor: "pointer",
              marginTop: "10px",
              boxSizing: "border-box",
            }}
          >
            Login
          </button>

          {/* OPTIONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "12px",
            }}
          >
            <label style={{ fontSize: "13px", color: "#555" }}>
              <input type="checkbox" /> Remember Me
            </label>

            <span
              onClick={() => navigate("/forgot")}
              style={{
                fontSize: "13px",
                color: "#2b6cb0",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "12px",
          fontSize: "12px",
          color: "#666",
        }}
      >
        <span style={{ marginRight: "10px", cursor: "pointer" }}>
          Terms & Conditions
        </span>
        |
        <span style={{ margin: "0 10px", cursor: "pointer" }}>
          Privacy Policy
        </span>
        |
        <span style={{ marginLeft: "10px", cursor: "pointer" }}>
          CA Privacy Notice
        </span>
      </div>
    </div>
  );
}