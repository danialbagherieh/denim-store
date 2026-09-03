import { Box, Button, Container, Stack, Typography } from "@mui/material";

import HeroImage from "../../../images/imgproduct/5.jpg";

import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "60vh",
          md: "80vh",
          xl: "100vh",
        },
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={HeroImage}
        alt="Hero"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: "#1565c0",
              fontSize: "1rem",
              letterSpacing: 2,
            }}
          >
            NEW COLLECTION
          </Typography>

          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              fontSize: {
                xs: "2.5rem",
                sm: "4rem",
                md: "5.5rem",
              },
            }}
          >
            Premium Jeans For Every Style
          </Typography>

          <Typography
            sx={{
              color: "#ddd",
              fontSize: "1.1rem",
              mb: 4,
              maxWidth: "600px",
            }}
          >
            Discover our latest collection of men's and women's denim. Crafted
            for comfort, designed for confidence, and built for everyday wear.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/shop")}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: "#8b8b8b",
                },
              }}
            >
              Shop Jeans
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/shop?collection=new")}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  borderColor: "#8b8b8b",
                },
              }}
            >
              View Collection
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
