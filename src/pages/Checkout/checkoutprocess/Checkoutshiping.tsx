import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FormControl } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { CheckoutFormValues } from "../Stepper.tsx";

export type ShippingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
};

type CheckoutShippingProps = {
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
};

export default function CheckoutShipping({
  control,
  errors,
}: CheckoutShippingProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.8 }}>
          Shipping Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the shipping information for your order.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-first-name">First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-first-name"
                  placeholder="Enter your first name"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.firstName && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.firstName.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-last-name">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-last-name"
                  placeholder="Enter your last name"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.lastName && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.lastName.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={12}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-email">Email Address</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-email"
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.email && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={12}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-phone">Phone Number</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-phone"
                  type="tel"
                  placeholder="+49 123 456 789"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.phone && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.phone.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={12}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-street">Street Address</Label>
            <Controller
              name="streetAddress"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-street"
                  placeholder="Street name and house number"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.streetAddress && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.streetAddress.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl style={{ width: "100%" }}>
            <Label htmlFor="shipping-apartment">Apartment / Unit</Label>
            <Controller
              name="apartment"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-apartment"
                  placeholder="Apartment, suite, unit (optional)"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-city">City</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-city"
                  placeholder="Enter your city"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.city && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.city.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-postal-code">Postal Code</Label>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-postal-code"
                  placeholder="Enter postal code"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.postalCode && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.postalCode.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl required style={{ width: "100%" }}>
            <Label htmlFor="shipping-country">Country</Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <StyledInput
                  id="shipping-country"
                  placeholder="Enter your country"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.country && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.country.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `
    width: 100%;
    .${inputClasses.input} {
      width: 100%;
      box-sizing: border-box;
      font-family: "IBM Plex Sans", sans-serif;
      font-size: 0.95rem;
      line-height: 1.5;
      padding: 11px 13px;
      border-radius: 8px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      &:hover { border-color: ${blue[400]}; }
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
      }
    }
  `,
);

const Label = styled("label")`
  display: block;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const blue = { 200: "#b6daff", 400: "#3399FF", 600: "#0072E5" };
const grey = { 200: "#DAE2ED", 300: "#C7D0DD", 700: "#434D5B", 900: "#1C2025" };
