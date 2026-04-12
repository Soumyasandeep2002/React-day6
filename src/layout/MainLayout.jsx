import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER (FULL WIDTH) */}
      <Header />

      {/* BELOW HEADER */}
      <div style={{ flex: 1, display: "flex" }}>
        
        {/* SIDEBAR */}
        <div
          style={{
            width: "220px",
            background: "#2b6cb0",
            color: "#fff",
          }}
        >
          <Sidebar />
        </div>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#f5f7fa",
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}