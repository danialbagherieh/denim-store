import { useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CartProduct from "./cart/Cartproduct";
import OrderSummary from "./cart/Ordersummary";
import Cartshipinginfo from "./cart/Cartshippinginfo";
import Cartdiscount from "./cart/Cartdiscount";

import { useCartStore } from "./cart/Cartstore/Cartstore";
import Footbar from "../components/footer/Footer.tsx";

export default function Cart() {
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const isCartEmpty = cart.length === 0;
  const [discount, setDiscount] = useState(0); // ✅ ADDED

  return (
    <Box
      sx={{
        px: 0,
        pt: 3,
        pb: 0,
        bgcolor: "#f6f6f6",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 8 }}>
          {isCartEmpty ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
                textAlign: "center",
                px: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Looks like you haven’t added any items yet. Start shopping to
                fill it up!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/shop")}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            cart.map((item) => (
              <Box key={item.cartItemId} sx={{ mb: 3 }}>
                <CartProduct item={item} />
              </Box>
            ))
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          {/* ✅ PASS DISCOUNT DOWN */}
          <OrderSummary discount={discount} />
          <Cartshipinginfo />
          {/* ✅ PASS SETTER DOWN */}
          <Cartdiscount onDiscountChange={setDiscount} />
        </Grid>
      </Grid>
      <Footbar />
    </Box>
  );
}
