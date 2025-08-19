import { useEmployees } from "../../hooks/Employees/useEmployees";
import EmployeeTable from "./components/EmployeeTable";

interface EmployeesProps {
  isDark: boolean;
}

const Employees = ({ isDark }: EmployeesProps) => {
  const { employees, theme } = useEmployees(isDark);

  const handleEdit = (employeeId: number) => {
    console.log("Edit employee:", employeeId);
    // Handle edit logic here
  };

  return (
    <div className="ml-[298px] mt-[101px] mr-6 mb-6">
      <div
        className="w-full rounded-2xl p-6"
        style={{
          background: theme.container.background,
          backdropFilter: theme.container.backdropFilter,
          minHeight: "auto",
        }}
      >
        {/* Title */}
        <div className="mb-6">
          <h2
            className="text-lg font-bold"
            style={{ color: theme.title.color }}
          >
            Employees Table
          </h2>
        </div>

        <EmployeeTable
          employees={employees}
          theme={theme}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Employees;
