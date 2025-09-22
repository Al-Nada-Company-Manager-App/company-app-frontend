import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./dashboardApi";


export const dashboardKeys = {
  all: ["dashboard"] as const,
  customerProducts: () => [...dashboardKeys.all, "customerProducts"] as const,
  debtsOverview: () => [...dashboardKeys.all, "debtsOverview"] as const,
  purchasesOverview: () => [...dashboardKeys.all, "purchasesOverview"] as const,
  repairsOverTime: () => [...dashboardKeys.all, "repairsOverTime"] as const,
  repairStatus: () => [...dashboardKeys.all, "repairStatus"] as const,
  salesOverview: () => [...dashboardKeys.all, "salesOverview"] as const,
  sparePartsUsed: () => [...dashboardKeys.all, "sparePartsUsed"] as const,
  lowStockAlerts: () => [...dashboardKeys.all, "lowStockAlerts"] as const,
  stockSummary: () => [...dashboardKeys.all, "stockSummary"] as const,
  supplierProducts: () => [...dashboardKeys.all, "supplierProducts"] as const,
  topProducts: () => [...dashboardKeys.all, "topProducts"] as const,
  totalStock: () => [...dashboardKeys.all, "totalStock"] as const,
  totalPurchase: () => [...dashboardKeys.all, "totalPurchase"] as const,
  totalSales: () => [...dashboardKeys.all, "totalSales"] as const,
  totalDebts: () => [...dashboardKeys.all, "totalDebts"] as const,
  totalRepairs: () => [...dashboardKeys.all, "totalRepairs"] as const,
  totalDUM: () => [...dashboardKeys.all, "totalDUM"] as const,
  totalSpareParts: () => [...dashboardKeys.all, "totalSpareParts"] as const,
  totalPending: () => [...dashboardKeys.all, "totalPending"] as const,
  customersCount: () => [...dashboardKeys.all, "customersCount"] as const,
  suppliersCount: () => [...dashboardKeys.all, "suppliersCount"] as const,
  topCustomers: () => [...dashboardKeys.all, "topCustomers"] as const,
  productsCount: () => [...dashboardKeys.all, "productsCount"] as const,
  topRepairedProducts: () => [...dashboardKeys.all, "topRepairedProducts"] as const,
  customerSales: () => [...dashboardKeys.all, "customerSales"] as const,
  customerMarkets: () => [...dashboardKeys.all, "customerMarkets"] as const,
};

export const useCustomerProducts = () =>
  useQuery({
    queryKey: dashboardKeys.customerProducts(),
    queryFn: dashboardApi.getCustomerProducts,
  });

export const useDebtsOverview = () =>
  useQuery({
    queryKey: dashboardKeys.debtsOverview(),
    queryFn: dashboardApi.getDebtsOverview,
  });

export const usePurchasesOverview = () =>
  useQuery({
    queryKey: dashboardKeys.purchasesOverview(),
    queryFn: dashboardApi.getPurchasesOverview,
  });

export const useRepairsOverTime = () =>
  useQuery({
    queryKey: dashboardKeys.repairsOverTime(),
    queryFn: dashboardApi.getRepairsOverTime,
  });

export const useRepairStatus = () =>
  useQuery({
    queryKey: dashboardKeys.repairStatus(),
    queryFn: dashboardApi.getRepairStatus,
  });

export const useSalesOverview = () =>
  useQuery({
    queryKey: dashboardKeys.salesOverview(),
    queryFn: dashboardApi.getSalesOverview,
  });

export const useSparePartsUsed = () =>
  useQuery({
    queryKey: dashboardKeys.sparePartsUsed(),
    queryFn: dashboardApi.getSparePartsUsed,
  });

export const useLowStockAlerts = () =>
  useQuery({
    queryKey: dashboardKeys.lowStockAlerts(),
    queryFn: dashboardApi.getLowStockAlerts,
  });

export const useStockSummary = () =>
  useQuery({
    queryKey: dashboardKeys.stockSummary(),
    queryFn: dashboardApi.getStockSummary,
  });

export const useSupplierProducts = () =>
  useQuery({
    queryKey: dashboardKeys.supplierProducts(),
    queryFn: dashboardApi.getSupplierProducts,
  });

export const useTopProducts = () =>
  useQuery({
    queryKey: dashboardKeys.topProducts(),
    queryFn: dashboardApi.getTopProducts,
  });

export const useTotalStock = () =>
  useQuery({
    queryKey: dashboardKeys.totalStock(),
    queryFn: dashboardApi.getTotalStock,
  });

export const useTotalPurchase = () =>
  useQuery({
    queryKey: dashboardKeys.totalPurchase(),
    queryFn: dashboardApi.getTotalPurchase,
  });

export const useTotalSales = () =>
  useQuery({
    queryKey: dashboardKeys.totalSales(),
    queryFn: dashboardApi.getTotalSales,
  });

export const useTotalDebts = () =>
  useQuery({
    queryKey: dashboardKeys.totalDebts(),
    queryFn: dashboardApi.getTotalDebts,
  });

export const useTotalRepairs = () =>
  useQuery({
    queryKey: dashboardKeys.totalRepairs(),
    queryFn: dashboardApi.getTotalRepairs,
  });

export const useTotalDUM = () =>
  useQuery({
    queryKey: dashboardKeys.totalDUM(),
    queryFn: dashboardApi.getTotalDUM,
  });

export const useTotalSpareParts = () =>
  useQuery({
    queryKey: dashboardKeys.totalSpareParts(),
    queryFn: dashboardApi.getTotalSpareParts,
  });

export const useTotalPending = () =>
  useQuery({
    queryKey: dashboardKeys.totalPending(),
    queryFn: dashboardApi.getTotalPending,
  });

export const useCustomersCount = () =>
  useQuery({
    queryKey: dashboardKeys.customersCount(),
    queryFn: dashboardApi.getCustomersCount,
  });

export const useSuppliersCount = () =>
  useQuery({
    queryKey: dashboardKeys.suppliersCount(),
    queryFn: dashboardApi.getSuppliersCount,
  });

export const useTopCustomers = () =>
  useQuery({
    queryKey: dashboardKeys.topCustomers(),
    queryFn: dashboardApi.getTopCustomers,
  });

export const useProductsCount = () =>
  useQuery({
    queryKey: dashboardKeys.productsCount(),
    queryFn: dashboardApi.getProductsCount,
  });

export const useTopRepairedProducts = () =>
  useQuery({
    queryKey: dashboardKeys.topRepairedProducts(),
    queryFn: dashboardApi.getTopRepairedProducts,
  });

export const useCustomerSales = () =>
  useQuery({
    queryKey: dashboardKeys.customerSales(),
    queryFn: dashboardApi.getCustomerSales,
  });

export const useCustomerMarkets = () =>
  useQuery({
    queryKey: dashboardKeys.customerMarkets(),
    queryFn: dashboardApi.getCustomerMarkets,
  });
