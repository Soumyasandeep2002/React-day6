import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LanguageIcon from "@mui/icons-material/Language";
import HelpIcon from "@mui/icons-material/Help";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import CBOILogo from "../components/CBOILogo";
import CBOISmallLogo from "../components/CBOISmallLogo";

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const [openHelp, setOpenHelp] = useState(false);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent:  "center" ,
          padding: collapsed ? 0 : "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          background: "#fff"
        }}
      >
        {collapsed ? <CBOISmallLogo size={28} /> : <CBOILogo />}
      </div>

      {/* MENU */}
      <div style={{ flex: 1 }}>
        <MenuItem
          icon={<DashboardIcon />}
          text="Dashboard"
          collapsed={collapsed}
          onClick={() => navigate("/dashboard")}
        />

        <MenuItem
          icon={<ReceiptIcon />}
          text="Transaction Details"
          collapsed={collapsed}
          onClick={() => navigate("/transactions")}
        />

        <MenuItem
          icon={<QrCodeIcon />}
          text="QR Details"
          collapsed={collapsed}
          onClick={() => navigate("/qr")}
        />

        <MenuItem
          icon={<LanguageIcon />}
          text="Language Update"
          collapsed={collapsed}
          onClick={() => navigate("/language")}
        />

        {/* HELP */}
        <div>
          <div
            onClick={() => {
              if (collapsed) {
                navigate("/raise-ticket");
              } else {
                setOpenHelp(!openHelp);
              }
            }}
            style={menuStyle}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <HelpIcon />
              {!collapsed && <span>Help & Support</span>}
            </div>

            {!collapsed &&
              (openHelp ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </div>

          {openHelp && !collapsed && (
            <div style={{ background: "rgba(255,255,255,0.08)" }}>
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
    </div>
  );
}

const MenuItem = ({ icon, text, collapsed, onClick }) => (
  <div onClick={onClick} style={menuStyle}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {icon}
      {!collapsed && <span>{text}</span>}
    </div>
  </div>
);

const SubMenuItem = ({ text, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "10px 16px 10px 48px",
      fontSize: "13px",
      cursor: "pointer",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    }}
  >
    {text}
  </div>
);

const menuStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  cursor: "pointer",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};