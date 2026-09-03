import { Box, Grid } from "@mui/material";

import ShopData from "./Shop/Shopdata";
import FilterSidebar from "./Shop/FilterSidebar";

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
      <Grid container spacing={0}>
        <Grid
          size={{
            xs: 0,
            sm: 0,
            md: 2,
          }}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <FilterSidebar />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 10,
            // lg:10,
            // xl:10,
          }}
        >
          {/* Mobile Filter Button */}
          <Box
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
              mb: 2,
            }}
          >
            <FilterSidebar mobile />
          </Box>

          <ShopData />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
