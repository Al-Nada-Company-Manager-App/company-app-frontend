import type { ColumnsType } from "antd/es/table";
import type { Debt } from "@src/types/Debts/debt";
import type { Theme } from "@src/types/theme";
import { Tag } from "antd";
import moment from "moment";

export const getDebtColumns = (theme: Theme): ColumnsType<Debt> => [
  {
    title: "Customer",
    key: "customer",
    render: (_, debt) => {
      const customer = debt.sales?.customer;
      if (!customer) {
        return (
          <div className="flex items-center gap-3">
            <img
              src="/Images/customers/placeholder.jpg"
              alt="Deleted Customer"
              className="w-8 h-8 rounded-full object-cover"
              style={{
                border: `1px solid ${theme.row?.borderColor}`,
              }}
            />
            <span
              style={{
                color: theme.employee?.emailColor,
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Deleted Customer
            </span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-3">
          <img
            src={
              customer.c_photo
                ? `/Images/customers/${customer.c_photo}`
                : "/Images/customers/placeholder.jpg"
            }
            alt={customer.c_name}
            className="w-8 h-8 rounded-full object-cover"
            style={{
              border: `1px solid ${theme.row?.borderColor}`,
            }}
          />
          <span
            style={{
              color: theme.employee?.nameColor,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {customer.c_name}
          </span>
        </div>
      );
    },
  },
  {
    title: "Sale Bill #",
    dataIndex: ["sales", "sl_billnum"],
    key: "sl_billnum",
    sorter: (a, b) => (a.sales?.sl_billnum || 0) - (b.sales?.sl_billnum || 0),
    render: (text: number) => (
      <span
        style={{
          color: theme.employee?.emailColor,
          fontSize: "14px",
          fontFamily: "monospace",
        }}
      >
        #{text || "N/A"}
      </span>
    ),
  },
  {
    title: "Type",
    dataIndex: "d_type",
    key: "d_type",
    filters: [
      { text: "Debt In", value: "DEBT_IN" },
      { text: "Debt Out", value: "DEBT_OUT" },
      { text: "Insurance", value: "INSURANCE" },
    ],
    onFilter: (value, record) => record.d_type === value,
    render: (type: "DEBT_IN" | "DEBT_OUT" | "INSURANCE") => {
      const getTypeColor = () => {
        switch (type) {
          case "DEBT_IN":
            return "green";
          case "DEBT_OUT":
            return "red";
          case "INSURANCE":
            return "orange";
          default:
            return "default";
        }
      };

      const getTypeLabel = () => {
        switch (type) {
          case "DEBT_IN":
            return "Debt In";
          case "DEBT_OUT":
            return "Debt Out";
          case "INSURANCE":
            return "Insurance";
          default:
            return type;
        }
      };

      return (
        <Tag
          color={getTypeColor()}
          style={{
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            border: "none",
          }}
        >
          {getTypeLabel()}
        </Tag>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "d_amount",
    key: "d_amount",
    sorter: (a, b) => a.d_amount - b.d_amount,
    render: (amount: number, debt) => {
      const getAmountColor = () => {
        switch (debt.d_type) {
          case "DEBT_IN":
            return "#52c41a";
          case "DEBT_OUT":
            return "#ff4d4f";
          case "INSURANCE":
            return "#faad14";
          default:
            return "#000";
        }
      };

      const getAmountSymbol = () => {
        switch (debt.d_type) {
          case "DEBT_IN":
            return "+";
          case "DEBT_OUT":
            return "-";
          case "INSURANCE":
            return "🛡";
          default:
            return "";
        }
      };

      return (
        <span
          style={{
            color: getAmountColor(),
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {getAmountSymbol()}
          {debt.d_currency} {amount.toFixed(2)}
        </span>
      );
    },
  },
  {
    title: "Sale Total",
    dataIndex: ["sales", "sl_total"],
    key: "sl_total",
    sorter: (a, b) => (a.sales?.sl_total || 0) - (b.sales?.sl_total || 0),
    render: (total: number, debt) => (
      <span
        style={{
          color: theme.employee?.emailColor,
          fontSize: "14px",
        }}
      >
        {debt.sales?.sl_currency || "USD"} {(total || 0).toFixed(2)}
      </span>
    ),
  },
  {
    title: "Debt Date",
    dataIndex: "d_date",
    key: "d_date",
    sorter: (a, b) => moment(a.d_date).unix() - moment(b.d_date).unix(),
    render: (date: string) => (
      <span
        style={{
          color: theme.employee?.emailColor,
          fontSize: "14px",
        }}
      >
        {moment(date).format("MMM DD, YYYY")}
      </span>
    ),
  },
  {
    title: "Sale Status",
    dataIndex: ["sales", "sl_status"],
    key: "sl_status",
    filters: [
      { text: "Pending", value: "Pending" },
      { text: "Completed", value: "Completed" },
      { text: "Cancelled", value: "Cancelled" },
    ],
    onFilter: (value, record) => record.sales?.sl_status === value,
    render: (status: "Pending" | "Completed" | "Cancelled") => {
      if (!status) {
        return (
          <Tag
            color="#d9d9d9"
            style={{
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "500",
              border: "none",
            }}
          >
            Unknown
          </Tag>
        );
      }

      const getStatusColor = () => {
        switch (status) {
          case "Completed":
            return "#52c41a";
          case "Pending":
            return "#faad14";
          case "Cancelled":
            return "#ff4d4f";
          default:
            return "#d9d9d9";
        }
      };

      return (
        <Tag
          color={getStatusColor()}
          style={{
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            border: "none",
          }}
        >
          {status}
        </Tag>
      );
    },
  },
];
