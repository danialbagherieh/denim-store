import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

const promoSchema = z.object({
  promoCode: z.string().min(1, "Please enter a promo code."),
});

type PromoFormValues = z.infer<typeof promoSchema>;

type PromoCodeProps = {
  onDiscountChange?: (discount: number) => void;
};

export default function PromoCode({ onDiscountChange }: PromoCodeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromoFormValues>({
    resolver: zodResolver(promoSchema),
    defaultValues: { promoCode: "" },
  });

  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = (data: PromoFormValues) => {
    const cleanedCode = data.promoCode.trim().toUpperCase();
    const promoCodes: Record<string, number> = { SAVE20: 20, SAVE10: 10 };
    const discount = promoCodes[cleanedCode];

    if (discount === undefined) {
      setResult({ type: "error", message: "Invalid promo code." });
      onDiscountChange?.(0);
      return;
    }

    setResult({
      type: "success",
      message: `Promo code "${cleanedCode}" applied. You saved $${discount.toFixed(2)}.`,
    });
    onDiscountChange?.(discount);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2 }}>
        <LocalOfferOutlinedIcon
          sx={{ fontSize: 19, color: "text.secondary" }}
        />
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          Have a promo code?
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Enter promo code"
          {...register("promoCode")}
          error={!!errors.promoCode}
          helperText={errors.promoCode?.message}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{
            minWidth: 76,
            height: 40,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          Apply
        </Button>
      </Box>

      {result && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            color: result.type === "success" ? "success.main" : "error.main",
          }}
        >
          {result.message}
        </Typography>
      )}
    </Box>
  );
}
