import type {
  CustomerProduct,
  DebtOverview,
  PurchaseOverview,
  RepairOverTime,
  RepairStatus,
  SalesOverview,
  SparePartUsed,
  LowStockAlert,
  StockSummary,
  SupplierProduct,
  TopProduct,
  TopCustomer,
  TopRepairedProduct,
  CustomerSale,
  CustomerMarket,
} from "@src/types/Dashboard/dashboard";

const API_BASE_URL = "http://localhost:4000/api";

// helper to handle responses that may be a number or an object containing a number
async function parseNumberResponse(res: Response, fallback = 0): Promise<number> {
  if (!res.ok) throw new Error("Failed to fetch numeric value");
  const json = await res.json();
  if (typeof json === "number") return json;
  if (json && typeof json === "object") {
    // prefer common keys, then first numeric value
    const candidates = [
      "total",
      "count",
      "total_repairs",
      "totalrepairs",
      "totalRepairs",
      "total_stock",
      "totalStock",
      "total_purchase",
      "totalPurchase",
      "total_sales",
      "totalSales",
      "total_debts",
      "totalDebts",
      "total_DUM",
      "totalDUM",
      "total_spare_parts",
      "totalSpareParts",
      "total_pending",
      "totalPending",
      "customersCount",
      "suppliersCount",
      "productsCount",
    ];
    const jsonObj = json as Record<string, unknown>;
    for (const k of candidates) {
      if (typeof jsonObj[k] === "number") return jsonObj[k] as number;
    }
    const firstNumeric = Object.values(json).find((v) => typeof v === "number");
    if (typeof firstNumeric === "number") return firstNumeric;
  }
  return fallback;
}

export const dashboardApi = {
  getCustomerProducts: async (): Promise<CustomerProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/customersproducts`);
    if (!res.ok) throw new Error("Failed to fetch customer products");
    return res.json();
  },


  getTotalStock: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-stock`);
    return parseNumberResponse(res);
  },

  getTotalPurchase: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-purchase`);
    return parseNumberResponse(res);
  },

  getTotalSales: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-sales`);
    return parseNumberResponse(res);
  },

  getTotalDebts: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-debts`);
    return parseNumberResponse(res);
  },

  getTotalRepairs: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-repairs`);
    return parseNumberResponse(res);
  },

  getTotalDUM: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-DUM`);
    return parseNumberResponse(res);
  },

  getTotalSpareParts: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-spare-parts`);
    return parseNumberResponse(res);
  },

  getTotalPending: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/total-pending`);
    return parseNumberResponse(res);
  },

  getCustomersCount: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/getcustomerscount`);
    return parseNumberResponse(res);
  },

  getSuppliersCount: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/getsupplierscount`);
    return parseNumberResponse(res);
  },

  getProductsCount: async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/getproductscount`);
    return parseNumberResponse(res);
  },


  getDebtsOverview: async (): Promise<{ data: DebtOverview[] }> => {
    const res = await fetch(`${API_BASE_URL}/debtsoverview`);
    if (!res.ok) throw new Error("Failed to fetch debts overview");
    return res.json();
  },

  getPurchasesOverview: async (): Promise<{ data: PurchaseOverview[] }> => {
    const res = await fetch(`${API_BASE_URL}/purchasesoverview`);
    if (!res.ok) throw new Error("Failed to fetch purchases overview");
    return res.json();
  },

  getRepairsOverTime: async (): Promise<RepairOverTime[]> => {
    const res = await fetch(`${API_BASE_URL}/repairs-over-time`);
    if (!res.ok) throw new Error("Failed to fetch repairs over time");
    return res.json();
  },

  getRepairStatus: async (): Promise<RepairStatus[]> => {
    const res = await fetch(`${API_BASE_URL}/repair-status`);
    if (!res.ok) throw new Error("Failed to fetch repair status");
    return res.json();
  },

  getSalesOverview: async (): Promise<{ data: SalesOverview[] }> => {
    const res = await fetch(`${API_BASE_URL}/salesoverview`);
    if (!res.ok) throw new Error("Failed to fetch sales overview");
    return res.json();
  },

  getSparePartsUsed: async (): Promise<SparePartUsed[]> => {
    const res = await fetch(`${API_BASE_URL}/spare-parts-used`);
    if (!res.ok) throw new Error("Failed to fetch spare parts used");
    return res.json();
  },

  getLowStockAlerts: async (): Promise<LowStockAlert[]> => {
    const res = await fetch(`${API_BASE_URL}/low-stock-alert`);
    if (!res.ok) throw new Error("Failed to fetch low stock alerts");
    return res.json();
  },

  getStockSummary: async (): Promise<StockSummary[]> => {
    const res = await fetch(`${API_BASE_URL}/stocks_summary`);
    if (!res.ok) throw new Error("Failed to fetch stock summary");
    return res.json();
  },

  getSupplierProducts: async (): Promise<SupplierProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/suppliersproducts`);
    if (!res.ok) throw new Error("Failed to fetch supplier products");
    return res.json();
  },

  getTopProducts: async (): Promise<{ data: TopProduct[] }> => {
    const res = await fetch(`${API_BASE_URL}/topproducts`);
    if (!res.ok) throw new Error("Failed to fetch top products");
    return res.json();
  },


  getTopCustomers: async (): Promise<TopCustomer[]> => {
    const res = await fetch(`${API_BASE_URL}/gettopcustomers`);
    if (!res.ok) throw new Error("Failed to fetch top customers");
    return res.json();
  },


  getTopRepairedProducts: async (): Promise<TopRepairedProduct[]> => {
    const res = await fetch(`${API_BASE_URL}/gettoprepairedproducts`);
    if (!res.ok) throw new Error("Failed to fetch top repaired products");
    return res.json();
  },

  getCustomerSales: async (): Promise<CustomerSale[]> => {
    const res = await fetch(`${API_BASE_URL}/getcustomersales`);
    if (!res.ok) throw new Error("Failed to fetch customer sales");
    return res.json();
  },

  getCustomerMarkets: async (): Promise<CustomerMarket[]> => {
    const res = await fetch(`${API_BASE_URL}/getcustomermarkets`);
    if (!res.ok) throw new Error("Failed to fetch customer markets");
    return res.json();
  },
};