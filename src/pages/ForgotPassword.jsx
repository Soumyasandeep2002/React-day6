// pages/ForgotPassword.jsx
import { useNavigate } from "react-router-dom";
import CBOILogo from "../components/CBOILogo";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <CBOILogo />
        <h2>Forgot Password</h2>

        <input placeholder="Enter Mobile Number" />

        <button onClick={() => navigate("/otp")}>
          Continue
        </button>

        <p className="link" onClick={() => navigate("/")}>
          Back to Login
        </p>
      </div>
    </div>
  );
}