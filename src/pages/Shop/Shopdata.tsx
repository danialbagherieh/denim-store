import { useState, useMemo } from "react";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { products } from "./Data.tsx";
import ProductCard from "./Productdata";

export default function ShopData() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const productsPerPage = 12;

  // =========================
  // URL SEARCH PARAMETERS
  // =========================

  const search = searchParams.get("search")?.trim().toLowerCase() || "";

  const gender = searchParams.get("gender");
  const fit = searchParams.get("fit");
  const size = searchParams.get("size");
  const color = searchParams.get("color");

  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const ratingParam = searchParams.get("rating");

  const minPrice = minPriceParam !== null ? Number(minPriceParam) : null;

  const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : null;

  const rating = ratingParam !== null ? Number(ratingParam) : null;

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productGender = product.gender.toLowerCase();
      const productFit = product.fit.toLowerCase();
      const productColor = product.color.toLowerCase();
      const productModel = product.model.toLowerCase();

      // =========================
      // FORCE TEST FOR "MEN"
      // =========================

      if (search === "men") {
        return productGender === "men";
      }

      // =========================
      // NORMAL SEARCH
      // =========================

      if (
        search &&
        !productName.includes(search) &&
        !productGender.includes(search) &&
        !productFit.includes(search) &&
        !productColor.includes(search) &&
        !productModel.includes(search)
      ) {
        return false;
      }

      // =========================
      // GENDER FILTER
      // =========================

      if (gender && product.gender !== gender) {
        return false;
      }

      // =========================
      // FIT FILTER
      // =========================

      if (fit && product.fit !== fit) {
        return false;
      }

      // =========================
      // SIZE FILTER
      // =========================

      if (size && !product.sizes.includes(size)) {
        return false;
      }

      // =========================
      // COLOR FILTER
      // =========================

      if (color && product.color !== color) {
        return false;
      }

      // =========================
      // MINIMUM PRICE
      // =========================

      if (minPrice !== null && product.price < minPrice) {
        return false;
      }

      // =========================
      // MAXIMUM PRICE
      // =========================

      if (maxPrice !== null && product.price > maxPrice) {
        return false;
      }

      // =========================
      // RATING FILTER
      // =========================

      if (rating !== null && product.rating < rating) {
        return false;
      }

      return true;
    });
  }, [search, gender, fit, size, color, minPrice, maxPrice, rating]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // =========================
  // UI
  // =========================

  return (
    <>
      {filteredProducts.length === 0 ? (
        <Box
          sx={{
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            No products found
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Try searching by gender, fit, color, model, or product name.
          </Typography>
        </Box>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            sx={{
              mt: 2,
            }}
          >
            {currentProducts.map((product) => (
              <Grid
                key={product.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  gender={product.gender}
                  fit={product.fit}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                  sizes={product.sizes}
                  stock={product.stock}
                  color={product.color}
                  model={product.model}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Stack
              sx={{
                mt: 4,
                mb: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                color="primary"
                onChange={(_, value) => setPage(value)}
              />
            </Stack>
          )}
        </>
      )}
    </>
  );
}
