import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./authStore.ts";

/**
 * ProtectedRoute component – redirects to /signin if user is not authenticated.
 *
 * Use it in your routes like this:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/checkout" element={<Checkout />} />
 * </Route>
 */
export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    // Redirect to signin, but preserve the current location for a potential redirect after login
    return <Navigate to="/signin" replace />;
  }

  // Render child routes (Outlet) if authenticated
  return <Outlet />;
}
