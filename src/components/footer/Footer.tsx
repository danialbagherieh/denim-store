import { Box } from "@mui/material";

import Newsletter from "./Newsletter.tsx";
import FooterLinks from "./FooterLinks.tsx";
import FooterBottom from "./FooterBottom.tsx";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#111111",
        color: "#ffffff",
        mt: 10,
      }}
    >
      <Newsletter />

      <FooterLinks />

      <FooterBottom />
    </Box>
  );
}