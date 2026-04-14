import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from "@mui/material";

export default function VpaSelectorDialog({
  open,
  vpaList,
  tempSelection,
  setTempSelection,
  onCancel,
  onProceed,
}) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "16px", color: "#666" }}>
        Select VPA
      </DialogTitle>

      <DialogContent sx={{ py: 1 }}>
        <RadioGroup value={tempSelection?.vpa_id}>
          {vpaList.map((v) => (
            <FormControlLabel
              key={v.vpa_id}
              value={v.vpa_id}
              control={<Radio size="small" />}
              label={<Typography fontSize="13px">{v.vpa_id}</Typography>}
              onChange={() => setTempSelection(v)}
            />
          ))}
        </RadioGroup>
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={onProceed}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
