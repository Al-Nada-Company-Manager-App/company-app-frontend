import type { ColumnsType } from "antd/es/table";
import type { Quotation } from "@src/types/Quotations/quotation";
import type { Theme } from "@src/types/theme";
import dayjs from "dayjs";
import { FileText, Edit } from "lucide-react";

export const getQuotationColumns = (
  theme: Theme,
  onEdit: (id: number) => void,
  onPreview: (id: number) => void,
): ColumnsType<Quotation> => [
  {
    title: "Ref Code",
    dataIndex: "q_ref_code",
    key: "q_ref_code",
    sorter: (a, b) => a.q_ref_code.localeCompare(b.q_ref_code),
    render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
  },
  {
    title: "Customer",
    dataIndex: "q_customer_name",
    key: "q_customer_name",
    sorter: (a, b) => a.q_customer_name.localeCompare(b.q_customer_name),
  },
  {
    title: "Date",
    dataIndex: "q_created_at",
    key: "q_created_at",
    sorter: (a, b) =>
      dayjs(a.q_created_at).valueOf() - dayjs(b.q_created_at).valueOf(),
    render: (date) => dayjs(date).format("DD/MM/YYYY"),
  },
  {
    title: "Valid Until",
    dataIndex: "q_valid_until",
    key: "q_valid_until",
    render: (date) => (
      <span
        style={{
          color: dayjs(date).isBefore(dayjs())
            ? theme.status?.offline?.color
            : "inherit",
        }}
      >
        {dayjs(date).format("DD/MM/YYYY")}
      </span>
    ),
  },
  {
    title: "Total Amount",
    dataIndex: "q_total_amount",
    key: "q_total_amount",
    align: "right",
    sorter: (a, b) => (a.q_total_amount || 0) - (b.q_total_amount || 0),
    render: (amount) => (
      <span style={{ fontWeight: "bold", color: theme.button.background }}>
        $
        {amount?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    render: (_, record) => (
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(record.q_id);
          }}
          className="flex items-center justify-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0"
          style={{ color: theme.button.background }}
        >
          <FileText size={16} /> <span className="text-xs">PDF</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(record.q_id);
          }}
          className="flex items-center justify-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0"
          style={{ color: "#eab308" }}
        >
          <Edit size={16} /> <span className="text-xs">Edit</span>
        </button>
      </div>
    ),
  },
];
