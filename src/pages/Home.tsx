import { Grid, Box, Typography } from "@mui/material";

import Heroimg from "../pages/Home/header/heroimg.tsx";
import Iconbenefit from "./Home/iconbenefit/iconbenefit.tsx";
import ProductCard from "./Shop/Productdata.tsx";
import { products } from "./Shop/Data.tsx";
import Swiperproducts from "./Home/swiperresponsive/swiperproducts.tsx";
import Opinioncards from "./Home/opinion/Opinioncards.tsx"; // ✅ correct import
import Footer from "../components/footer/Footer.tsx";

export default function ElegantSaaSDashboard() {
  return (
    <Box sx={{ p: 0, bgcolor: "#f6f6f6", width: "100%", height: "100%" }}>
      {/* <Heroimg /> */}
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Heroimg />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Iconbenefit />
      </Grid>

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mt: 6,
          mb: 2,
          fontWeight: "bold",
        }}
      >
        Product To Buy
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {products.slice(0, 4).map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>

      <Swiperproducts />

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mt: 6,
          mb: 2,
          fontWeight: "bold",
        }}
      >
        What Our Customers Say
      </Typography>

      <Grid container spacing={0} sx={{ mt: 3 }}>
        <Opinioncards /> {/* ✅ now renders the 6 cards */}
      </Grid>

      <Footer />
    </Box>
  );
}
