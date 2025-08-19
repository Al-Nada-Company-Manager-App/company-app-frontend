import type { Employee, EmployeeTheme } from "../../../types/Employees/employee";

interface EmployeeRoleProps {
  employee: Employee;
  theme: EmployeeTheme;
}

const EmployeeRole = ({ employee, theme }: EmployeeRoleProps) => {
  const getRoleDescription = (role: string) => {
    const roleDescriptions: Record<string, string> = {
      Manager: "Organization",
      Programmer: "Developer",
      Executive: "Projects",
      Designer: "UI/UX Design",
    };
    return roleDescriptions[role] || "Department";
  };

  return (
    <div>
      <div style={{ color: theme.employee.roleColor }}>{employee.e_role}</div>
      <div
        style={{
          color: theme.employee.roleSubtextColor,
          fontSize: "14px",
        }}
      >
        {getRoleDescription(employee.e_role)}
      </div>
    </div>
  );
};

export default EmployeeRole;
