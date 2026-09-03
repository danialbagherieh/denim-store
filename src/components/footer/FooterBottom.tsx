import { Box, Typography, IconButton } from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function FooterBottom() {
  return (
    <Box
      sx={{
        borderTop: "1px solid #2a2a2a",
        px: { xs: 3, md: 8 },
        py: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "#9e9e9e",
            fontSize: "14px",
          }}
        >
          © 2026 Denim Store. All rights reserved.
        </Typography>

        <Box>
          {/* WhatsApp */}
          <IconButton
            component="a"
            href="https://wa.me/your-number" // 👈 replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#bdbdbd",

              "&:hover": {
                color: "#25D366",
                transform: "scale(1.1)",
              },
            }}
          >
            <WhatsAppIcon />
          </IconButton>

          {/* Telegram */}
          <IconButton
            component="a"
            href="https://t.me/your-username" // 👈 replace with your Telegram link
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#bdbdbd",

              "&:hover": {
                color: "#229ED9",
                transform: "scale(1.1)",
              },
            }}
          >
            <TelegramIcon />
          </IconButton>

          {/* Instagram */}
          <IconButton
            component="a"
            href="https://instagram.com/your-username" // 👈 replace with your Instagram profile
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#bdbdbd",

              "&:hover": {
                color: "#E1306C",
                transform: "scale(1.1)",
              },
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
