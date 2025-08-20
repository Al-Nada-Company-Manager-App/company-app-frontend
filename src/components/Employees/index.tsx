import { useEmployees } from "../../hooks/Employees/useEmployees";
import EmployeeTable from "./components/EmployeeTable";
import DeactivatedEmployeeTable from "./components/DeactivatedEmployeeTable";
import { useActivateEmployee,useGetAllEmployees } from "../../queries";
import { Loading, ErrorDisplay } from "../UI";
import TableStyle from "../UI/TableStyle";

interface EmployeesProps {
  isDark: boolean;
}


const Employees = ({ isDark }: EmployeesProps) => {
  const { activeEmployees, deactivatedEmployees, theme, isLoading, error } =
    useEmployees(isDark);
  const activateEmployee = useActivateEmployee();
  const getAllEmployees = useGetAllEmployees();

  if (isLoading) {
    return (
      <div className="p-6">
        <div
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <Loading
            size="large"
            message="Loading employees..."
            textStyle={{ color: theme.title.color }}
            containerStyle={{
              background: "transparent",
              minHeight: "400px",
            }}
            isDark={isDark}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <ErrorDisplay
            status="error"
            title="Failed to Load Employees"
            subTitle="There was an error loading the employee data."
            message={error.message}
            onRetry={() => window.location.reload()}
            showRetryButton={true}
            showHomeButton={false}
            isDark={isDark}
            style={{
              background: "transparent",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    );
  }

  const handleActivate = async (employeeId: number) => {
    await activateEmployee.mutateAsync(employeeId);
    await getAllEmployees.refetch();
  };


  return (
    <>
      <TableStyle theme={theme} />
      <div className="p-6">
        <div
          className="w-full rounded-2xl p-6 mb-6"
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
              Activated Employees
            </h2>
          </div>

          <EmployeeTable employees={activeEmployees} theme={theme} />
        </div>
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
              DeActivated Employees
            </h2>
          </div>

          <DeactivatedEmployeeTable
            employees={deactivatedEmployees}
            theme={theme}
            onActivate={handleActivate}
          />
        </div>
      </div>
    </>
  );
};

export default Employees;
