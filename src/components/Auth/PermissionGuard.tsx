import type { ReactNode } from "react";
import { usePermission } from "@src/hooks/usePermission";
import type { EmployeePermissions } from "@src/types/Employees/employee";

interface PermissionGuardProps {
  children: ReactNode;
  requiredPermission?: keyof EmployeePermissions;
  requiredPermissions?: (keyof EmployeePermissions)[];
  fallback?: ReactNode;
  // If true, requires ALL permissions in requiredPermissions array. Default is false (ANY).
  requireAll?: boolean;
}

export const PermissionGuard = ({
  children,
  requiredPermission,
  requiredPermissions,
  fallback = null,
  requireAll = false,
}: PermissionGuardProps) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } =
    usePermission();

  if (requiredPermission) {
    if (hasPermission(requiredPermission)) {
      return <>{children}</>;
    }
    return <>{fallback}</>;
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const isAuthorized = requireAll
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);

    if (isAuthorized) {
      return <>{children}</>;
    }
    return <>{fallback}</>;
  }

  // If no permissions are specified, render children (open access)
  return <>{children}</>;
};
