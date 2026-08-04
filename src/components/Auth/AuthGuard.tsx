import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthContext } from "@src/contexts/auth";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * AuthGuard component - Protects routes that require authentication
 * Redirects to /login if user is not authenticated
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

/**
 * GuestGuard component - For routes that should only be accessible to non-authenticated users
 * Redirects to home if user is already authenticated
 */
export const GuestGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    // Redirect to the page they came from, or home
    const from = (location.state as { from?: Location })?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render children (login page)
  return <>{children}</>;
};
