import type { ColumnsType } from "antd/es/table";
import type { Quotation } from "@src/types/Quotations/quotation";
import type { Theme } from "@src/types/theme";
import dayjs from "dayjs";
import { FileText, Edit, Trash2 } from "lucide-react";
import { Popconfirm, Space, Button } from "antd";

export const getQuotationColumns = (
  theme: Theme,
  onEdit: (id: number) => void,
  onPreview: (id: number) => void,
  onDelete: (id: number) => void,
): ColumnsType<Quotation> => [
  {
    title: "Quotation No.",
    dataIndex: "q_number",
    key: "q_number",
    sorter: (a, b) => a.q_number.localeCompare(b.q_number),
    render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
  },
  {
    title: "Ref No.",
    dataIndex: "q_ref_to",
    key: "q_ref_to",
    render: (text) => <span style={{ color: theme.title?.color || "#555" }}>{text || "-"}</span>,
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
    align: "right",
    render: (_, record) => (
      <Space>
        <Button
          type="text"
          icon={<FileText size={18} />}
          onClick={(e) => {
            e.stopPropagation();
            onPreview(record.q_id);
          }}
          style={{ color: theme.button.background }}
        />
        <Button
          type="text"
          icon={<Edit size={18} />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(record.q_id);
          }}
          style={{ color: theme.text?.color || "#555" }}
        />
        <div onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Delete the quotation"
            description="Are you sure you want to delete this quotation?"
            onConfirm={() => onDelete(record.q_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<Trash2 size={18} />} />
          </Popconfirm>
        </div>
      </Space>
    ),
  },
];
