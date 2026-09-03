import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    // Basic validation
    if (!email.trim() || !email.includes("@")) {
      // Optionally show an error snackbar
      return;
    }

    setLoading(true);

    // Simulate API call (e.g., subscribing to newsletter)
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
      setEmail(""); // Clear the field
    }, 800);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid #2a2a2a",
          py: 6,
          px: { xs: 3, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Join Our Newsletter
        </Typography>

        <Typography
          sx={{
            color: "#bdbdbd",
            mb: 4,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Get exclusive offers, new arrivals, and 10% off your first order.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="Enter your email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                sm: 350,
              },
              bgcolor: "#ffffff",
              borderRadius: 1,
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubscribe}
            disabled={loading}
            sx={{
              bgcolor: "#ffffff",
              color: "#111111",
              px: 4,
              fontWeight: 700,

              "&:hover": {
                bgcolor: "#e0e0e0",
              },
              "&:disabled": {
                bgcolor: "#f0f0f0",
                color: "#999",
              },
            }}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </Box>
      </Box>

      {/* Top‑of‑page notification */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          mt: 8, // offset below navbar (adjust as needed)
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          ✅ Subscribed! You’ll receive our latest updates.
        </Alert>
      </Snackbar>
    </>
  );
}
