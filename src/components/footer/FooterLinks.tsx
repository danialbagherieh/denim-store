import { Box, Grid, Typography } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import Logo from "../navbar/Logo.tsx";

export default function FooterLinks() {
  const footerLinkStyle = {
    color: "#bdbdbd",
    cursor: "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      color: "#ffffff",
      transform: "translateX(4px)",
    },
  };

  return (
    <Box
      sx={{
        px: { xs: 3, md: 8 },
        py: 6,
      }}
    >
      <Grid container spacing={5}>
        {/* Brand */}

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              width: 180,
              mb: 2,
            }}
          >
            <Logo />
          </Box>

          <Typography
            sx={{
              color: "#bdbdbd",
              lineHeight: 1.8,
              mb: 2,
              maxWidth: 350,
            }}
          >
            Premium denim crafted for modern style and everyday comfort.
          </Typography>

          <Typography sx={{ color: "#bdbdbd" }}>lactos@gmail.com</Typography>
        </Grid>

        {/* Shop */}
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography
            sx={{
              fontWeight: 700,
              mb: 2,
              letterSpacing: 1,
            }}
          >
            SHOP
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Typography
              component={RouterLink}
              to="/"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Home
            </Typography>

            <Typography
              component={RouterLink}
              to="/shop"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Shop
            </Typography>

            <Typography
              component={RouterLink}
              to="/cart"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Cart
            </Typography>

            <Typography
              component={RouterLink}
              to="/signin"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Sign In
            </Typography>

            <Typography
              component={RouterLink}
              to="/checkout"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Checkout
            </Typography>
          </Box>
        </Grid>

        {/* Collection */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              mb: 2,
              letterSpacing: 1,
            }}
          >
            COLLECTION
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Typography
              component={RouterLink}
              to="/shop?gender=men"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Men
            </Typography>

            <Typography
              component={RouterLink}
              to="/shop?gender=women"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Women
            </Typography>

            <Typography
              component={RouterLink}
              to="/shop?fit=skinny"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Skinny Fit
            </Typography>

            <Typography
              component={RouterLink}
              to="/shop?fit=regular"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Regular Fit
            </Typography>

            <Typography
              component={RouterLink}
              to="/shop?fit=baggy"
              sx={{
                ...footerLinkStyle,
                textDecoration: "none",
              }}
            >
              Baggy Fit
            </Typography>
          </Box>
        </Grid>

        {/* Help Center */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              mb: 2,
              letterSpacing: 1,
            }}
          >
            HELP CENTER
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Typography sx={footerLinkStyle}>Shipping Info</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
