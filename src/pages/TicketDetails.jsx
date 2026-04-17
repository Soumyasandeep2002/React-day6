import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CBOILoader from "../components/CBOILoader";
import { apiService } from "../services/serviceApi";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);

  const getCustomValue = (fields, id) => {
    const found = fields?.find((f) => f.id === id);
    return found?.value || "-";
  };

  const fetchDetails = async () => {
    try {
      setLoading(true);

      const payload = { ticket_id: id };

      const res = await apiService.viewTicket(payload);
      const data = res?.data || res;

      const mapped = {
        ticket_id: data?.id || "-",
        issue_type: getCustomValue(data?.custom_fields, 32240028334873),
        issue_sub_type: getCustomValue(data?.custom_fields, 32240169914009),
        vpa_id: getCustomValue(data?.custom_fields, 31900729453849),
        serial_number: getCustomValue(data?.custom_fields, 31900747692953),
        mobile: getCustomValue(data?.custom_fields, 32240502371865),
        description: data?.description || "-",
        status: data?.status || "-",
        created_date: data?.created_at
          ? new Date(data.created_at).toLocaleDateString()
          : "-",
      };

      setTicket(mapped);

      const commentRes = await apiService.showComment(payload);
      setComments(commentRes?.data || commentRes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await apiService.downloadTicket({
        ticket_id: ticket.ticket_id,
        user_name: ticket.mobile,
      });

      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Ticket_${ticket.ticket_id}.pdf`); // change extension if needed
      document.body.appendChild(link);

      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchDetails();
  }, [id]);

  if (!ticket) return null;

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.6)",
            zIndex: 10,
          }}
        >
          <CBOILoader />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" fontWeight={600} ml={1}>
            View Details
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" onClick={handleDownload}>
            Download
          </Button>

          <Button
            variant="contained"
            disabled={ticket.status.toLowerCase() === "closed"}
            sx={{ marginLeft: "16px" }}
          >
            Close Ticket
          </Button>
        </Box>
      </Box>

      {/* 🔹 MAIN CARD (Ticket Info) */}
      <Card sx={{ p: 3, mb: 3, borderRadius: "10px" }}>
        {/* TOP ROW */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontWeight={600}>
            Ticket ID: #{ticket.ticket_id}
          </Typography>
        </Box>

        {/* DETAILS GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 3,
          }}
        >
          <Box>
            <Label>Issue Type</Label>
            <Value>{ticket.issue_type}</Value>

            <Label>Issue Sub Type</Label>
            <Value>{ticket.issue_sub_type}</Value>

            <Label>Created Date</Label>
            <Value>{ticket.created_date}</Value>

            <Label>Mobile</Label>
            <Value>{ticket.mobile}</Value>
          </Box>

          <Box>
            <Label>VPA ID</Label>
            <Value>{ticket.vpa_id}</Value>

            <Label>Device Serial</Label>
            <Value>{ticket.serial_number}</Value>

            <Label>Status</Label>
            <Typography
              sx={{
                mt: 0.5,
                px: 2,
                py: 0.3,
                borderRadius: "20px",
                display: "inline-block",
                backgroundColor:
                  ticket.status.toLowerCase() === "closed"
                    ? "#e0e0e0"
                    : "#e3f2fd",
                fontWeight: 600,
              }}
            >
              {ticket.status}
            </Typography>
          </Box>

          <Box>
            <Label>Issue Description</Label>
            <Value>{ticket.description}</Value>
          </Box>
        </Box>
      </Card>

      {/* COMMENTS */}
      <Typography variant="subtitle1" mb={2} fontWeight={600}>
        Messages
      </Typography>

      {comments.map((c, i) => (
        <Card key={i} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Avatar />

            <Box>
              <Typography fontWeight={600}>{c.username || "-"}</Typography>

              <Typography fontSize="12px" color="text.secondary">
                {c.created_at ? new Date(c.created_at).toLocaleString() : "-"}
              </Typography>

              <Typography sx={{ mt: "8px", fontWeight: 700 }}>
                {c.body}
              </Typography>
            </Box>
          </Box>
        </Card>
      ))}

      {/* REPLY BOX */}
      <Card
        sx={{
          p: 2,
          mt: 2,
          opacity: ticket.status.toLowerCase() === "closed" ? 0.6 : 1, // 👈 faded look
          pointerEvents:
            ticket.status.toLowerCase() === "closed" ? "none" : "auto", // 👈 disable all clicks
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar />

          <TextField
            fullWidth
            placeholder="Reply here..."
            variant="standard"
            disabled={ticket.status.toLowerCase() === "closed"} // 👈 disable input
            InputProps={{
              disableUnderline: true,
            }}
          />

          <IconButton disabled={ticket.status.toLowerCase() === "closed"}>
            <AttachFileIcon />
          </IconButton>

          <IconButton disabled={ticket.status.toLowerCase() === "closed"}>
            <SendIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}

const Label = ({ children }) => (
  <Typography
    sx={{
      color: "#6b7280", 
      fontSize: "16px",
      mt: 2,
    }}
  >
    {children}
  </Typography>
);

const Value = ({ children }) => (
  <Typography
    sx={{
      fontWeight: 600,
      fontSize: "16px",
      color: "#000",
      mt: 0.5,
    }}
  >
    {children}
  </Typography>
);
