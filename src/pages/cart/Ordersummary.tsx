import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Button, CircularProgress, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";

import Paymenticons from "./../../images/payment-icons-pack.svg";
import { useCartStore } from "./Cartstore/Cartstore";

// ✅ ADDED discount prop
type OrderSummaryProps = {
  discount?: number;
};

export default function OrderSummary({ discount = 0 }: OrderSummaryProps) {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = cart.length === 0 ? 0 : subtotal >= 100 ? 0 : 10;
  const tax = subtotal * 0.08;

  // ✅ SUBTRACT DISCOUNT FROM TOTAL
  const total = subtotal + shipping + tax - discount;

  const isCartEmpty = cart.length === 0;

  const handleCheckout = async () => {
    // 1. Validate stock
    const outOfStockItems = cart.filter((item) => item.quantity > item.stock);
    if (outOfStockItems.length > 0) {
      setError("Some items exceed available stock. Please adjust quantities.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 2. Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockOrderId = `order_${Date.now()}`;
      navigate(`/checkout/${mockOrderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        minWidth: 250,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
        >
          Order & Summary
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Subtotal ({itemCount} items)</Typography>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Box>

        {/* ✅ SHOW DISCOUNT IF APPLIED */}
        {discount > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography color="success.main">Discount</Typography>
            <Typography color="success.main">
              -${discount.toFixed(2)}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Shipping</Typography>
          <Typography>
            {shipping === 0 && !isCartEmpty
              ? "Free"
              : `$${shipping.toFixed(2)}`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Estimated Tax</Typography>
          <Typography>${tax.toFixed(2)}</Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ mt: 1, fontWeight: "bold" }}>Total</Typography>
          <Typography sx={{ mt: 1, fontWeight: "bold" }}>
            ${total.toFixed(2)}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
            {error}
          </Alert>
        )}
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "center", pb: 3, px: 2 }}>
        <Button
          fullWidth
          sx={{
            height: 50,
            borderRadius: 3,
            textTransform: "none",
          }}
          variant="contained"
          endIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <LockIcon />
            )
          }
          disabled={isCartEmpty || loading}
          onClick={handleCheckout}
        >
          {loading
            ? "Processing..."
            : `Proceed to Checkout – $${total.toFixed(2)}`}
        </Button>
      </Box>

      <Divider>We Accept</Divider>

      <Box
        component="img"
        src={Paymenticons}
        alt="Payment Methods"
        sx={{
          width: "90%",
          display: "block",
          mx: "auto",
          py: 1,
        }}
      />
    </Card>
  );
}
