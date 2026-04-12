import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState("today");

  // 🔹 Dummy VPA data
  const vpaList = [
    {
      vpa: "merchant1@cbin",
      total: "₹ 50,000",
      today: "₹ 8,500",
      yesterday: "₹ 6,200",
    },
    {
      vpa: "merchant2@cbin",
      total: "₹ 30,000",
      today: "₹ 5,200",
      yesterday: "₹ 3,800",
    },
    {
      vpa: "merchant3@cbin",
      total: "₹ 15,000",
      today: "₹ 2,100",
      yesterday: "₹ 1,500",
    },
  ];

  // ✅ Selected VPA (state now)
  const [selectedVPA, setSelectedVPA] = useState(vpaList[0]);

  // ✅ Handle VPA selection
  const handleSelectVPA = (item) => {
    setSelectedVPA(item);
    setShowPopup(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* LEFT */}
        <div>
          <h2 style={{ margin: 0, color: "#000" }}>Dashboard</h2>

          <div style={{ marginTop: "5px" }}>
            <span style={{ fontSize: "14px", color: "#555" }}>
              VPA ID:
            </span>{" "}
            <span
              onClick={() => setShowPopup(true)}
              style={{
                color: "#2b6cb0",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {selectedVPA.vpa}
            </span>
          </div>
        </div>

        {/* RIGHT DROPDOWN */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            background: "#fff",
            color: "#000",
          }}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h4 style={{ color: "#000" }}>Total Transactions</h4>
          <p style={{ color: "#000" }}>{selectedVPA.total}</p>
        </div>

        <div style={cardStyle}>
          <h4 style={{ color: "#000" }}>
            {filter === "today"
              ? "Today's Transactions"
              : "Yesterday's Transactions"}
          </h4>
          <p style={{ color: "#000" }}>
            {filter === "today"
              ? selectedVPA.today
              : selectedVPA.yesterday}
          </p>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3 style={{ color: "#000" }}>Select VPA</h3>

            {vpaList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelectVPA(item)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#2b6cb0",
                }}
              >
                {item.vpa}
              </div>
            ))}

            <button
              onClick={() => setShowPopup(false)}
              style={{ marginTop: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};