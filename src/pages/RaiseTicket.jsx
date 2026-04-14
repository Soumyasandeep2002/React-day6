import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

export default function RaiseTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    description: "",
    vpa: "",
    issueType: "",
    subType: "",
    phone: "",
    callType: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateField = (field, value) => {
  let error = "";

  if (field !== "file" && !value) error = "Required"; 

  if (field === "description" && value) {
    if (value.split(" ").length > 300) {
      error = "Max 300 words";
    }
  }

  setErrors((prev) => ({ ...prev, [field]: error }));
};
 const validate = () => {
  let newErrors = {};

  Object.keys(form).forEach((key) => {
    if (key !== "file" && !form[key]) { 
      newErrors[key] = "Required";
    }
  });

  if (form.description && form.description.split(" ").length > 300) {
    newErrors.description = "Max 300 words";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = () => {
    if (!validate()) return;
    alert("Ticket Submitted Successfully");
  };

  const handleCancel = () => navigate(-1);

  return (
    <div style={{ height: "100%", background: "#f5f7fa" }}>
      
      {/* HEADER */}
      <div style={headerStyle}>
        <ArrowBackIcon
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />

        <div style={{ display: "flex", gap: "20px" }}>
          <span style={supportItem}>
            <CallIcon style={{ fontSize: "18px" }} /> 9124573230
          </span>
          <span style={supportItem}>
            <EmailIcon style={{ fontSize: "18px" }} /> support@iserveu.in
          </span>
        </div>
      </div>

      {/* FORM */}
      <div style={cardStyle}>
        <h2 style={{ color: "#000", fontWeight: "bold" }}>
          Raise a Ticket
        </h2>

        <div style={gridStyle}>
          
          <Field label="Subject" error={errors.subject}>
            <input
              placeholder="Enter subject"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onBlur={(e) => validateField("subject", e.target.value)}
              style={inputStyle}
            />
          </Field>

          <Field label="VPA ID" error={errors.vpa}>
            <input
              placeholder="Enter VPA ID"
              value={form.vpa}
              onChange={(e) => handleChange("vpa", e.target.value)}
              onBlur={(e) => validateField("vpa", e.target.value)}
              style={inputStyle}
            />
          </Field>

          <Field label="Issue Type" error={errors.issueType}>
            <select
              value={form.issueType}
              onChange={(e) => handleChange("issueType", e.target.value)}
              onBlur={(e) => validateField("issueType", e.target.value)}
              style={inputStyle}
            >
              <option value="">Select issue type</option>
            </select>
          </Field>

          <Field label="Issue Sub Type" error={errors.subType}>
            <select
              value={form.subType}
              onChange={(e) => handleChange("subType", e.target.value)}
              onBlur={(e) => validateField("subType", e.target.value)}
              style={inputStyle}
            >
              <option value="">Select issue sub type</option>
            </select>
          </Field>

          <Field label="Phone Number" error={errors.phone}>
            <input
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={(e) => validateField("phone", e.target.value)}
              style={inputStyle}
            />
          </Field>

          <Field label="Call Type" error={errors.callType}>
            <input
              placeholder="Enter call type"
              value={form.callType}
              onChange={(e) => handleChange("callType", e.target.value)}
              onBlur={(e) => validateField("callType", e.target.value)}
              style={inputStyle}
            />
          </Field>
        </div>

        {/* DESCRIPTION */}
        <div style={{ marginTop: "20px" }}>
          <label style={labelStyle}>
            Description <span style={{ color: "red" }}>*</span>
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            <textarea
              placeholder="Any additional details"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={(e) => validateField("description", e.target.value)}
              style={{ ...inputStyle, height: "100px" }}
            />
            {errors.description && (
              <div style={errorSideStyle}>{errors.description}</div>
            )}
          </div>

          <div style={{ fontSize: "12px", color: "#888" }}>
            Describe your issue within 300 words
          </div>
        </div>

        {/* ATTACHMENT */}
        <div style={{ marginTop: "20px" }}>
          <label style={labelStyle}>
            Attachment 
          </label>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="file"
              onChange={(e) => handleChange("file", e.target.files[0])}
              onBlur={(e) => validateField("file", e.target.files[0])}
            />
            {errors.file && (
              <div style={errorSideStyle}>{errors.file}</div>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div style={btnContainer}>
          <button style={cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button style={submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 FIELD */
const Field = ({ label, children, error }) => (
  <div style={{ width: "100%" }}>
    <label style={labelStyle}>
      {label} <span style={{ color: "red" }}>*</span>
    </label>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ flex: 1 }}>{children}</div>
      {error && <div style={errorSideStyle}>{error}</div>}
    </div>
  </div>
);

/* 🔹 STYLES */

const headerStyle = {
  height: "60px",
  background: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  borderBottom: "1px solid #eee",
};

const supportItem = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "14px",
};

const cardStyle = {
  background: "#fff",
  margin: "20px",
  padding: "20px",
  borderRadius: "10px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginTop: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#000",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#fff",
  color: "#000",
  boxSizing: "border-box",
};

const errorSideStyle = {
  color: "red",
  fontSize: "12px",
  whiteSpace: "nowrap",
};

const btnContainer = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
};

const cancelBtn = {
  padding: "8px 14px",
  border: "1px solid #ccc",
  background: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  color:"#000"
};

const submitBtn = {
  padding: "8px 14px",
  background: "#2b6cb0",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};