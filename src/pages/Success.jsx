// pages/Success.jsx
import { useNavigate } from "react-router-dom";
import CBOILogo from "../components/CBOILogo";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <CBOILogo />
        <h2>Password Changed Successfully!</h2>

        <button onClick={() => navigate("/")}>
          Continue to Login
        </button>
      </div>
    </div>
  );
}