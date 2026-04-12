import { useState } from "react";

export default function ViewTicket() {
  // 🔹 Default filter state
  const defaultFilter = {
    status: "all",
    startDate: "",
    endDate: "",
  };

  const [filter, setFilter] = useState(defaultFilter);

  // 🔹 Dummy table data
  const tickets = [
    {
      id: "TCK123",
      subject: "Payment Issue",
      status: "Open",
      date: "2026-04-10",
    },
    {
      id: "TCK124",
      subject: "QR Not Working",
      status: "Closed",
      date: "2026-04-09",
    },
    {
      id: "TCK125",
      subject: "Settlement Delay",
      status: "Pending",
      date: "2026-04-08",
    },
  ];
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const handleSubmit = () => {
  let result = [...tickets];

  // 🔹 Filter by status
  if (filter.status !== "all") {
    result = result.filter(
      (t) => t.status.toLowerCase() === filter.status
    );
  }

  // 🔹 Filter by start date
  if (filter.startDate) {
    result = result.filter(
      (t) => new Date(t.date) >= new Date(filter.startDate)
    );
  }

  // 🔹 Filter by end date
  if (filter.endDate) {
    result = result.filter(
      (t) => new Date(t.date) <= new Date(filter.endDate)
    );
  }

  setFilteredTickets(result);
};

  const handleReset = () => {
  setFilter(defaultFilter);
  setFilteredTickets(tickets); // ✅ restore original data
};

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🔹 FILTER SECTION */}
      <div style={cardStyle}>
        <h3 style={{ color: "#000" }}>View Tickets</h3>

        {/* ROW */}
        <div style={filterRow}>
          
          {/* STATUS */}
          <div style={field}>
            <label style={label}>Select Status</label>
            <select
              value={filter.status}
              onChange={(e) =>
                setFilter({ ...filter, status: e.target.value })
              }
              style={input}
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="solved">Solved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* START DATE */}
          <div style={field}>
            <label style={label}>Start Date</label>
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) =>
                setFilter({ ...filter, startDate: e.target.value })
              }
              style={input}
            />
          </div>

          {/* END DATE */}
          <div style={field}>
            <label style={label}>End Date</label>
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) =>
                setFilter({ ...filter, endDate: e.target.value })
              }
              style={input}
            />
          </div>

          {/* BUTTONS */}
          <div style={btnWrapper}>
            <button style={submitBtn} onClick={handleSubmit}>
              Submit
            </button>
            <button style={resetBtn} onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 TABLE SECTION */}
      <div style={{ ...cardStyle, marginTop: "20px" }}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Ticket ID</th>
              <th style={th}>Subject</th>
              <th style={th}>Status</th>
              <th style={th}>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((t, i) => (
              <tr key={i}>
                <td style={td}>{t.id}</td>
                <td style={td}>{t.subject}</td>
                <td style={td}>{t.status}</td>
                <td style={td}>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

const filterRow = {
  display: "flex",
  alignItems: "flex-end",
  gap: "20px",
  flexWrap: "wrap",
  marginTop: "15px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  minWidth: "200px",
};

const label = {
  marginBottom: "5px",
  color: "#000",
  fontSize: "14px",
};

const input = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  color: "#000",
};

const btnWrapper = {
  display: "flex",
  gap: "10px",
  marginLeft: "auto", // ✅ pushes buttons to right
};

const submitBtn = {
  padding: "8px 14px",
  background: "#2b6cb0",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const resetBtn = {
  padding: "8px 14px",
  border: "1px solid #ccc",
  background: "#fff",
  color: "#000",
  borderRadius: "5px",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
  color: "#000",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  color: "#000",
};