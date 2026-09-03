import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CheckoutShipping from "./checkoutprocess/Checkoutshiping.tsx";
import CheckoutPayment from "./checkoutprocess/Checkoutpayment.tsx";
import CheckoutReview from "./checkoutprocess/Checkoutreview.tsx";

import type { ShippingData } from "./checkoutprocess/Checkoutshiping.tsx";
import type { PaymentData } from "./checkoutprocess/Checkoutpayment.tsx";

const STORAGE_KEY = "checkout-form-data";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  paymentMethod: z.enum(["card", "paypal"]),
  cardholderName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function VerticalLinearStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const [shippingData, setShippingData] = React.useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentData, setPaymentData] = React.useState<PaymentData>({
    paymentMethod: "card",
    cardLast4: "",
  });

  const {
    control,
    watch,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      apartment: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "card",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    mode: "onChange",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  // ---- PERSISTENCE ----
  // Save form values and active step to localStorage on change
  React.useEffect(() => {
    const dataToStore = {
      formValues,
      activeStep,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formValues, activeStep]);

  // Restore saved state on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const { formValues: savedValues, activeStep: savedStep } = parsed;
        // Reset the form with saved values
        reset(savedValues);
        setActiveStep(savedStep);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // If parsing fails, ignore and start fresh
        console.warn("Failed to restore checkout form data");
      }
    }
  }, [reset]);

  // Clear stored data when order is confirmed (optional)
  const clearStoredData = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  // ---- END PERSISTENCE ----

  // Sync shipping data to parent state
  React.useEffect(() => {
    setShippingData({
      firstName: formValues.firstName || "",
      lastName: formValues.lastName || "",
      email: formValues.email || "",
      phone: formValues.phone || "",
      streetAddress: formValues.streetAddress || "",
      apartment: formValues.apartment || "",
      city: formValues.city || "",
      postalCode: formValues.postalCode || "",
      country: formValues.country || "",
    });
  }, [
    formValues.firstName,
    formValues.lastName,
    formValues.email,
    formValues.phone,
    formValues.streetAddress,
    formValues.apartment,
    formValues.city,
    formValues.postalCode,
    formValues.country,
  ]);

  // Sync payment data to parent state
  React.useEffect(() => {
    const method = formValues.paymentMethod || "card";
    const cardNumber = formValues.cardNumber || "";
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);

    setPaymentData({
      paymentMethod: method,
      cardLast4: method === "card" ? last4 : "",
    });
  }, [formValues.paymentMethod, formValues.cardNumber]);

  // Validation helpers
  const isShippingComplete = (): boolean => {
    const requiredFields: Array<keyof CheckoutFormValues> = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "streetAddress",
      "city",
      "postalCode",
      "country",
    ];
    const values = getValues();
    return requiredFields.every((field) => {
      const value = values[field];
      const error = errors[field];
      return !!value && value.trim() !== "" && !error;
    });
  };

  const isPaymentComplete = (): boolean => {
    const method = getValues("paymentMethod");
    if (method === "paypal") return true;
    if (method === "card") {
      const cardNumber = getValues("cardNumber");
      const expiry = getValues("expiryDate");
      const cvv = getValues("cvv");
      const name = getValues("cardholderName");
      return (
        !!name &&
        name.trim() !== "" &&
        !!cardNumber &&
        cardNumber.replace(/\s/g, "").length === 16 &&
        !!expiry &&
        expiry.replace(/\D/g, "").length === 4 &&
        !!cvv &&
        cvv.length >= 3 &&
        !errors.cardholderName &&
        !errors.cardNumber &&
        !errors.expiryDate &&
        !errors.cvv
      );
    }
    return false;
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!isShippingComplete()) {
        await trigger([
          "firstName",
          "lastName",
          "email",
          "phone",
          "streetAddress",
          "city",
          "postalCode",
          "country",
        ]);
        return;
      }
    } else if (activeStep === 1) {
      if (!isPaymentComplete()) {
        await trigger([
          "paymentMethod",
          "cardholderName",
          "cardNumber",
          "expiryDate",
          "cvv",
        ]);
        return;
      }
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
    // Reset form to empty
    reset({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      apartment: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "card",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setShippingData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      streetAddress: "",
      apartment: "",
      city: "",
      postalCode: "",
      country: "",
    });
    setPaymentData({ paymentMethod: "card", cardLast4: "" });
    clearStoredData(); // clear persisted state
  };

  // Edit callbacks for the review page
  const goToShipping = () => setActiveStep(0);
  const goToPayment = () => setActiveStep(1);
  const goToCart = () => navigate("/cart");

  const steps = [
    {
      label: "Shipping Information",
      content: <CheckoutShipping control={control} errors={errors} />,
    },
    {
      label: "Payment",
      content: (
        <CheckoutPayment control={control} errors={errors} watch={watch} />
      ),
    },
    {
      label: "Review Order",
      content: (
        <CheckoutReview
          shippingData={shippingData}
          paymentData={paymentData}
          onEditShipping={goToShipping}
          onEditPayment={goToPayment}
          onEditCart={goToCart}
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1400 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          width: "100%",
          "& .MuiStepContent-root": {
            pr: 0,
            width: "calc(100% - 40px)",
            maxWidth: "none",
          },
          "& .MuiStepLabel-label": {
            fontSize: "1.1rem",
            fontWeight: 600,
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  p: { xs: 2, sm: 2, md: 2 },
                  mt: 1,
                  mb: 1,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                {step.content}
              </Paper>
              <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    minWidth: 180,
                    height: 46,
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  {index === steps.length - 1 ? "Place Order" : "Continue"}
                </Button>
                {index > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                      minWidth: 110,
                      height: 46,
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                  >
                    Back
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            boxSizing: "border-box",
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              bgcolor: "background.paper",
              color: "primary.main",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 42 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Order Confirmed!
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 500, mx: "auto", mb: 1 }}
          >
            Thank you for your purchase. Your order has been placed
            successfully.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            We will send a confirmation email with your order details.
          </Typography>
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{
              minWidth: 180,
              height: 46,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      )}
    </Box>
  );
}
