import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthContext } from "@src/contexts/auth";


interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Authentication is decided only after the server session check completes.
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

/**
 * Prevents authenticated users from opening the login route.
 */
export const GuestGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render children (login page)
  return <>{children}</>;
};
