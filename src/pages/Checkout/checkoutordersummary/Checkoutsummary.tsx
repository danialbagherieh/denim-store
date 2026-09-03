import { useState } from "react";

import { Box, Divider, Paper, Typography } from "@mui/material";

import CheckoutItems from "./Checkoutitems.tsx";
import PromoCode from "./Checkoutpromocode.tsx";
import PriceDetails from "./Checkoutpricedetail.tsx";
import CheckoutSecure from "./Checkoutsecure.tsx";

import { useCartStore } from "./../../cart/Cartstore/Cartstore.tsx";

export default function CheckoutSummary() {
  // Get the real cart from Zustand
  const cart = useCartStore((state) => state.cart);

  // Discount will be updated by the PromoCode component
  const [discount, setDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Calculate total quantity
  const itemCount = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  // Shipping rules:
  // Empty cart = $0
  // Subtotal under $100 = $10
  // Subtotal $100 or more = Free
  const shipping = cart.length === 0 ? 0 : subtotal >= 100 ? 0 : 10;

  // Calculate final total
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: {
            xs: "static",
            md: "sticky",
          },

          top: 24,

          width: "100%",
          boxSizing: "border-box",

          p: {
            xs: 2,
            sm: 2.5,
          },

          borderRadius: 3,

          border: "1px solid",
          borderColor: "divider",

          bgcolor: "background.paper",
        }}
      >
        {/* Order Summary title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2.5,
          }}
        >
          Order Summary
        </Typography>

        {/* Empty cart */}
        {cart.length === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              Your cart is empty
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Add products to your cart before checking out.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Cart products – no onRemoveItem needed, removal is handled internally */}
            <CheckoutItems cart={cart} />

            {/* Divider after products */}
            <Divider
              sx={{
                my: 2.5,
              }}
            />

            {/* Promo code */}
            <PromoCode onDiscountChange={setDiscount} />

            {/* Divider after promo code */}
            <Divider
              sx={{
                my: 2.5,
              }}
            />

            {/* Price details */}
            <PriceDetails
              itemCount={itemCount}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
            />

            {/* Secure checkout */}
            <CheckoutSecure />
          </>
        )}
      </Paper>
    </Box>
  );
}
