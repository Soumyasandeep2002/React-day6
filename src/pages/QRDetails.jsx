import { useState } from "react";

export default function QRDetails() {
  const [type, setType] = useState("static");
  const [amount, setAmount] = useState("");
  const [qrData, setQrData] = useState("");

  const staticQR =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STATIC_QR";

  const generateQR = () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    const dynamicQR = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AMOUNT_${amount}`;

    setQrData(dynamicQR);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrData || staticQR;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADING */}
      <h2 style={{ color: "#000", marginBottom: "20px" }}>QR Details</h2>

      {/* 🔹 SECTION 1 (TYPE + INPUT) */}
      <div style={cardStyle}>
        <h4 style={{ color: "#000" }}>Select QR Type</h4>

        {/* RADIO */}
        <div style={{ marginTop: "10px" }}>
          <label style={radioStyle}>
            <input
              type="radio"
              value="static"
              checked={type === "static"}
              onChange={(e) => setType(e.target.value)}
            />
            Static
          </label>

          <label style={radioStyle}>
            <input
              type="radio"
              value="dynamic"
              checked={type === "dynamic"}
              onChange={(e) => setType(e.target.value)}
            />
            Dynamic
          </label>
        </div>

        {/* DYNAMIC INPUT */}
        {type === "dynamic" && (
          <div style={{ marginTop: "15px" }}>
            <h4 style={{ color: "#000" }}>
              Enter an amount to instantly generate your dynamic QR code
            </h4>

            <div style={{ marginTop: "10px" }}>
              <label style={{ color: "#000" }}>Amount to be collected</label>

              {/* INPUT + BUTTON INLINE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end", 
                  gap: "10px",
                  marginTop: "5px",
                }}
              >
                <input
                  type="number"
                  placeholder="Enter the amount to be collected"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: "500px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    background: "#fff",
                    color: "#000",
                  }}
                />

                <button
                  style={{
                    height: "40px", 
                    padding: "0 15px",
                    background: "#2b6cb0",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={generateQR}
                >
                  Generate QR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔹 SECTION 2 (QR DISPLAY) */}
      <div
        style={{
          ...cardStyle,
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h4 style={{ color: "#000" }}>QR Code</h4>

        <div style={{ marginTop: "15px" }}>
          <img
            src={type === "static" ? staticQR : qrData}
            alt="QR Code"
            style={{ width: "200px", height: "200px" }}
          />
        </div>

        <button style={{ ...btnStyle, marginTop: "15px" }} onClick={downloadQR}>
          Download QR
        </button>
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
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#fff",
  color: "#000",
};

const btnStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  background: "#2b6cb0",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
