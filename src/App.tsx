import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.tsx";
import Home from "./pages/Home";
import Cart from "./pages/Cart.tsx";
import Shop from "./pages/Shop.tsx";
import Checkout from "./pages/Checkout.tsx";

import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ProtectedRoute from "./pages/Auth/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx"; // 👈 import

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          {/* Add other protected routes here */}
        </Route>

        {/* 👇 Catch‑all 404 route – must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
