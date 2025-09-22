import type { Theme } from "@src/types/theme";

export interface CustomerProduct {
  CustomerID: number;
  CustomerName: string;
  ProductCount: number;
}

export interface DebtOverview {
  d_type: "DEBT_IN" | "DEBT_OUT" | "INSURANCE";
  total_debt: number;
}

export interface PurchaseOverview {
  month: string;
  total_purchases: number;
}

export interface RepairOverTime {
  rep_date: string;
  repairs_count: number;
}

export interface RepairStatus {
  p_status: string;
  status_count: number;
}

export interface SalesOverview {
  month: string;
  total_sales: number;
}

export interface SparePartUsed {
  spare_part_name: string;
  total_used: number;
}

export interface LowStockAlert {
  p_name: string;
  p_quantity: number;
}

export interface StockSummary {
  p_category: string;
  total_quantity: number;
  total_products: number;
}

export interface SupplierProduct {
  SupplierID: number;
  SupplierName: string;
  ProductCount: number;
}

export interface TopProduct {
  p_name: string;
  total_sale: number;
}

export interface TopCustomer {
  c_name: string;
  total_paid: number;
}

export interface TopRepairedProduct {
  p_name: string;
  repair_count: number;
}

export interface CustomerSale {
  c_name: string;
  salescount: number;
}

export interface CustomerMarket {
  c_name: string;
  marketing_count: number;
}

export interface DashboardData {
  totalStock: number;
  totalPurchase: number;
  totalSales: number;
  totalDebts: number;
  totalRepairs: number;
  totalDUM: number;
  totalSpareParts: number;
  totalPending: number;
  customersCount: number;
  suppliersCount: number;
  productsCount: number;
  customerProducts: CustomerProduct[];
  debtsOverview: DebtOverview[];
  purchasesOverview: PurchaseOverview[];
  repairsOverTime: RepairOverTime[];
  repairStatus: RepairStatus[];
  salesOverview: SalesOverview[];
  sparePartsUsed: SparePartUsed[];
  lowStockAlerts: LowStockAlert[];
  stockSummary: StockSummary[];
  supplierProducts: SupplierProduct[];
  topProducts: TopProduct[];
  topCustomers: TopCustomer[];
  topRepairedProducts: TopRepairedProduct[];
  customerSales: CustomerSale[];
  customerMarkets: CustomerMarket[];
}

export interface DashboardHookReturn {
  theme: Theme;
  data: DashboardData;
  isLoading: boolean;
  error: Error | null;
}
