import { useEffect, useRef, useState } from "react";
import { apiService } from "../services/serviceApi";
import VpaSelectorDialog from "../components/VpaSelectorDialog";
import CBOILoader from "../components/CBOILoader";

import { Box, Typography, Card, Select, MenuItem, Grid } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { getFormattedDate, fetchReportData } from "../utility/utils";

import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const [vpaList, setVpaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [tempSelection, setTempSelection] = useState(null);
  const [dateFilter, setDateFilter] = useState("today");

  const {
    selectedVpa,
    setSelectedVpa,
    reportData,
    setReportData,
    setReportList,
  } = useApp();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const load = async () => {
      try {
        setLoading(true);

        const res = await apiService.fetchUserById({
          mobile_number: "9348781833",
        });

        const list = res?.data || [];
        setVpaList(list);

        if (list.length > 0) {
          if (!selectedVpa?.vpa_id) {
            setTempSelection(list[0]);
            setOpenDialog(true);
          } else {
            setTempSelection(selectedVpa);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleProceed = async () => {
    setOpenDialog(false);
    setLoading(true);

    try {
      const data = await fetchReportData(tempSelection, dateFilter);

      setReportData({
        count: data.count,
        amount: data.amount,
      });

      setReportList(data.raw);

      setSelectedVpa(tempSelection);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (selectedVpa) {
        setLoading(true);
        const data = await fetchReportData(selectedVpa, dateFilter);

        setReportData({
          count: data.count,
          amount: data.amount,
        });

        setReportList(data.raw);
        setLoading(false);
      }
    };

    load();
  }, [dateFilter]);

  if (loading && !selectedVpa) return <CBOILoader />;

  return (
    <>
      {loading && selectedVpa && <CBOILoader size={50} />}
      <Box p={3}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          {/* LEFT */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flexShrink: 0,
            }}
          >
            <Typography variant="h6" sx={{ color: "#1d1d1d" }}>
              Dashboard
            </Typography>

            <Typography variant="body2">
              <b>VPA ID :</b>{" "}
              <span
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => setOpenDialog(true)}
              >
                {selectedVpa?.vpa_id}
              </span>
            </Typography>
          </Box>

          {/* RIGHT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              minWidth: "140px",
            }}
          >
            <Select
              size="small"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              sx={{
                minWidth: 120,
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="yesterday">Yesterday</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* KPI */}
        <Box sx={{ marginTop: 3 }}>
          {selectedVpa && (
            <Grid container spacing={3} mt={8} columnSpacing={12}>
              {/* TRANSACTIONS */}
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="flex-start"
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 2,
                    width: "100%",
                    maxWidth: "480px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* LEFT */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        background: "#e3f2fd",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <SyncAltIcon sx={{ color: "#000", fontSize: 18 }} />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#6b7280",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Total Transactions
                    </Typography>
                  </Box>

                  {/* RIGHT VALUE */}
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      paddingLeft:"100px"
                    }}
                  >
                    {reportData?.count}
                  </Typography>
                </Card>
              </Grid>

              {/* AMOUNT */}
              <Grid
                item
                xs={12}
                md={6}
                display="flex"
                justifyContent="flex-start"
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 2,
                    width: "100%",
                    maxWidth: "480px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* LEFT */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        background: "#e3f2fd",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <LocalAtmIcon sx={{ color: "#000", fontSize: 18 }} />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#6b7280",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                      >
                      Total Amount
                    </Typography>
                  </Box>

                  {/* RIGHT VALUE */}
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      paddingLeft:"100px"
                    }}
                  >
                    {reportData?.amount}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* DIALOG COMPONENT */}
        <VpaSelectorDialog
          open={openDialog}
          vpaList={vpaList}
          tempSelection={tempSelection}
          setTempSelection={setTempSelection}
          onCancel={() => {
            if (selectedVpa) setOpenDialog(false);
          }}
          onProceed={handleProceed}
        />
      </Box>
    </>
  );
}
