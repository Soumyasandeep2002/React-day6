import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";

import { apiService } from "../services/serviceApi";
import { Button, Grid } from "@mui/material";

export default function RaiseTicket() {
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const [form, setForm] = useState({
    subject: "",
    description: "",
    issueType: "",
    subType: "",
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [issueTypes, setIssueTypes] = useState([]);
  const [subTypes, setSubTypes] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const [pageLoading, setPageLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    setPageLoading(true);
    try {
      const res = await apiService.fetchZendeskForm();

      const forms =
        res?.data?.hits?.[0]?._source?.forms?.[0]?.ticket_fields || [];

      const issueTypeField = forms.find((f) => f.title === "Issue Type");
      const subTypeField = forms.find((f) => f.title === "Issue Sub-type");

      setIssueTypes(
        issueTypeField?.custom_field_options?.map((o) => o.name) || [],
      );

      setSubTypes(subTypeField?.custom_field_options?.map((o) => o.name) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    setUploading(true);

    try {
      const res = await apiService.uploadFiles(
        selectedFiles.map((file) => ({
          file,
          filename: file.name,
        })),
      );

      const uploaded = res?.data?.files || [];

      const formattedFiles = uploaded.map((f, index) => ({
        filename: f.filename,
        size: selectedFiles[index]?.size,
        url: f.url,
      }));

      setFiles((prev) => [...prev, ...formattedFiles]);

      e.target.value = "";
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    let newErrors = {};

    ["subject", "description", "issueType", "subType"].forEach((key) => {
      if (!form[key]) newErrors[key] = "Required";
    });

    if (form.description.split(" ").length > 300) {
      newErrors.description = "Max 300 words";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);

    try {
      const payload = {
        subject: form.subject,
        body: form.description,
        ticket_form_id: 47501075391257,
        attachmentName: files.map((f) => f.filename),
        attachmentURL: files.map((f) => f.url),
        custom_fields: [
          { id: 900013325983, value: form.subject },
          { id: 32240028334873, value: form.issueType },
          { id: 32240169914009, value: form.subType },
          { id: 900013326003, value: form.description },
        ],
      };

      const res = await apiService.createTicket(payload);

      const ticketId = res?.ticket_id || res?.id || res?.data?.ticket_id;

      setTicketId(ticketId);
      setShowPopup(true);

      setForm({
        subject: "",
        description: "",
        issueType: "",
        subType: "",
      });

      setFiles([]);
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);

    setTimeout(() => {
      setForm({
        subject: "",
        description: "",
        issueType: "",
        subType: "",
      });

      setFiles([]);
      setErrors({});

      setCancelling(false);
    }, 300); // small delay for UX
  };
  
  return (
    <div style={{ height: "100%", background: "#f5f7fa" }}>
      <div style={headerStyle}>
        <ArrowBackIcon onClick={() => navigate(-1)} />

        <div style={{ display: "flex", gap: "20px" }}>
          <span style={supportItem}>
            <CallIcon fontSize="small" /> 9124573230
          </span>
          <span style={supportItem}>
            <EmailIcon fontSize="small" /> support@iserveu.in
          </span>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>Raise a Ticket</h2>

        <Field label="Issue Type" error={errors.issueType}>
          <select
            value={form.issueType}
            onChange={(e) => handleChange("issueType", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select issue type</option>
            {issueTypes.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
        </Field>

        <Field label="Issue Sub Type" error={errors.subType}>
          <select
            value={form.subType}
            onChange={(e) => handleChange("subType", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select issue sub type</option>
            {subTypes.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
        </Field>

        <Field label="Subject" error={errors.subject}>
          <input
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Description" error={errors.description}>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
          />
        </Field>

        <div style={{ fontSize: "12px" }}>Describe within 300 words</div>

        {/* FILE UPLOAD */}
        <Field label="Attachment">
          <label style={uploadBtn}>
            Upload Files
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }} 
            />
          </label>
        </Field>

        {files.map((file, index) => (
          <div key={index} style={fileRow}>
            <div style={fileLeft}>
              <PictureAsPdfIcon style={{ fontSize: "14px" }} />
              <span>{file.filename}</span>
            </div>

            <div style={fileRight}>
              <span>{(file.size / 1024).toFixed(1)} KB</span>
              <CloseIcon
                style={{ fontSize: "14px", cursor: "pointer" }}
                onClick={() => removeFile(index)}
              />
            </div>
          </div>
        ))}

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            disabled={cancelling || submitting}
          >
            {cancelling ? "Cancelling..." : "Cancel"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitting || uploading}
            sx={{ marginLeft: "9px" }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Grid>
      </div>

      {showPopup && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <h3>Ticket Created Successfully!</h3>
            <p>
              You can check its status with the ticket ID:
              <b> {ticketId}</b>
            </p>

            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
      {pageLoading && (
        <div style={loaderOverlay}>
          <div>Loading...</div>
        </div>
      )}
      {uploading && <div style={{ fontSize: "12px" }}>Uploading files...</div>}
    </div>
  );
}

const Field = ({ label, children, error }) => (
  <div style={{ marginBottom: "12px" }}>
    <label>
      {label}
      <span style={{ color: "#FF0000" }}>*</span>
    </label>
    {children}
    {error && <div style={{ color: "red", fontSize: "10px" }}>{error}</div>}
  </div>
);

const headerStyle = {
  height: "60px",
  background: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
};

const supportItem = {
  display: "flex",
  gap: "5px",
  fontSize: "12px",
};

const cardStyle = {
  background: "#fff",
  margin: "20px",
  padding: "20px",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "100%",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
};

const fileRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "8px",
  marginTop: "5px",
  borderBottom: "1px solid #eee",
  padding: "4px 0",
};

const fileLeft = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const fileRight = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const uploadBtn = {
  display: "inline-block",
  marginLeft: "10px",
  padding: "6px",
  background: "#2b6cb0",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
};

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const loaderOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(255,255,255,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
  fontSize: "18px",
  fontWeight: "bold",
};
