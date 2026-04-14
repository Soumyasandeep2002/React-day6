import logo from "../assets/CBOI_Loader.png";
const CBOILoader = ({size = 30}) => {
  return (
      <img src={logo} alt="CBOI Logo" style={{ width: size, height: size, animation: "spin 1s linear infinite" }} 
      />
  );
};

export default CBOILoader;
