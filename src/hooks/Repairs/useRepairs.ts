import { useMemo } from "react";
import { useGetAllRepairs } from "@src/queries/Repairs/repairQueries";
import type { RepairQueryParams } from "@src/types/Repairs/repair";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import { useGetAllDevices } from "@src/queries/Devices/deviceQueries";

export const useRepairs = (isDark: boolean, params: RepairQueryParams = {}) => {
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);
  const { data, isLoading, error } = useGetAllRepairs(params);
  const { data: devices } = useGetAllDevices();

  return {
    theme,
    isLoading,
    error,
    repairs: data?.data || [],
    total: data?.metadata?.total || 0,
    devices: devices || [],
  };
};
