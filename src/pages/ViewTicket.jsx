import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Menu,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CBOILoader from "../components/CBOILoader";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/serviceApi";
import { useSnackbar } from "notistack";

export default function ViewTicket() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const hasFetched = useRef(false);

  const today = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [status, setStatus] = useState("ALL");
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const mapTicketData = (data = []) => {
    console.log("here");
    const getCustomValue = (fields, id) => {
      const found = fields?.find((f) => f.id === id);
      return found?.value || "-";
    };

    return data.map((item) => ({
      ticket_id: item.id || "-",

      vpa_id: getCustomValue(item.custom_fields, 31900729453849),

      serial_number: getCustomValue(item.custom_fields, 31900747692953),

      mobile: getCustomValue(item.custom_fields, 32240502371865),

      issue_type: getCustomValue(item.custom_fields, 32240028334873),

      issue_sub_type: getCustomValue(item.custom_fields, 32240169914009),

      subject: item.subject || "-",

      created_date: item.created_at
        ? new Date(item.created_at).toLocaleString()
        : "-",

      status: item.status || "-",
    }));
  };
  const fetchTickets = async () => {
    try {
      setLoading(true); 

      const payload = {
        created_after: startDate,
        created_before: endDate,
        status: status.toLowerCase(),
      };

      const res = await apiService.filterTickets(payload);

      if (
        res?.statusDesc === "No tickets found!!" ||
        res?.status === "SUCCESS"
      ) {
        const mapped = mapTicketData(res.data || []);
        setTickets(mapped);
        enqueueSnackbar("Tickets fetched successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to fetch tickets", { variant: "error" });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchTickets();
  }, []);

  const handleDownloadTicket = async () => {
    try {
      if (!selectedRow) return;

      const blob = await apiService.downloadTicket({
        ticket_id: selectedRow.ticket_id,
        user_name: selectedRow.mobile,
      });

      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Ticket_${selectedRow.ticket_id}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    } finally {
      handleMenuClose();  
    }
  };
  const handleReset = () => {
    setStartDate(today);
    setEndDate(today);
    setStatus("ALL");
    fetchTickets();
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const filteredTickets = tickets.filter((t) =>
    String(t.ticket_id).toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedTickets = filteredTickets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* HEADING */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Help & Support
      </Typography>

      {/* FILTER SECTION */}
      <Card
        sx={{
          p: 3,
          mb: 2,
          backgroundColor: "#fff",
          borderRadius: "10px",
          maxWidth: "900px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="Start Date"
            type="date"
            size="small"
            value={startDate}
            onChange={(e) => {
              const value = e.target.value;

              if (value > today) {
                setStartDate(today);
                enqueueSnackbar("Future dates are not allowed", {
                  variant: "warning",
                });
              } else {
                setStartDate(value);
              }
            }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="End Date"
            type="date"
            size="small"
            value={endDate}
            onChange={(e) => {
              const value = e.target.value;

              if (value > today) {
                setEndDate(today);
                enqueueSnackbar("Future dates are not allowed", {
                  variant: "warning",
                });
              } else {
                setEndDate(value);
              }
              if (value < startDate) {
                enqueueSnackbar("End date cannot be before start date", {
                  variant: "error",
                });
                return;
              }
            }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="Status"
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: "150px" }}
          >
            {["ALL", "NEW", "OPEN", "PENDING", "SOLVED", "CLOSED"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", gap: "10px", paddingLeft: "100px" }}>
            <Button variant="contained" onClick={fetchTickets}>
              Submit
            </Button>

            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Box>
      </Card>

      {/* SEARCH */}
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search by Ticket ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: "300px", backgroundColor: "#fff" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* TABLE */}
      <Card
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          maxWidth: "1000px",
          position: "relative",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.7)",
              zIndex: 10,
            }}
          >
            <CBOILoader size={60} />
          </Box>
        )}
        <Box
          sx={{
            maxWidth: "100%",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Table stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                {[
                  "TICKET ID",
                  "VPA ID",
                  "DEVICE SERIAL NUMBER",
                  "MOBILE",
                  "ISSUE TYPE",
                  "SUB TYPE",
                  "SUBJECT",
                  "CREATED DATE",
                  "STATUS",
                  "ACTION",
                ].map((head, index, arr) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      borderRight:
                        index !== arr.length - 1 ? "1px solid #e0e0e0" : "none",
                      backgroundColor: "#fafafa",
                      position: "sticky", 
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedTickets.length > 0 ? (
                paginatedTickets.map((row, i) => (
                  <TableRow key={i} hover>
                    {[
                      row.ticket_id,
                      row.vpa_id,
                      row.serial_number,
                      row.mobile,
                      row.issue_type,
                      row.issue_sub_type,
                      row.subject,
                      row.created_date,
                      row.status,
                    ].map((cell, idx, arr) => (
                      <TableCell
                        key={idx}
                        sx={{
                          whiteSpace: "nowrap",
                          borderRight: "1px solid #f0f0f0",
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}

                    <TableCell>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No tickets found for the selected criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          component="div"
          count={filteredTickets.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            console.log("Selected Row:", selectedRow);
            navigate(`/view-tickets/${selectedRow.ticket_id}`);
          }}
        >
          View Details
        </MenuItem>
        <MenuItem onClick={handleDownloadTicket}>Download Ticket</MenuItem>
        {selectedRow?.status?.toLowerCase() !== "closed" && (
          <>
            <MenuItem onClick={handleMenuClose}>Reopen</MenuItem>
            <MenuItem onClick={handleMenuClose}>Close</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
