import logo from "../assets/CBOILogo.png";
const CBOILogo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      <img src={logo} alt="CBOI Logo" style={{ width: "150px" }} />
    </div>
  );
};

export default CBOILogo;
