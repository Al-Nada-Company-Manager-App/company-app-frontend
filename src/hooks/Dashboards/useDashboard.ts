import { useMemo } from "react";
import { darkTheme, lightTheme } from "@src/hooks/dark&lightthemes";
import {
  useCustomerProducts,
  useDebtsOverview,
  usePurchasesOverview,
  useRepairsOverTime,
  useRepairStatus,
  useSalesOverview,
  useSparePartsUsed,
  useLowStockAlerts,
  useStockSummary,
  useSupplierProducts,
  useTopProducts,
  useTotalStock,
  useTotalPurchase,
  useTotalSales,
  useTotalDebts,
  useTotalRepairs,
  useTotalDUM,
  useTotalSpareParts,
  useTotalPending,
  useCustomersCount,
  useSuppliersCount,
  useTopCustomers,
  useProductsCount,
  useTopRepairedProducts,
  useCustomerSales,
  useCustomerMarkets,
} from "@src/queries/Dashboards";
import type { DashboardHookReturn, DashboardData } from "@src/types/Dashboard/dashboard";

export const useDashboard = (isDark: boolean): DashboardHookReturn => {
  const theme = useMemo(
    () => (isDark ? darkTheme : lightTheme),
    [isDark]
  );

  const totalStock = useTotalStock();
  const totalPurchase = useTotalPurchase();
  const totalSales = useTotalSales();
  const totalDebts = useTotalDebts();
  const totalRepairs = useTotalRepairs();
  const totalDUM = useTotalDUM();
  const totalSpareParts = useTotalSpareParts();
  const totalPending = useTotalPending();
  const customersCount = useCustomersCount();
  const suppliersCount = useSuppliersCount();
  const topCustomers = useTopCustomers();
  const productsCount = useProductsCount();
  const topRepairedProducts = useTopRepairedProducts();
  const customerSales = useCustomerSales();
  const customerMarkets = useCustomerMarkets();
  const customerProducts = useCustomerProducts();
  const debtsOverview = useDebtsOverview();
  const purchasesOverview = usePurchasesOverview();
  const repairsOverTime = useRepairsOverTime();
  const repairStatus = useRepairStatus();
  const salesOverview = useSalesOverview();
  const sparePartsUsed = useSparePartsUsed();
  const lowStockAlerts = useLowStockAlerts();
  const stockSummary = useStockSummary();
  const supplierProducts = useSupplierProducts();
  const topProducts = useTopProducts();

  const isLoading =
    totalStock.isLoading ||
    totalPurchase.isLoading ||
    totalSales.isLoading ||
    totalDebts.isLoading ||
    totalRepairs.isLoading ||
    totalDUM.isLoading ||
    totalSpareParts.isLoading ||
    totalPending.isLoading ||
    customersCount.isLoading ||
    suppliersCount.isLoading ||
    topCustomers.isLoading ||
    productsCount.isLoading ||
    topRepairedProducts.isLoading ||
    customerSales.isLoading ||
    customerMarkets.isLoading ||
    customerProducts.isLoading ||
    debtsOverview.isLoading ||
    purchasesOverview.isLoading ||
    repairsOverTime.isLoading ||
    repairStatus.isLoading ||
    salesOverview.isLoading ||
    sparePartsUsed.isLoading ||
    lowStockAlerts.isLoading ||
    stockSummary.isLoading ||
    supplierProducts.isLoading ||
    topProducts.isLoading;

  const error =
    totalStock.error ||
    totalPurchase.error ||
    totalSales.error ||
    totalDebts.error ||
    totalRepairs.error ||
    totalDUM.error ||
    totalSpareParts.error ||
    totalPending.error ||
    customersCount.error ||
    suppliersCount.error ||
    topCustomers.error ||
    productsCount.error ||
    topRepairedProducts.error ||
    customerSales.error ||
    customerMarkets.error ||
    customerProducts.error ||
    debtsOverview.error ||
    purchasesOverview.error ||
    repairsOverTime.error ||
    repairStatus.error ||
    salesOverview.error ||
    sparePartsUsed.error ||
    lowStockAlerts.error ||
    stockSummary.error ||
    supplierProducts.error ||
    topProducts.error ||
    null;

  const data: DashboardData = {
    totalStock: totalStock.data ?? 0,
    totalPurchase: totalPurchase.data ?? 0,
    totalSales: totalSales.data ?? 0,
    totalDebts: totalDebts.data ?? 0,
    totalRepairs: totalRepairs.data ?? 0,
    totalDUM: totalDUM.data ?? 0,
    totalSpareParts: totalSpareParts.data ?? 0,
    totalPending: totalPending.data ?? 0,
    customersCount: customersCount.data ?? 0,
    suppliersCount: suppliersCount.data ?? 0,
    topCustomers: topCustomers.data ?? [],
    productsCount: productsCount.data ?? 0,
    topRepairedProducts: topRepairedProducts.data ?? [],
    customerSales: customerSales.data ?? [],
    customerMarkets: customerMarkets.data ?? [],
    customerProducts: customerProducts.data ?? [],
    debtsOverview: Array.isArray(debtsOverview.data) ? debtsOverview.data : [],
    purchasesOverview: Array.isArray(purchasesOverview.data)
      ? purchasesOverview.data
      : [],
    repairsOverTime: repairsOverTime.data ?? [],
    repairStatus: repairStatus.data ?? [],
    salesOverview: Array.isArray(salesOverview.data) ? salesOverview.data : [],
    sparePartsUsed: sparePartsUsed.data ?? [],
    lowStockAlerts: lowStockAlerts.data ?? [],
    stockSummary: stockSummary.data ?? [],
    supplierProducts: supplierProducts.data ?? [],
    topProducts: Array.isArray(topProducts.data) ? topProducts.data : [],
  };

  return { theme, data, isLoading, error };
};