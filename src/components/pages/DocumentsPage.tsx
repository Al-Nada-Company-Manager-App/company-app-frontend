import React, { useState } from "react";
import { Tabs } from "antd";
import { FileText, FileDown, FileUp } from "lucide-react";
import { useThemeContext } from "@src/contexts/theme";
import Quotations from "../Quotations";
import Receipts from "../Receipts";
import DeliveryNotes from "../DeliveryNotes";

const DocumentsPage: React.FC = () => {
  const { theme, isDark } = useThemeContext();
  const [activeTab, setActiveTab] = useState("quotations");

  const tabItems = [
    {
      key: "quotations",
      label: (
        <span className="flex items-center gap-2">
          <FileText size={16} />
          Price Quotations
        </span>
      ),
      children: <Quotations isDark={isDark} />,
    },
    {
      key: "receipts",
      label: (
        <span className="flex items-center gap-2">
          <FileDown size={16} />
          Receipt Notes (إذن استلام)
        </span>
      ),
      children: <Receipts isDark={isDark} />,
    },
    {
      key: "deliveries",
      label: (
        <span className="flex items-center gap-2">
          <FileUp size={16} />
          Delivery Notes (إذن تسليم)
        </span>
      ),
      children: <DeliveryNotes isDark={isDark} />,
    },
  ];

  return (
    <div
      className="p-6 h-full flex flex-col"
      style={{
        background: "transparent",
      }}
    >
      <div
        className="w-full rounded-2xl p-6 shadow-sm flex-1 flex flex-col"
        style={{
          background: theme.container.background,
          backdropFilter: theme.container.backdropFilter,
        }}
      >
        <div className="mb-4">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: theme.title.color }}
          >
            Documents & Papers
          </h1>
          <p style={{ color: theme.headers?.color || "#666" }}>
            Manage all your quotations, receipt notes, and delivery notes from one place.
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="documents-tabs flex-1"
          style={{
            '--ant-primary-color': theme.button?.background || '#1677ff',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default DocumentsPage;
