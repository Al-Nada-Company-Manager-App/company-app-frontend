import type { ColumnsType } from "antd/es/table";
import type { Key } from "antd/es/table/interface";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import ProductInfo from "./components/ProductInfo";
import { convertTimestampToDate } from "@src/utils/ConvertDate";

export const getProductColumns = (
  theme: Theme,
  showExpireDate: boolean = false,
  showCategory: boolean = false,
): ColumnsType<Product> => [
  {
    title: "Product",
    dataIndex: "p_name",
    key: "p_name",
    render: (_, record: Product) => (
      <ProductInfo product={record} theme={theme} />
    ),
    sorter: (a, b) => (a.p_name || "").localeCompare(b.p_name || ""),
    filterSearch: true,
    onFilter: (value, record) =>
      record.p_name?.toLowerCase().includes((value as string).toLowerCase()) ||
      false,
    width: "20%",
  },
...(showCategory
    ? [
  {
    title: "Category",
    dataIndex: "p_category",
    key: "p_category",
    filters: [
      { text: "Measuring & Controllers", value: "Measuring & Controllers" },
      { text: "Laboratory Equipment", value: "Laboratory Equipment" },
      { text: "Chemical", value: "Chemical" },
      { text: "Spare Part", value: "Spare Part" },
      { text: "Others", value: "Others" },
    ],
    onFilter: (value: boolean | Key, record: Product) => record.p_category === value,
    width: "15%",
  },
    ]
    : []),
  {
    title: "Cost Price",
    dataIndex: "p_costprice",
    key: "p_costprice",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.p_costprice || 0) - (b.p_costprice || 0),
    width: "10%",
  },
  {
    title: "Sell Price",
    dataIndex: "p_sellprice",
    key: "p_sellprice",
    render: (value: number) => value?.toFixed(2),
    sorter: (a, b) => (a.p_sellprice || 0) - (b.p_sellprice || 0),
    width: "10%",
  },
  {
    title: "Quantity",
    dataIndex: "p_quantity",
    key: "p_quantity",
    sorter: (a, b) => (a.p_quantity || 0) - (b.p_quantity || 0),
    filters: [
      { text: "In Stock (>0)", value: "in_stock" },
      { text: "Low Stock (1-5)", value: "low_stock" },
      { text: "Out of Stock (0)", value: "out_of_stock" },
    ],
    onFilter: (value, record) => {
      const quantity = record.p_quantity || 0;
      switch (value) {
        case "in_stock":
          return quantity > 0;
        case "low_stock":
          return quantity >= 1 && quantity <= 5;
        case "out_of_stock":
          return quantity === 0;
        default:
          return true;
      }
    },
    width: "8%",
  },
  {
    title: "Model Code",
    dataIndex: "model_code",
    key: "model_code",
    filterSearch: true,
    onFilter: (value, record) =>
      record.model_code
        ?.toLowerCase()
        .includes((value as string).toLowerCase()) || false,
    width: "12%",
  },
  ...(showExpireDate
    ? [
        {
          title: "Expire Date",
          dataIndex: "expire_date",
          key: "expire_date",
          render: (expire_date: string) =>
            convertTimestampToDate(expire_date) || "N/A",
          sorter: (a: Product, b: Product) => {
            const dateA = a.expire_date ? new Date(a.expire_date).getTime() : 0;
            const dateB = b.expire_date ? new Date(b.expire_date).getTime() : 0;
            return dateA - dateB;
          },
          width: "12%",
        },
      ]
    : []),
  {
    title: "Status",
    dataIndex: "p_status",
    key: "p_status",
    filters: [
      { text: "Available", value: "Available" },
      { text: "Out of Stock", value: "Out of Stock" },
      { text: "Discontinued", value: "Discontinued" },
    ],
    onFilter: (value, record) => record.p_status === value,
    width: "10%",
  },
];
