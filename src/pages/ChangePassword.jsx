// pages/ChangePassword.jsx
import { useNavigate } from "react-router-dom";
import CBOILogo from "../components/CBOILogo";

export default function ChangePassword() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <CBOILogo />
        <h2>Password Change Required</h2>

        <input type="password" placeholder="Current Password" />
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm Password" />

        <button onClick={() => navigate("/otp")}>
          Update Password
        </button>
      </div>
    </div>
  );
}