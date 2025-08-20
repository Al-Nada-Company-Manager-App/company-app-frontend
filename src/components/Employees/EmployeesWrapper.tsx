import React from "react";
import { useThemeContext } from "../../contexts/useThemeContext";
import EmployeesComponent from "./index";

const EmployeesWrapper: React.FC = () => {
  const { isDark } = useThemeContext();

  console.log("EmployeesWrapper rendering with isDark:", isDark);

  return <EmployeesComponent isDark={isDark} />;
};

export default EmployeesWrapper;
