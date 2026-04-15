import { useEffect, useState, useRef } from "react";
import { Box, Typography, Card, Grid, TextField, MenuItem, Button } from "@mui/material";

import { useApp } from "../context/AppContext";
import { apiService } from "../services/serviceApi";
import { useSnackbar } from "notistack";

export default function Language() {
  const hasFetched = useRef(false);
  const isUpdating = useRef(false);
  const { selectedVpa } = useApp();
  const { enqueueSnackbar } = useSnackbar();

  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const tid = selectedVpa?.serial_number;

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!tid || hasFetched.current) return;

        hasFetched.current = true; 

        const currentRes = await apiService.fetchCurrentLanguage(tid);

        if (currentRes?.result === "success") {
          setCurrentLanguage(currentRes.data);
        } else {
          enqueueSnackbar(
            currentRes?.message || "Failed to fetch current language",
            { variant: "error" },
          );
        }

        const langRes = await apiService.fetchLanguages();

        if (langRes?.result === "success") {
          setLanguages(langRes.data || []);
        } else {
          enqueueSnackbar("Failed to fetch languages", {
            variant: "error",
          });
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    };

    loadData();
  }, [tid]);

  const handleUpdate = async () => {
    try {
      if (isUpdating.current) return; 

      if (!selectedLanguage) {
        enqueueSnackbar("Please select a language", {
          variant: "warning",
        });
        return;
      }

      isUpdating.current = true; 

      const payload = {
        tid,
        update_language: selectedLanguage,
      };

      const res = await apiService.updateLanguage(payload);

      if (res?.responseCode === "01") {
        enqueueSnackbar(
          "Request successfully initiated, check after sometime",
          { variant: "warning" },
        );
      }
      else if (res?.responseCode === "00") {
        enqueueSnackbar("Language updated successfully", {
          variant: "success",
        });
        setCurrentLanguage(selectedLanguage);
        setSelectedLanguage("");
      }
      else if (res?.responseCode === "02") {
        enqueueSnackbar( res?.message || "Update failed", {
          variant: "error",
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      isUpdating.current = false; 
    }
  };

  const handleCancel = () => {
    setSelectedLanguage("");
  };

  return (
    <Box p={3}>
      {/* HEADING */}
      <Typography variant="h6" mb={2}>
        Language Update
      </Typography>

      <Card
        sx={{
          p: 3,
          maxWidth: 600,
        }}
      >
        <Box display="flex" flexDirection="column">
          {/* VPA ID */}
          <Box>
            <Typography fontSize="13px" sx={{ marginBottom: "4px" }}>
              VPA ID
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={selectedVpa?.vpa_id || ""}
              disabled
              sx={{ minWidth: "500px" }}
            />
          </Box>

          {/* SERIAL NUMBER */}
          <Box>
            <Typography
              fontSize="13px"
              sx={{ marginTop: "8px", marginBottom: "4px" }}
            >
              Device Serial Number
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={selectedVpa?.serial_number || ""}
              disabled
              sx={{ minWidth: "500px" }}
            />
          </Box>

          {/* CURRENT LANGUAGE */}
          <Box>
            <Typography
              fontSize="13px"
              sx={{ marginTop: "8px", marginBottom: "4px" }}
            >
              Current Language
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={currentLanguage || ""}
              disabled
              sx={{ minWidth: "500px" }}
            />
          </Box>

          {/* LANGUAGE UPDATE */}
          <Box>
            <Typography
              fontSize="13px"
              sx={{ marginTop: "8px", marginBottom: "4px" }}
            >
              Language Update
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              sx={{ minWidth: "500px" }}
            >
              <MenuItem value="">Select Language</MenuItem>

              {languages.map((lang, i) => (
                <MenuItem key={i} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* BUTTONS */}
        <Box
          sx={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={handleCancel}
            sx={{
              textTransform: "none",
              px: 2,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={handleUpdate}
            sx={{
              textTransform: "none",
              px: 2,
            }}
          >
            Update
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
