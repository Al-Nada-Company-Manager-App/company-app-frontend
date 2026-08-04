import { Space, Button, Popconfirm } from "antd";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import type { ReceiptNote } from "@src/types/Receipts/receipt";
import dayjs from "dayjs";

export const getReceiptColumns = (
  theme: any,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  onPreview: (id: number) => void,
): ColumnsType<ReceiptNote> => [
  {
    title: "Receipt No.",
    dataIndex: "rn_number",
    key: "rn_number",
    sorter: (a, b) => a.rn_number.localeCompare(b.rn_number),
    render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
  },
  {
    title: "Customer",
    key: "customer",
    render: (_, record) => <span>{record.customer?.c_name || "-"}</span>,
  },
  {
    title: "Employee",
    dataIndex: "rn_employee_name",
    key: "rn_employee_name",
  },
  {
    title: "Date",
    dataIndex: "rn_date",
    key: "rn_date",
    sorter: (a, b) => dayjs(a.rn_date).unix() - dayjs(b.rn_date).unix(),
    render: (text) => <span>{dayjs(text).format("YYYY-MM-DD")}</span>,
  },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: (_, record) => (
      <Space>
        <Button
          type="text"
          icon={<Eye size={18} />}
          onClick={() => onPreview(record.rn_id)}
          style={{ color: theme.button.background }}
        />
        <Button
          type="text"
          icon={<Edit size={18} />}
          onClick={() => onEdit(record.rn_id)}
          style={{ color: theme.text?.color || "#555" }}
        />
        <Popconfirm
          title="Delete Receipt Note"
          description="Are you sure you want to delete this receipt?"
          onConfirm={() => onDelete(record.rn_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<Trash2 size={18} />} />
        </Popconfirm>
      </Space>
    ),
  },
];
