import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";
interface EmployeeAvatarProps {
  employee: Employee;
  theme: Theme;
}

const EmployeeAvatar = ({ employee, theme }: EmployeeAvatarProps) => {
  return (
    <div
      className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
      style={{
        background: employee.e_photo ? "transparent" : theme.avatar.background,
        boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      }}
    >
      {employee.e_photo ? (
        <img
          src={employee.e_photo ? `/Images/employees/${employee.e_photo}` : "/Images/employees/placeholder.jpg"}
          alt={`${employee.f_name} ${employee.l_name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.parentElement!.style.background = theme.avatar.background;
          }}
        />
      ) : null}
    </div>
  );
};

export default EmployeeAvatar;
