import { Box, Divider, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import {
  useCartStore,
  type CartItem,
} from "./../../cart/Cartstore/Cartstore.tsx";

type CheckoutItemsProps = {
  cart: CartItem[];
};

export default function CheckoutItems({ cart }: CheckoutItemsProps) {
  // ✅ FIXED: Use the store's action instead of direct setState
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <Box>
      {cart.map((item, index) => (
        <Box key={item.cartItemId}>
          {/* Product */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              py: 1.5,
            }}
          >
            {/* Product image */}
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: {
                  xs: 62,
                  sm: 72,
                },

                height: {
                  xs: 78,
                  sm: 88,
                },

                objectFit: "cover",

                borderRadius: 2,

                bgcolor: "action.hover",

                flexShrink: 0,
              }}
            />

            {/* Product information */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Product name */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  mb: 0.7,

                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Typography>

              {/* Color */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mb: 0.3,
                }}
              >
                Color: {item.color}
              </Typography>

              {/* Size */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  mb: 0.8,
                }}
              >
                Size: {item.size}
              </Typography>

              {/* Quantity */}
              <Box
                sx={{
                  display: "inline-flex",
                  px: 1,
                  py: 0.35,
                  borderRadius: 1,
                  bgcolor: "action.hover",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  Qty: {item.quantity}
                </Typography>
              </Box>
            </Box>

            {/* Product price and remove button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: 70,
              }}
            >
              {/* Product price */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>

              {/* Remove button */}
              <IconButton
                size="small"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeFromCart(item.cartItemId)}
                sx={{
                  mt: 0.5,
                  color: "text.secondary",

                  "&:hover": {
                    color: "error.main",
                  },
                }}
              >
                <CloseOutlinedIcon
                  sx={{
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* Divider between products */}
          {index < cart.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
