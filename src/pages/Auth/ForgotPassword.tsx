import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { authService } from "./services/auth.service.ts";

// Zod schema
const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      await authService.forgotPassword(data.email);
      alert("Reset link sent! Check your email.");
      navigate("/signin");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Failed to send reset link.",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Forgot Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 2 }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <Typography color="error" align="center" sx={{ mb: 1 }}>
                {errors.root.message}
              </Typography>
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <a href="/reset-password" style={{ textDecoration: "none" }}>
              Simulate email link → Go to Reset Password
            </a>
          </Typography>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <a href="/signin" style={{ textDecoration: "none" }}>
              Back to Sign In
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
