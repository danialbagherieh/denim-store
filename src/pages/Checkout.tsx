import { Box, Grid } from "@mui/material";

import Stepper from "./Checkout/Stepper.tsx";

import Checkoutsummary from "./Checkout/checkoutordersummary/Checkoutsummary.tsx";

import Footer from "../components/footer/Footer.tsx";

export default function Shop() {
  return (
    <Box
      sx={{
        bgcolor: "#f6f6f6",
        minHeight: "100vh",
        p: 0,
      }}
    >
      <Grid
        container
        spacing={{
          xs: 2,
          md: 4,
        }}
        sx={{
          alignItems: "flex-start",
        }}
      >
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 7,
            lg: 7,
            xl: 7,
          }}
        >
          <Stepper />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 5,
            lg: 5,
            xl: 5,
          }}
        >
          {/* Mobile Filter Button */}
          <Checkoutsummary />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
          }}
        >
          {/* Mobile Filter Button */}
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
