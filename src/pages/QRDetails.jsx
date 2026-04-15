import { useState } from "react";
import { Box, Typography, Card, RadioGroup, FormControlLabel, Radio, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useApp } from "../context/AppContext";
import { apiService } from "../services/serviceApi";

export default function QRDetails() {
  const { selectedVpa } = useApp();
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = useState("static");
  const [amount, setAmount] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleStaticQR = async () => {
    try {
      if (!selectedVpa?.qr_string) {
        alert("QR string not available");
        return;
      }

      const res = await apiService.qrToBase64(selectedVpa.qr_string);

      if (res?.base64Image) {
        setQrImage(`data:image/png;base64,${res.base64Image}`);
        setShowQR(true);
      } else {
        alert("QR generation failed");
      }
    } catch (err) {
      console.error(err);
      alert("API error");
    }
  };

  const handleDynamicQR = async () => {
    try {
      if (!amount) {
        enqueueSnackbar("Enter amount", { variant: "warning" });
        return;
      }

      const payload = {
        txnAmount: amount,
        serialNo: selectedVpa?.serial_number,
        vpa_id: selectedVpa?.vpa_id,
      };

      const res = await apiService.getDynamicQR(payload);

      if (res?.status === 1) {
        enqueueSnackbar(res?.message || "Failed to generate QR", {
          variant: "error",
        });
        return;
      }

      if (res?.status === 0 && res?.qr_string) {
        const base64Res = await apiService.qrToBase64(res.qr_string);

        if (base64Res?.base64Image) {
          setQrImage(`data:image/png;base64,${base64Res.base64Image}`);
          setShowQR(true);

          enqueueSnackbar("QR generated successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("QR conversion failed", {
            variant: "error",
          });
        }
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        QR Details
      </Typography>

      {/* 🔹 TOP SECTION */}
      <Card sx={{ p: 2 }}>
        <Typography fontSize="13px" fontWeight={500}>
          Select QR Type
        </Typography>

        {/* RADIO */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
          sx={{ width: "100%" }}
        >
          <RadioGroup
            row
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setShowQR(false);
              setQrImage("");
            }}
          >
            <FormControlLabel
              value="static"
              control={<Radio size="small" />}
              label={<Typography fontSize="13px">Static</Typography>}
            />
            <FormControlLabel
              value="dynamic"
              control={<Radio size="small" />}
              label={<Typography fontSize="13px">Dynamic</Typography>}
            />
          </RadioGroup>

          {type === "static" && (
            <Button
              variant="contained"
              size="small"
              onClick={handleStaticQR}
              sx={{ height: 28, fontSize: "12px", px: 2 }}
            >
              Submit
            </Button>
          )}
        </Box>

        {type === "dynamic" && (
          <Box sx={{ marginTop: "20px" }}>
            <Typography fontSize="12px" sx={{ marginBottom: "12px", color: "#555" }}>
              Enter an amount to instantly generate your dynamic QR code
            </Typography>

            <Box  sx={{ display:"flex", alignItems:"center", marginTop: "4px", gap:"10px" }}>
              <Typography
                fontSize="12px"
                sx={{ whiteSpace: "nowrap" }} 
              >
                Amount to be collected:
              </Typography>

              <TextField
                size="small"
                type="number"
                placeholder="Enter amount to be collected"
                value={amount}
                onChange={(e) => setAmount(e.target.value >= 0 ? e.target.value : "")}
                sx={{
                  width: 220,
                  "& .MuiInputBase-root": {
                    height: 30,
                    fontSize: "12px",
                  },
                }}
              />

              <Button
                variant="contained"
                size="small"
                onClick={handleDynamicQR}
                sx={{
                  height: 28,
                  fontSize: "12px",
                  px: 2,
                }}
              >
                Generate QR
              </Button>
            </Box>
          </Box>
        )}
      </Card>

      {showQR && (
        <Card
          sx={{
            mt: 3,
            p: 3,
            textAlign: "center",
            minHeight: 550, 
          }}
        >
          <img
            src={qrImage}
            alt="QR"
            style={{
              width: "350px",
              height: "500px",
            }}
          />

          <Box mt={2}>
            <Button
              variant="contained"
              size="small"
              onClick={downloadQR}
              sx={{ fontSize: "12px" }}
            >
              Download QR
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
}
