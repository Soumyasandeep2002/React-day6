import logo from "../assets/CBOI_Loader.png";
const CBOISmallLogo = ({size = 30}) => {
  return (
      <img src={logo} alt="CBOI Logo" style={{ width: size, height: size }} 
      />
  );
};

export default CBOISmallLogo;
