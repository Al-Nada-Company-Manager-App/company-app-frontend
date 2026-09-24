import { useAuthContext } from "@src/contexts/auth";
import type { EmployeePermissions } from "@src/types/Employees/employee";
import { useCallback } from "react";

export const usePermission = () => {
  const { user } = useAuthContext();

  const hasPermission = useCallback((permission: keyof EmployeePermissions): boolean => {
    if (!user || !user.access_actions) return false;
    return !!user.access_actions[permission];
  }, [user]);

  const hasAnyPermission = useCallback((
    permissions: (keyof EmployeePermissions)[],
  ): boolean => {
    if (!user || !user.access_actions) return false;
    return permissions.some((permission) => !!user.access_actions![permission]);
  }, [user]);

  const hasAllPermissions = useCallback((
    permissions: (keyof EmployeePermissions)[],
  ): boolean => {
    if (!user || !user.access_actions) return false;
    return permissions.every((permission) => !!user.access_actions![permission]);
  }, [user]);

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: user?.access_actions,
    userRole: user?.e_role,
  };
};
