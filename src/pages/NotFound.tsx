import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        px: 2,
        textAlign: "center",
        bgcolor: "#f7f7f7",
      }}
    >
      <ReportProblemOutlinedIcon
        sx={{ fontSize: 80, color: "#bdbdbd", mb: 2 }}
      />

      <Typography
        variant="h1"
        sx={{ fontWeight: 700, fontSize: { xs: "3rem", sm: "4rem" } }}
      >
        404
      </Typography>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 500, mb: 3 }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          bgcolor: "#111111",
          color: "white",
          textTransform: "none",
          px: 4,
          py: 1.5,
          "&:hover": {
            bgcolor: "#333333",
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
}
