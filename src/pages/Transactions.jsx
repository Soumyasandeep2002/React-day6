import { useState } from "react";

export default function Transactions() {
  const [filter, setFilter] = useState("today");
  const [month, setMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Dummy Data
  const transactions = [
    {
      id: "TXN001",
      vpa: "merchant1@cbin",
      amount: "₹500",
      date: "2026-04-12",
      status: "SUCCESS",
    },
    {
      id: "TXN002",
      vpa: "merchant2@cbin",
      amount: "₹1200",
      date: "2026-04-11",
      status: "FAILED",
    },
    {
      id: "TXN003",
      vpa: "merchant1@cbin",
      amount: "₹800",
      date: "2026-04-12",
      status: "SUCCESS",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      
      {/* HEADING */}
      <h2 style={{ color: "#000", marginBottom: "20px" }}>
        Transaction Details
      </h2>

      {/* 🔹 FILTER SECTION */}
      <div style={cardStyle}>
        <h4 style={{ color: "#000" }}>Select a Report Filter</h4>

        {/* RADIO OPTIONS */}
        <div style={{ marginTop: "10px" }}>
          <label style={radioStyle}>
            <input
              type="radio"
              value="today"
              checked={filter === "today"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Today
          </label>

          <label style={radioStyle}>
            <input
              type="radio"
              value="month"
              checked={filter === "month"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Monthly
          </label>

          <label style={radioStyle}>
            <input
              type="radio"
              value="custom"
              checked={filter === "custom"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Custom Range
          </label>
        </div>

        {/* 🔹 CONDITIONAL UI */}
        <div style={{ marginTop: "15px" }}>
          {filter === "today" && (
            <p style={{ color: "#000" }}>
              Showing today's transactions
            </p>
          )}

          {filter === "month" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
              </select>

              <button style={btnStyle}>Submit</button>
            </div>
          )}

          {filter === "custom" && (
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={inputStyle}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={inputStyle}
              />

              <button style={btnStyle}>Submit</button>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 TABLE SECTION */}
      <div style={{ ...cardStyle, marginTop: "20px" }}>
        
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <input
            placeholder="Search transactions..."
            style={inputStyle}
          />

          <button style={btnStyle}>Download</button>
        </div>

        {/* TABLE */}
        <table style={tableStyle}>
  <thead>
    <tr>
      <th style={thStyle}>ID</th>
      <th style={thStyle}>VPA</th>
      <th style={thStyle}>Amount</th>
      <th style={thStyle}>Date</th>
      <th style={thStyle}>Status</th>
    </tr>
  </thead>

  <tbody>
    {transactions.map((txn, index) => (
      <tr key={index}>
        <td style={tdStyle}>{txn.id}</td>
        <td style={tdStyle}>{txn.vpa}</td>
        <td style={tdStyle}>{txn.amount}</td>
        <td style={tdStyle}>{txn.date}</td>
        <td
          style={{
            ...tdStyle,
            color: txn.status === "SUCCESS" ? "green" : "red",
          }}
        >
          {txn.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>  
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const radioStyle = {
  marginRight: "20px",
  color: "#000",
};

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#fff",
  color: "#000",
};

const btnStyle = {
  padding: "8px 12px",
  background: "#2b6cb0",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
  color: "#000",
  fontWeight: "600",
};

const tdStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #eee",
  color: "#000",
};
