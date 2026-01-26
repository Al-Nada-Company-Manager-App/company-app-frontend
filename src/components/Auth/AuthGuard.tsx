import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useGetSession } from "@src/queries/Auth";
import { Loading } from "@src/components/UI";

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * AuthGuard component - Protects routes that require authentication
 * Redirects to /login if user is not authenticated
 */
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const { data: session, isLoading } = useGetSession();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session?.success || !session?.user) {
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
  const { data: session, isLoading } = useGetSession();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Redirect to home if already authenticated
  if (session?.success && session?.user) {
    // Redirect to the page they came from, or home
    const from = (location.state as { from?: Location })?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render children (login page)
  return <>{children}</>;
};
