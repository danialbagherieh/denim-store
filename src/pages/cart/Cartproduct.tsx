import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

import NumberSpinner from "../../components/NumberSpinner";
import { useCartStore, type CartItem } from "./Cartstore/Cartstore";

type CartProductProps = {
  item: CartItem;
};

export default function CartProduct({ item }: CartProductProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        borderRadius: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 250,
          width: 200,
          p: 2,
          borderRadius: 3,
        }}
        image={item.image}
        alt={item.name}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">{item.name}</Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mt: 3,
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Color: {item.color}
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Size: {item.size}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <NumberSpinner
                  value={item.quantity}
                  min={1}
                  max={item.stock}
                  onValueChange={(value) => {
                    updateQuantity(item.cartItemId, value ?? 1);
                  }}
                  size="small"
                />
              </Box>
            </Box>

            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => removeFromCart(item.cartItemId)}
              sx={{ alignSelf: "center" }}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
