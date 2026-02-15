import { useAuthContext } from "@src/contexts/auth";
import type { EmployeePermissions } from "@src/types/Employees/employee";

export const usePermission = () => {
  const { user } = useAuthContext();

  const hasPermission = (permission: keyof EmployeePermissions): boolean => {
    if (!user || !user.access_actions) return false;
    // Super admin or specific role handling could go here if needed
    // But for now, we rely on the access_actions table
    return !!user.access_actions[permission];
  };

  const hasAnyPermission = (
    permissions: (keyof EmployeePermissions)[],
  ): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  const hasAllPermissions = (
    permissions: (keyof EmployeePermissions)[],
  ): boolean => {
    return permissions.every((permission) => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: user?.access_actions,
    userRole: user?.e_role,
  };
};
