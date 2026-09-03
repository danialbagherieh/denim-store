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
import { useAuthStore } from "./Auth/authStore.ts";
import { authService } from "./Auth/services/auth.service.ts"; // 👈 use the service

// Zod schema
const signinSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SigninForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      // Call the API service
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      // Store token for future API calls
      localStorage.setItem("authToken", response.token);

      // Update Zustand store
      login({ email: response.user.email, name: response.user.name });

      // Redirect to home
      navigate("/");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.",
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
            Sign In
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Display API/root errors */}
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <a href="/forgot-password" style={{ textDecoration: "none" }}>
              Forgot Password?
            </a>
          </Typography>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Don't have an account? <a href="/signup">Sign Up</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
