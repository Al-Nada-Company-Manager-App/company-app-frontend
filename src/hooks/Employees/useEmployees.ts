import { useMemo } from "react";
import type { Employee, EmployeeTheme } from "../../types/Employees/employee";
import { useGetAllEmployees } from "../../queries/Employees/employeeQueries";

const DUMMY_EMPLOYEES: Employee[] = [
  {
    e_id: 1,
    f_name: "Esthera",
    l_name: "Jackson",
    birth_date: "1990-01-15T00:00:00.000Z",
    salary: 75000,
    e_role: "Manager",
    e_photo: "1.jpg",
    e_address: "123 Main St",
    e_email: "esthera@simmmple.com",
    e_phone: "+1234567890",
    e_city: "New York",
    e_country: "USA",
    e_zipcode: "10001",
    e_username: "esthera",
    e_gender: "female",
    e_active: true,
  },
  {
    e_id: 2,
    f_name: "Alexa",
    l_name: "Liras",
    birth_date: "1985-03-22T00:00:00.000Z",
    salary: 65000,
    e_role: "Programmer",
    e_photo: "2.jpg",
    e_address: "456 Oak Ave",
    e_email: "alexa@simmmple.com",
    e_phone: "+1234567891",
    e_city: "Los Angeles",
    e_country: "USA",
    e_zipcode: "90001",
    e_username: "alexa",
    e_gender: "female",
    e_active: false,
  },
  {
    e_id: 3,
    f_name: "Laurent",
    l_name: "Michael",
    birth_date: "1988-07-10T00:00:00.000Z",
    salary: 85000,
    e_role: "Executive",
    e_photo: "3.jpg",
    e_address: "789 Pine St",
    e_email: "laurent@simmmple.com",
    e_phone: "+1234567892",
    e_city: "Chicago",
    e_country: "USA",
    e_zipcode: "60001",
    e_username: "laurent",
    e_gender: "male",
    e_active: true,
  },
  {
    e_id: 4,
    f_name: "Freduardo",
    l_name: "Hill",
    birth_date: "1992-11-05T00:00:00.000Z",
    salary: 72000,
    e_role: "Manager",
    e_photo: "4.jpg",
    e_address: "321 Elm St",
    e_email: "freduardo@simmmple.com",
    e_phone: "+1234567893",
    e_city: "Miami",
    e_country: "USA",
    e_zipcode: "33001",
    e_username: "freduardo",
    e_gender: "male",
    e_active: true,
  },
  {
    e_id: 5,
    f_name: "Daniel",
    l_name: "Thomas",
    birth_date: "1987-09-18T00:00:00.000Z",
    salary: 68000,
    e_role: "Programmer",
    e_photo: "5.jpg",
    e_address: "654 Maple Ave",
    e_email: "daniel@simmmple.com",
    e_phone: "+1234567894",
    e_city: "Seattle",
    e_country: "USA",
    e_zipcode: "98001",
    e_username: "daniel",
    e_gender: "male",
    e_active: false,
  },
  {
    e_id: 6,
    f_name: "Mark",
    l_name: "Wilson",
    birth_date: "1991-12-25T00:00:00.000Z",
    salary: 70000,
    e_role: "Designer",
    e_photo: "6.jpg",
    e_address: "987 Cedar St",
    e_email: "mark@simmmple.com",
    e_phone: "+1234567895",
    e_city: "Portland",
    e_country: "USA",
    e_zipcode: "97001",
    e_username: "mark",
    e_gender: "male",
    e_active: false,
  },
];

const lightEmployeeTheme: EmployeeTheme = {
  container: {
    background:
      "linear-gradient(126.97deg, rgba(255, 255, 255, 0.9) 28.26%, rgba(240, 240, 240, 0.8) 91.2%)",
    borderRadius: "20px",
    backdropFilter: "blur(60px)",
  },
  title: {
    color: "#2D3748",
  },
  headers: {
    color: "#A0AEC0",
  },
  row: {
    borderColor: "#E2E8F0",
    hoverBackground: "rgba(108, 121, 239, 0.08)",
  },
  employee: {
    nameColor: "#2D3748",
    emailColor: "#A0AEC0",
    roleColor: "#2D3748",
    roleSubtextColor: "#A0AEC0",
    dateColor: "#2D3748",
    editColor: "#A0AEC0",
  },
  avatar: {
    background: "#4FD1C5",
  },
  status: {
    online: {
      background: "#01B574",
      color: "#FFFFFF",
    },
    offline: {
      background: "transparent",
      borderColor: "#A0AEC0",
      color: "#A0AEC0",
    },
  },
};

const darkEmployeeTheme: EmployeeTheme = {
  container: {
    background:
      "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
    borderRadius: "20px",
    backdropFilter: "blur(60px)",
  },
  title: {
    color: "#FFFFFF",
  },
  headers: {
    color: "#A0AEC0",
  },
  row: {
    borderColor: "#56577A",
    hoverBackground: "rgba(255, 255, 255, 0.05)",
  },
  employee: {
    nameColor: "#FFFFFF",
    emailColor: "#A0AEC0",
    roleColor: "#FFFFFF",
    roleSubtextColor: "#A0AEC0",
    dateColor: "#FFFFFF",
    editColor: "#A0AEC0",
  },
  avatar: {
    background: "#4FD1C5",
  },
  status: {
    online: {
      background: "#01B574",
      color: "#FFFFFF",
    },
    offline: {
      background: "transparent",
      borderColor: "#FFFFFF",
      color: "#FFFFFF",
    },
  },
};

export const useEmployees = (isDark: boolean) => {
  const theme = useMemo(
    () => (isDark ? darkEmployeeTheme : lightEmployeeTheme),
    [isDark]
  );

  // Use React Query to fetch employees data
  const {
    data: employees = DUMMY_EMPLOYEES,
    isLoading,
    error,
  } = useGetAllEmployees();


  const activeEmployees = useMemo(
    () => employees.filter((employee) => employee.e_active),
    [employees]
  );

  const deactivatedEmployees = useMemo(
    () => employees.filter((employee) => !employee.e_active),
    [employees]
  );

  return {
    employees,
    activeEmployees,
    deactivatedEmployees,
    theme,
    isLoading,
    error,
  };
};
