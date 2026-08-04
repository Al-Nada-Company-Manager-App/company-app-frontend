import { Space, Button, Popconfirm } from "antd";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import type { DeliveryNote } from "@src/types/Deliveries/delivery";
import dayjs from "dayjs";

export const getDeliveryColumns = (
  theme: any,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void,
  onPreview: (id: number) => void,
): ColumnsType<DeliveryNote> => [
  {
    title: "Delivery No.",
    dataIndex: "dn_number",
    key: "dn_number",
    sorter: (a, b) => a.dn_number.localeCompare(b.dn_number),
    render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
  },
  {
    title: "Customer",
    key: "customer",
    render: (_, record) => <span>{record.customer?.c_name || "-"}</span>,
  },
  {
    title: "Employee",
    dataIndex: "dn_employee_name",
    key: "dn_employee_name",
  },
  {
    title: "Date",
    dataIndex: "dn_date",
    key: "dn_date",
    sorter: (a, b) => dayjs(a.dn_date).unix() - dayjs(b.dn_date).unix(),
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
          onClick={() => onPreview(record.dn_id)}
          style={{ color: theme.button.background }}
        />
        <Button
          type="text"
          icon={<Edit size={18} />}
          onClick={() => onEdit(record.dn_id)}
          style={{ color: theme.text?.color || "#555" }}
        />
        <Popconfirm
          title="Delete Delivery Note"
          description="Are you sure you want to delete this delivery?"
          onConfirm={() => onDelete(record.dn_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<Trash2 size={18} />} />
        </Popconfirm>
      </Space>
    ),
  },
];
