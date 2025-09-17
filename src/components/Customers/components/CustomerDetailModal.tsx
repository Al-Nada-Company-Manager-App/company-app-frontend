import ConfirmBtn from "@src/components/UI/confirm";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Image, Modal, Row } from "antd";
import { useState } from "react";
import CustomerSalesTable from "./components/CustomerSalesTable";
import UpdateCustomerModal from "./UpdateCustomerModal";
import { useDeleteCustomer } from "@src/queries/Customers";
import { useThemeContext } from "@src/contexts/theme";
import CustomBtn from "@src/components/UI/customBtn";

interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  customer?: Customer;
}

const CustomerDetailModal = ({
  modalOpen,
  onClose,
  customer,
  theme,
}: DetailModal) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();
  const deleteCustomer = useDeleteCustomer(isDark);

  const handleDelete = async (customerId: number) => {
    if (customerId === -1) return;
    await deleteCustomer.mutateAsync(customerId);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Customer Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <CustomBtn
              btnTitle="Edit"
              onClick={() => setUpdateOpen(true)}
              theme={{
                ...theme,
                button: {
                  ...theme.button,
                  background: "#faad14",
                  hoverBackground: "#d48806",
                  color: "#fff",
                  hoverColor: "#fff",
                },
              }}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(customer?.c_id || -1);
                onClose();
              }}
              onCancel={() => {
                console.log("Delete cancelled");
              }}
              className="px-6 py-2 mb-5 mr-5"
              theme={theme}
            />
          </div>
        }
        centered
        style={{ minWidth: 1400, width: "auto", maxWidth: "95vw" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Image
                src={
                  customer?.c_photo
                    ? `Images/customers/${customer.c_photo}`
                    : "/Images/customers/placeholder.jpg"
                }
                alt={customer?.c_name}
                style={{ borderRadius: "12px", width: "100%" }}
              />
            </div>
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {`${customer?.c_name}`}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {customer?.c_email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {customer?.c_phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Fax">
                {customer?.c_fax || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {customer?.c_address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {customer?.c_city}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {customer?.c_country}
              </Descriptions.Item>
              <Descriptions.Item label="Zip Code">
                {customer?.c_zipcode}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <CustomerSalesTable
              customerId={customer?.c_id || -1}
              theme={theme}
            />
          </Col>
        </Row>
      </Modal>
      <UpdateCustomerModal
        key={customer?.c_id}
        modalOpen={updateOpen}
        onClose={handleUpdateClose}
        customer={customer}
        theme={theme}
      />
    </>
  );
};

export default CustomerDetailModal;
