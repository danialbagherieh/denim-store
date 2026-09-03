import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Radio from "@mui/material/Radio";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormWatch,
} from "react-hook-form";
import type { CheckoutFormValues } from "../Stepper.tsx";

export type PaymentMethod = "card" | "paypal";
export type PaymentData = {
  paymentMethod: PaymentMethod;
  cardLast4: string;
};

type CheckoutPaymentProps = {
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  watch: UseFormWatch<CheckoutFormValues>;
};

export default function CheckoutPayment({
  control,
  errors,
  watch,
}: CheckoutPaymentProps) {
  const paymentMethod = watch("paymentMethod") as PaymentMethod;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.8 }}>
          Payment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose your preferred payment method. Your payment information is
          securely encrypted.
        </Typography>
      </Box>

      {/* Credit Card */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          mb: 2.5,
          overflow: "hidden",
          borderRadius: 3,
          border: "2px solid",
          borderColor: paymentMethod === "card" ? "primary.main" : "divider",
          bgcolor:
            paymentMethod === "card" ? "action.hover" : "background.paper",
          cursor: "pointer",
          transition: "0.2s ease",
          "&:hover": { borderColor: "primary.main" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            p: { xs: 2, sm: 2.5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Radio
                  checked={field.value === "card"}
                  value="card"
                  onChange={() => field.onChange("card")}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 46,
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <CreditCardIcon />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                Credit or Debit Card
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pay securely using your card
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.4, sm: 0.8 },
              flexShrink: 0,
            }}
          >
            <Chip
              label="VISA"
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.6rem", sm: "0.75rem" },
                height: { xs: 22, sm: 26 },
              }}
            />
            <Chip
              label="MC"
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.6rem", sm: "0.75rem" },
                height: { xs: 22, sm: 26 },
              }}
            />
            <Chip
              label="AMEX"
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.6rem", sm: "0.75rem" },
                height: { xs: 22, sm: 26 },
              }}
            />
          </Box>
        </Box>

        {paymentMethod === "card" && (
          <>
            <Divider />
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{ p: { xs: 2, sm: 3 }, bgcolor: "background.paper" }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                Card Details
              </Typography>

              <Controller
                name="cardholderName"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    required
                    label="Cardholder Name"
                    placeholder="Name shown on the card"
                    autoComplete="cc-name"
                    {...field}
                    value={field.value || ""}
                    error={!!errors.cardholderName}
                    helperText={errors.cardholderName?.message}
                    sx={{ mb: 2.5 }}
                  />
                )}
              />

              <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => {
                  const handleChange = (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.slice(0, 16);
                    const formatted = value.match(/.{1,4}/g)?.join(" ") ?? "";
                    field.onChange(formatted);
                  };
                  return (
                    <TextField
                      fullWidth
                      required
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      autoComplete="cc-number"
                      value={field.value || ""}
                      onChange={handleChange}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber?.message}
                      slotProps={{
                        htmlInput: { inputMode: "numeric", maxLength: 19 },
                      }}
                      sx={{ mb: 2.5 }}
                    />
                  );
                }}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => {
                    const handleChange = (
                      e: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      let value = e.target.value.replace(/\D/g, "");
                      value = value.slice(0, 4);
                      let formatted = value;
                      if (value.length > 2) {
                        formatted = `${value.slice(0, 2)} / ${value.slice(2)}`;
                      }
                      field.onChange(formatted);
                    };
                    return (
                      <TextField
                        fullWidth
                        required
                        label="Expiry Date"
                        placeholder="MM / YY"
                        autoComplete="cc-exp"
                        value={field.value || ""}
                        onChange={handleChange}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate?.message}
                      />
                    );
                  }}
                />

                <Controller
                  name="cvv"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      required
                      label="CVV"
                      placeholder="123"
                      autoComplete="cc-csc"
                      type="password"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        field.onChange(val);
                      }}
                      error={!!errors.cvv}
                      helperText={errors.cvv?.message}
                      slotProps={{
                        htmlInput: { inputMode: "numeric", maxLength: 4 },
                      }}
                    />
                  )}
                />
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2.5 }}
              >
                <SecurityIcon color="success" fontSize="small" />
                <Typography variant="caption" color="text.secondary">
                  Your card details are encrypted and securely processed.
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Paper>

      {/* PayPal */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          mb: 3,
          borderRadius: 3,
          border: "2px solid",
          borderColor: paymentMethod === "paypal" ? "primary.main" : "divider",
          bgcolor:
            paymentMethod === "paypal" ? "action.hover" : "background.paper",
          cursor: "pointer",
          transition: "0.2s ease",
          "&:hover": { borderColor: "primary.main" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            p: { xs: 2, sm: 2.5 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Radio
                  checked={field.value === "paypal"}
                  value="paypal"
                  onChange={() => field.onChange("paypal")}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 46,
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "action.selected",
              }}
            >
              <AccountBalanceWalletIcon color="primary" />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                PayPal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You will be redirected to PayPal to complete your payment.
              </Typography>
            </Box>
          </Box>
          <Chip
            label="PayPal"
            size="small"
            variant="outlined"
            sx={{ display: { xs: "none", sm: "flex" }, fontWeight: 700 }}
          />
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          p: 2,
          borderRadius: 2.5,
          bgcolor: "action.hover",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <LockIcon color="success" sx={{ mt: 0.2 }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.3 }}>
            Secure Payment
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Your payment information is protected using secure encryption. We do
            not store your complete card details.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
