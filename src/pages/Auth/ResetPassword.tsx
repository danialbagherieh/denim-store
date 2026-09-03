import { useNavigate, useSearchParams } from "react-router-dom";
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
const resetSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || ""; // Get token from URL if present

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormValues) => {
    try {
      await authService.resetPassword(token, data.newPassword);
      alert("Password reset successfully! Please sign in.");
      navigate("/signin");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Failed to reset password.",
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
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 2 }}
          >
            Enter your new password below.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && (
              <Typography color="error" align="center" sx={{ mb: 1 }}>
                {errors.root.message}
              </Typography>
            )}

            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              disabled={isSubmitting}
              required
            />

            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
              {isSubmitting ? "Resetting password..." : "Reset Password"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <a href="/signin" style={{ textDecoration: "none" }}>
              Back to Sign In
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
