import { Box } from "@mui/material";
import logo from "../assets/CBOI_Loader.png";

const CBOILoader = ({ size = 60 }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.6)", // optional overlay
        zIndex: 1300,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="CBOI Loader"
        sx={{
          width: size,
          height: size,
          animation: "spin 1s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default CBOILoader;