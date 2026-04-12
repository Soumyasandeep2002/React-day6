// pages/OTPVerification.jsx
import { useNavigate } from "react-router-dom";
import CBOILogo from "../components/CBOILogo";

export default function OTPVerification() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <CBOILogo />
        <h2>Verification Code</h2>

        <div style={{ display: "flex", gap: "5px" }}>
          {[...Array(6)].map((_, i) => (
            <input key={i} maxLength={1} />
          ))}
        </div>

        <button onClick={() => navigate("/success")}>
          Continue
        </button>
      </div>
    </div>
  );
}