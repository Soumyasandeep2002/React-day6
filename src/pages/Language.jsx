import { useState } from "react";

export default function Language() {
  const [vpaId] = useState("merchant1@cbin");
  const [serialNumber] = useState("456954659876857");
  const [currentLanguage] = useState("ENGLISH");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [showToast, setShowToast] = useState(false);

  const handleUpdate = () => {
    if (!selectedLanguage) {
      alert("Please select a language");
      return;
    }

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCancel = () => {
    setSelectedLanguage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {/* HEADING */}
      <h2 style={{ color: "#000", marginBottom: "20px" }}>
        Language Update
      </h2>

      {/* 🔹 FORM SECTION */}
      <div style={cardStyle}>
        <div style={gridStyle}>
          
          {/* VPA ID */}
          <div style={{ width: "100%" }}>
            <label style={labelStyle}>VPA ID</label>
            <input value={vpaId} disabled style={inputStyle} />
          </div>

          {/* SERIAL NUMBER */}
          <div style={{ width: "100%" }}>
            <label style={labelStyle}>Device Serial Number</label>
            <input value={serialNumber} disabled style={inputStyle} />
          </div>

          {/* CURRENT LANGUAGE */}
          <div style={{ width: "100%" }}>
            <label style={labelStyle}>Current Language</label>
            <input value={currentLanguage} disabled style={inputStyle} />
          </div>

          {/* LANGUAGE UPDATE */}
          <div style={{ width: "100%" }}>
            <label style={labelStyle}>Language Update</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Language</option>
              <option>Punjabi</option>
              <option>Hindi</option>
              <option>Odia</option>
              <option>Tamil</option>
              <option>Assamese</option>
              <option>English</option>
              <option>Kannada</option>
              <option>Malayalam</option>
              <option>Bengali</option>
              <option>Telugu</option>
              <option>Marathi</option>
              <option>Gujarati</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div style={btnContainer}>
          <button style={cancelBtn} onClick={handleCancel}>
            Cancel
          </button>

          <button style={updateBtn} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>

      {/* 🔹 TOAST */}
      {showToast && (
        <div style={toastStyle}>
          Language update initiated successfully
        </div>
      )}
    </div>
  );
}

/* 🔹 STYLES */

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))", 
  columnGap: "20px",
  rowGap: "25px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#000",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#fff",
  color: "#000",
  boxSizing: "border-box",  
};

const btnContainer = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const cancelBtn = {
  padding: "8px 14px",
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
  color:"#000"
};

const updateBtn = {
  padding: "8px 14px",
  background: "#2b6cb0",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const toastStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#2b6cb0",
  color: "#fff",
  padding: "10px 15px",
  borderRadius: "6px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
};