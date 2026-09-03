import { Box, Typography } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function CheckoutSecure() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 2.5,
        p: 1.4,
        borderRadius: 2,
        bgcolor: "action.hover",
      }}
    >
      <LockOutlinedIcon
        color="success"
        sx={{
          fontSize: 20,
        }}
      />

      <Typography variant="caption" color="text.secondary">
        Secure checkout. Your payment information is protected.
      </Typography>
    </Box>
  );
}
