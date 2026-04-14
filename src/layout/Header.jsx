import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Avatar, Typography } from "@mui/material";
import { userManager } from "../services/authService";
import { useEffect, useState } from "react";

export default function Header({ onToggleSidebar, collapsed }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userObject = await userManager.getUser();
      setUser(userObject?.profile || null);
    };
    loadUser();
  }, []);
  const userInitial = user?.given_name?.charAt(0)?.toUpperCase()
  console.log("User in header:", user);
  return (
    <div style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {collapsed ? (
          <MenuOpenIcon
            onClick={onToggleSidebar}
            sx={{ ...toggleStyle, transform: "scaleX(-1)" }}
          />
        ) : (
          <MenuOpenIcon onClick={onToggleSidebar} sx={toggleStyle} />
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>

        <Typography fontSize="14px">
          {user?.given_name}
        </Typography>
        <Avatar sx={{ width: 30, height: 30, fontSize: 16 }}>
          {userInitial}
        </Avatar>
      </div>
    </div>
  )
}

const headerStyle = {
  height: "60px",
  background: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
};

const toggleStyle = {
  cursor: "pointer",
  background: "#f1f3f5",
  borderRadius: "8px",
  padding: "6px",
};