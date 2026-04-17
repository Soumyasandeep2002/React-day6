import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? 70 : 220;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div
        style={{
          width: sidebarWidth,
          borderRight: "1px solid #e5e7eb",
          background: "#2b6cb0",
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Header
            onToggleSidebar={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#f5f7fa",
            transition: "all 0.3s ease",

            overflowY: "auto",
            height: "100%", 
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
