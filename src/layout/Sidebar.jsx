import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openHelp, setOpenHelp] = useState(false);

  return (
    <div
      style={{
        width: "220px",
        background: "#2b6cb0",
        color: "#fff",
      }}
    >
      <MenuItem text="Dashboard" onClick={() => navigate("/dashboard")} />
      <MenuItem text="Transaction Details" onClick={() => navigate("/transactions")} />
      <MenuItem text="QR Details" onClick={() => navigate("/qr")} />
      <MenuItem text="Language Update" onClick={() => navigate("/language")} />

      {/* 🔽 HELP ACCORDION */}
      <div>
        <div
          onClick={() => setOpenHelp(!openHelp)}
          style={menuStyle}
        >
          Help & Support {openHelp ? "▲" : "▼"}
        </div>

        {openHelp && (
          <div style={{ background: "rgba(255,255,255,0.1)" }}>
            <SubMenuItem
              text="Raise Ticket"
              onClick={() => navigate("/raise-ticket")}
            />
            <SubMenuItem
              text="View Ticket"
              onClick={() => navigate("/view-ticket")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const MenuItem = ({ text, onClick }) => (
  <div onClick={onClick} style={menuStyle}>
    {text}
  </div>
);

const SubMenuItem = ({ text, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "12px 30px",
      cursor: "pointer",
      fontSize: "14px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    }}
  >
    {text}
  </div>
);

const menuStyle = {
  padding: "15px 20px",
  cursor: "pointer",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};