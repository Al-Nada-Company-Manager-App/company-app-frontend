import React, { useState } from "react";
import { Modal, Table, Button, Input } from "antd";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import CustomerModal from "../Customers/components/CustomerModal";
import CustomerDetailModal from "../Customers/components/CustomerDetailModal";
import CustomBtn from "../UI/customBtn";

interface TaskCustomerSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (customers: Customer[]) => void;
  selectedCustomerIds: number[];
  onUnvisit: (c_id: number) => void;
  onClearAllVisits: () => void;
  customers: Customer[];
  loading: boolean;
  theme: Theme;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

const TaskCustomerSelectModal: React.FC<TaskCustomerSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedCustomerIds,
  onUnvisit,
  onClearAllVisits,
  customers,
  loading,
  theme,
  searchTerm,
  setSearchTerm,
}) => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [detailCustomerId, setDetailCustomerId] = useState<number | null>(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "c_name",
      key: "c_name",
      render: (text: string, record: Customer) => (
        <a 
          onClick={() => setDetailCustomerId(record.c_id)}
          style={{ color: theme.modal?.color || "#000", textDecoration: "underline" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Customer) => {
        const isVisited = record._count?.tasks && record._count.tasks > 0;
        return (
          <span style={{ color: isVisited ? "green" : "gray" }}>
            {isVisited ? "Visited Before" : "Not Visited"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Customer) => {
        const isVisited = record._count?.tasks && record._count.tasks > 0;
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            {isVisited && (
              <Button danger size="small" onClick={() => onUnvisit(record.c_id)}>
                Unvisit
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="done" type="primary" onClick={onClose} style={{ marginTop: '16px' }}>
            Done
          </Button>
        ]}
        width={800}
        title={<span style={{ color: theme.modal?.color }}>Select Customers</span>}
        styles={{ content: { background: theme.modal?.background || "#fff" }, header: { background: theme.modal?.background || "#fff" } }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Input 
            placeholder="Search Customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <div>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Customer"
              onClick={() => setShowAddCustomer(true)}
            />
            <Button 
              danger
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all your visit records?")) {
                  onClearAllVisits();
                }
              }}
              style={{ marginLeft: '10px' }}
            >
              Clear All Visits
            </Button>
          </div>
        </div>
        
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedCustomerIds,
            onChange: (_selectedRowKeys, selectedRows) => {
              onSelect(selectedRows as Customer[]);
            }
          }}
          dataSource={customers}
          columns={columns}
          rowKey="c_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          className="custom-table"
        />
      </Modal>

      <CustomerModal
        isOpen={showAddCustomer}
        onClose={() => setShowAddCustomer(false)}
        theme={theme}
      />

      <CustomerDetailModal
        modalOpen={detailCustomerId !== null}
        onClose={() => setDetailCustomerId(null)}
        customerId={detailCustomerId}
        theme={theme}
      />
    </>
  );
};

export default TaskCustomerSelectModal;
