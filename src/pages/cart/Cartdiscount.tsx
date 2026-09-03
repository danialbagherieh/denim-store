import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

type CartdiscountProps = {
  onDiscountChange?: (discount: number) => void;
};

export default function Cartdiscount({ onDiscountChange }: CartdiscountProps) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleApply = () => {
    const cleanedCode = code.trim().toUpperCase();

    if (!cleanedCode) {
      setMessage({ type: "error", text: "Please enter a discount code." });
      onDiscountChange?.(0);
      return;
    }

    // ✅ Valid discount codes
    const validCodes: Record<string, number> = {
      SAVE10: 10,
      SAVE20: 20,
      WELCOME: 5,
    };

    const discountAmount = validCodes[cleanedCode];

    if (!discountAmount) {
      setMessage({
        type: "error",
        text: `"${cleanedCode}" is not a valid discount code.`,
      });
      onDiscountChange?.(0);
      return;
    }

    // ✅ SUCCESS – apply the discount
    setMessage({
      type: "success",
      text: `✅ "${cleanedCode}" applied! You saved $${discountAmount.toFixed(
        2,
      )}.`,
    });
    onDiscountChange?.(discountAmount);
  };

  return (
    <Card sx={{ mt: 2, width: "100%", display: "flex", borderRadius: 3 }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Discount code
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setMessage(null); // Clear message when user types
              }}
              label="Enter code"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="e.g., Solo300"
            />

            <Button
              variant="contained"
              onClick={handleApply}
              sx={{
                minWidth: 80,
                bgcolor: "grey.300",
                color: "black",
                boxShadow: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "grey.400",
                  boxShadow: "none",
                },
              }}
            >
              Apply
            </Button>
          </Box>

          {message && (
            <Alert
              severity={message.type}
              sx={{ mt: 2 }}
              onClose={() => setMessage(null)}
            >
              {message.text}
            </Alert>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
