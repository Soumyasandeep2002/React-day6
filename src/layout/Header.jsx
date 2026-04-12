import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CBOILogo from "../components/CBOILogo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          height: "60px",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between", // ✅ left + right
          alignItems: "center", // ✅ vertical center
          padding: "0 20px",
          borderBottom: "1px solid #eee",
        }}
      >
        {/* LEFT LOGO */}
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "30px" }}
        >
          <CBOILogo />
        </div>

        {/* USER */}
        <div style={{ position: "relative" }}>
          <div onClick={() => setOpen(!open)} style={avatarStyle}>
            A
          </div>

          {/* DROPDOWN */}
          {open && (
            <div style={dropdownStyle}>
              <div
                onClick={() => {
                  setShowProfile(true); // ✅ OPEN POPUP
                  setOpen(false);
                }}
                style={dropdownItem}
              >
                View Profile
              </div>

              <div onClick={logout} style={dropdownItem}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PROFILE POPUP */}
      {showProfile && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>View Profile Details</h3>

            <h4 style={sectionTitle}>Basic Information</h4>
            <p>
              <b>Name:</b> Stebin Ben
            </p>
            <p>
              <b>Phone:</b> +91 9398239231
            </p>

            <h4 style={sectionTitle}>Device Information</h4>
            <p>
              <b>Device Serial Number:</b> 456954659876857
            </p>
            <p>
              <b>Linked Account Number:</b> XXXXXX6857
            </p>
            <p>
              <b>UPI ID:</b> rudransh.panigrahi@cbin
            </p>
            <p>
              <b>IFSC Code:</b> CBOI0283896
            </p>
            <p>
              <b>Device Model Name:</b> Morefun ET389
            </p>
            <p>
              <b>Device Mobile Number:</b> +91 9398239231
            </p>
            <p>
              <b>Network Type:</b> BSNL
            </p>
            <p>
              <b>Device Status:</b> Active
            </p>
            <p>
              <b>Battery Percentage:</b> 60%
            </p>
            <p>
              <b>Network Strength:</b> Strong
            </p>

            <button onClick={() => setShowProfile(false)} style={closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const avatarStyle = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  background: "#2b6cb0",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const dropdownStyle = {
  position: "absolute",
  right: 0,
  top: "45px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "6px",
  width: "150px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const dropdownItem = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const sectionTitle = {
  marginTop: "10px",
};

const closeBtn = {
  marginTop: "15px",
  padding: "8px 12px",
  background: "#2b6cb0",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
