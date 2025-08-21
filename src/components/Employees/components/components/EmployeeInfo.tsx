import type { Employee } from "@src/types/Employees/employee";
import EmployeeAvatar from "./EmployeeAvatar";
import type { Theme } from "@src/types/theme";

interface EmployeeInfoProps {
  employee: Employee;
  theme: Theme;
}

const EmployeeInfo = ({ employee, theme }: EmployeeInfoProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <EmployeeAvatar employee={employee} theme={theme} />
      </div>
      <div>
        <div style={{ color: theme.employee.nameColor }}>
          {employee.f_name} {employee.l_name}
        </div>
        <div
          style={{
            color: theme.employee.emailColor,
            fontSize: "14px",
          }}
        >
          {employee.e_email || "No email"}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
