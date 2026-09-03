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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useAuthStore } from "../authStore.ts";

const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms & Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    login({ email: data.email, name: data.fullName });
    navigate("/");
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
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              disabled={isSubmitting}
              required
            />

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

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
              required
            />

            <TextField
              label="Confirm Password"
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

            <FormControlLabel
              control={
                <Checkbox
                  {...register("acceptTerms")}
                  disabled={isSubmitting}
                />
              }
              label="I accept the Terms & Privacy Policy"
              sx={{ mt: 1, mb: 1 }}
            />
            {errors.acceptTerms && (
              <Typography color="error" variant="caption">
                {errors.acceptTerms.message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <a href="/signin">Sign In</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
