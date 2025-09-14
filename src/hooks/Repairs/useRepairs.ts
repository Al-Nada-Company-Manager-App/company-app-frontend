import { useMemo } from "react";
import { useGetAllRepairs } from "@src/queries/Repairs/repairQueries";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import { useGetAllDevices } from "@src/queries/Devices/deviceQueries";

export const useRepairs = (isDark: boolean) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const { data: repairs, isLoading, error } = useGetAllRepairs();
  const { data: devices } = useGetAllDevices();

  return {
    theme,
    isLoading,
    error,
    repairs: repairs || [],
    devices: devices || [],
  };
};
