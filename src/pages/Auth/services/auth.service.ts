// src/services/auth.service.ts
// import { apiRequest } from "./api"; // commented out until real backend is used

type LoginCredentials = {
  email: string;
  password: string;
};

type SignupData = {
  email: string;
  password: string;
  name: string;
};

type AuthResponse = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
};

export const authService = {
  /**
   * Log in a user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // 🟢 Use this when you have a real backend:
    // return apiRequest<AuthResponse>({
    //   endpoint: "/auth/login",
    //   method: "POST",
    //   body: credentials,
    // });

    // 🔴 Mock for development (remove later)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      user: {
        id: "1",
        email: credentials.email,
        name: credentials.email.split("@")[0],
      },
      token: "mock-jwt-token",
    };
  },

  /**
   * Register a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    // 🟢 Real backend:
    // return apiRequest<AuthResponse>({
    //   endpoint: "/auth/register",
    //   method: "POST",
    //   body: data,
    // });

    // 🔴 Mock
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      user: {
        id: "1",
        email: data.email,
        name: data.name,
      },
      token: "mock-jwt-token",
    };
  },

  /**
   * Send a password reset link
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async forgotPassword(_email: string): Promise<{ message: string }> {
    // 🔴 Mock – underscore tells ESLint "intentionally unused"
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { message: "Reset link sent" };
  },

  /**
   * Reset password with a token
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resetPassword(_token: string, _newPassword: string): Promise<{ message: string }> {
    // 🔴 Mock – underscore tells ESLint "intentionally unused"
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { message: "Password reset successfully" };
  },

  /**
   * Log out (client‑side cleanup)
   */
  logout(): void {
    localStorage.removeItem("authToken");
  },
};