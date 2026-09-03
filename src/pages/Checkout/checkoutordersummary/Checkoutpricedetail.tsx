import { Box, Divider, Typography } from "@mui/material";

type PriceDetailsProps = {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

type PriceRowProps = {
  label: string;
  value: string;
  valueColor?: string;
};

export default function PriceDetails({
  itemCount,
  subtotal,
  discount,
  shipping,
  total,
}: PriceDetailsProps) {
  return (
    <Box>
      {/* Subtotal */}
      <PriceRow
        label={`Subtotal (${itemCount} items)`}
        value={`$${subtotal.toFixed(2)}`}
      />

      {/* Discount */}
      <PriceRow
        label="Discount"
        value={discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
        valueColor={discount > 0 ? "success.main" : undefined}
      />

      {/* Shipping */}
      <PriceRow
        label="Shipping"
        value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
      />

      <Divider
        sx={{
          my: 2,
        }}
      />

      {/* Total */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.05rem",
          }}
        >
          Total
        </Typography>

        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.25rem",
          }}
        >
          ${total.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

function PriceRow({ label, value, valueColor }: PriceRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 1.2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: valueColor,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
