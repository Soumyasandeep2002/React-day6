import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  InputBase,
} from "@mui/material";

import { useApp } from "../context/AppContext";
import { fetchReportData } from "../utility/utils";

export default function Transactions() {
  const { selectedVpa } = useApp();
  const hasFetched = useRef(false);

  const [filter, setFilter] = useState("today");
  const [monthOption, setMonthOption] = useState("1"); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTransactions = async (type = "today", customStart, customEnd) => {
    try {
      if (!selectedVpa) return;

      let result;

      if (type === "today") {
        result = await fetchReportData(selectedVpa, "today");
      }

      if (type === "month") {
        const { start, end } = getMonthRange();

        const payload = {
          startDate: start,
          endDate: end,
          vpa_id: selectedVpa.vpa_id,
          mode: "both",
        };

        const res = await fetchDirect(payload);
        result = { raw: res };
      }

      if (type === "custom") {
        const payload = {
          startDate: customStart,
          endDate: customEnd,
          vpa_id: selectedVpa.vpa_id,
          mode: "both",
        };

        const res = await fetchDirect(payload);
        result = { raw: res };
      }

      setData(result?.raw || []);
      setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDirect = async (payload) => {
    const apiRes = await fetch("/CBOI/reports/querysubmit_username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await apiRes.text();
    if (!text) return [];

    try {
      const json = JSON.parse(text);
      return json?.data || [];
    } catch (err) {
      console.error("JSON parse error:", err);
      return [];
    }
  };

  useEffect(() => {
    if (!selectedVpa || filter !== "today") return;
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchTransactions("today");
  }, [selectedVpa, filter]);

  const getMonthRange = () => {
    const now = new Date();
    const end = now;
    let start = new Date();

    if (monthOption === "1") start.setMonth(now.getMonth() - 1);
    if (monthOption === "3") start.setMonth(now.getMonth() - 3);
    if (monthOption === "6") start.setMonth(now.getMonth() - 6);

    return {
      start: formatDate(start),
      end: formatDate(end),
    };
  };

  const formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    if (filter === "month") {
      fetchTransactions("month");
    }

    if (filter === "custom") {
      if (!startDate || !endDate) return;

      fetchTransactions(
        "custom",
        formatDate(new Date(startDate)),
        formatDate(new Date(endDate)),
      );
    }
  };

  const filteredData = data.filter((item) =>
    item.Transaction_Id?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Transaction Details
      </Typography>

      {/* FILTER */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography mb={2}>Select a Report Filter</Typography>

        <RadioGroup
          row
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            hasFetched.current = false; 
          }}
        >
          <FormControlLabel value="today" control={<Radio />} label="Today" />
          <FormControlLabel value="month" control={<Radio />} label="Monthly" />
          <FormControlLabel value="custom" control={<Radio />} label="Custom" />
        </RadioGroup>

        {/* MONTH */}
        {filter === "month" && (
          <Box mt={2} display="flex" alignItems="center">
            <Select
              value={monthOption}
              onChange={(e) => setMonthOption(e.target.value)}
              size="small"
              sx={{
                minWidth: 180, 
                mr: 2, 
              }}
            >
              <MenuItem value="1">Last 1 Month</MenuItem>
              <MenuItem value="3">Last 3 Months</MenuItem>
              <MenuItem value="6">Last 6 Months</MenuItem>
            </Select>

            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        )}

        {/* CUSTOM */}
        {filter === "custom" && (
          <Box mt={2} display="flex" alignItems="center" gap={2}>
            <TextField
              type="date"
              size="small"
              onChange={(e) => setStartDate(e.target.value)}
              sx={{
                minWidth: 150,
                paddingRight:"20px",
                "& .MuiInputBase-root": {
                  height: 30,
                  fontSize: "13px",
                },
              }}
            />

            <TextField
              type="date"
              size="small"
              onChange={(e) => setEndDate(e.target.value)}
              sx={{
                minWidth: 150,
                paddingRight:"20px",
                "& .MuiInputBase-root": {
                  height: 30,
                  fontSize: "13px",
                },
              }}
            />

            <Button
              variant="contained"
              size="small"
              onClick={handleSubmit}
              sx={{
                height: 27, 
                px: 2,
              }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Card>

      {/* TABLE */}
      <Card sx={{ p: 2 }}>
        {/* SEARCH */}
        <Box mb={2}>
          <InputBase
            placeholder="Search by Transaction ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              border: "1px solid #ccc",
              px: 1,
              py: "3px",
              borderRadius: 1,
              width: 220,
              fontSize: "13px", 
            }}
          />
        </Box>

        {/* TABLE */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>VPA</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date & Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography sx={{ fontSize: "13px", color: "#888", py: 2 }}>
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.Transaction_Id}</TableCell>
                    <TableCell>{row.VPA_ID}</TableCell>
                    <TableCell>{row.Transaction_Amount}</TableCell>
                    <TableCell>{row["Date_&_Time"]}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Card>
    </Box>
  );
}
