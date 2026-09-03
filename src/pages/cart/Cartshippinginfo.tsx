import { Box, Card, CardContent, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useCartStore } from "./Cartstore/Cartstore";

export default function CartShippingInfo() {
  const cart = useCartStore((state) => state.cart);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = cart.length === 0 ? 0 : subtotal >= 100 ? 0 : 10;

  const now = new Date();

  const minDelivery = new Date(now);
  minDelivery.setDate(now.getDate() + 3);

  const maxDelivery = new Date(now);
  maxDelivery.setDate(now.getDate() + 6);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

  const deliveryText =
    cart.length > 0
      ? `${formatDate(minDelivery)} - ${formatDate(maxDelivery)}`
      : "Add items to see delivery estimate";

  const shippingText =
    cart.length === 0
      ? "Add items to see shipping information"
      : shipping === 0
        ? "Free standard shipping"
        : "Standard shipping is $10";

  return (
    <Card
      sx={{
        mt: 2,
        width: "100%",
        display: "flex",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <LocalShippingIcon
          sx={{
            fontSize: 32,
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
            }}
          >
            Estimated Delivery
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: cart.length === 0 ? "text.secondary" : "success.main",
              mb: 1,
            }}
          >
            {deliveryText}
          </Typography>

          <Typography>{shippingText}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
