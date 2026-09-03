import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import type { ShippingData } from "./Checkoutshiping.tsx";
import type { PaymentData } from "./Checkoutpayment.tsx";

type CheckoutReviewProps = {
  shippingData: ShippingData;
  paymentData: PaymentData;
  onEditShipping: () => void;
  onEditPayment: () => void;
  onEditCart: () => void;
};

export default function CheckoutReview({
  shippingData,
  paymentData,
  onEditShipping,
  onEditPayment,
  onEditCart,
}: CheckoutReviewProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.8 }}>
          Review Your Order
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please check your order details before placing your order.
        </Typography>
      </Box>

      {/* Shipping Address */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          boxSizing: "border-box",
          mb: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <LocationOnOutlinedIcon color="primary" />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, mb: 0.6 }}>
                Shipping To
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {shippingData.firstName} {shippingData.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {shippingData.streetAddress}
              </Typography>
              {shippingData.apartment.trim() !== "" && (
                <Typography variant="body2" color="text.secondary">
                  {shippingData.apartment}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {shippingData.city}, {shippingData.postalCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {shippingData.country}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {shippingData.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {shippingData.phone}
              </Typography>
            </Box>
          </Box>
          <Button
            size="small"
            startIcon={<EditOutlinedIcon />}
            onClick={onEditShipping}
            sx={{ textTransform: "none", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Edit
          </Button>
        </Box>
      </Paper>

      {/* Payment Method */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          boxSizing: "border-box",
          mb: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <CreditCardOutlinedIcon color="primary" />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, mb: 0.6 }}>
                Payment Method
              </Typography>
              {paymentData.paymentMethod === "paypal" ? (
                <>
                  <Typography variant="body2" color="text.secondary">
                    PayPal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You will be redirected to PayPal to complete your payment.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Credit or Debit Card
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {paymentData.cardLast4
                      ? `Card ending in ${paymentData.cardLast4}`
                      : "Card information entered"}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Button
            size="small"
            startIcon={<EditOutlinedIcon />}
            onClick={onEditPayment}
            sx={{ textTransform: "none", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Edit
          </Button>
        </Box>
      </Paper>

      {/* Delivery / Order Details */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          boxSizing: "border-box",
          mb: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <LocalShippingOutlinedIcon color="primary" />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, mb: 0.6 }}>
                Order Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Items in your order
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Standard delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated delivery: 3–5 business days
              </Typography>
            </Box>
          </Box>
          <Button
            size="small"
            startIcon={<EditOutlinedIcon />}
            onClick={onEditCart}
            sx={{ textTransform: "none", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Edit Cart
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ mb: 2 }} />

      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant="body2" color="text.secondary">
            I agree to the Terms and Conditions and Privacy Policy.
          </Typography>
        }
        sx={{ alignItems: "flex-start", m: 0 }}
      />
    </Box>
  );
}
