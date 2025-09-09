import { useEmployees } from "@src/hooks/Employees/useEmployees";
import EmployeeTable from "./components/EmployeeTable";
import DeactivatedEmployeeTable from "./components/DeactivatedEmployeeTable";
import { useActivateEmployee } from "@src/queries";
import { Loading, ErrorDisplay } from "@src/components/UI";

interface EmployeesProps {
  isDark: boolean;
}

const Employees = ({ isDark }: EmployeesProps) => {
  const { activeEmployees, deactivatedEmployees, theme, isLoading, error } =
    useEmployees(isDark);
  const activateEmployee = useActivateEmployee(isDark);

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
  };

  return (
    <>
      <div className="p-6">
        <div
          className="w-full rounded-2xl p-6 mb-6"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "auto",
          }}
        >
          {/* Title and Add Button Row */}
          <div className="mb-6 flex items-center justify-between">
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

// <Button
//   type="primary"
//   className="ml-4 font-semibold border-none"
//   style={{
//     background: theme.button?.background || "#6C79F7",
//     color: theme.button?.color || "#fff",
//     boxShadow: theme.button?.boxShadow,
//     borderRadius: theme.button?.borderRadius,
//     fontWeight: theme.button?.fontWeight,
//     fontSize: theme.button?.fontSize,
//     padding: theme.button?.padding,
//     transition: theme.button?.transition,
//     border: theme.button?.border,
//   }}
//   onMouseOver={(e) => {
//     if (theme.button) {
//       e.currentTarget.style.background =
//         theme.button.hoverBackground || "#5A67D8";
//       e.currentTarget.style.color =
//         theme.button.hoverColor || "#fff";
//     }
//   }}
//   onMouseOut={(e) => {
//     if (theme.button) {
//       e.currentTarget.style.background =
//         theme.button.background || "#6C79F7";
//       e.currentTarget.style.color = theme.button.color || "#fff";
//     }
//   }}
// >
//   Add New Employee
// </Button>
