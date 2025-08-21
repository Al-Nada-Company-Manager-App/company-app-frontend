import { Modal, Descriptions, Row, Col, Image, Button } from "antd";
import type { Theme } from "@src/types/theme";
import type { Customer } from "@src/types/Customers/customer";
import ConfirmBtn from "@src/components/UI/confirm";
import ModalStyle from "@src/components/UI/ModalStyle";
import CustomerSalesTable from "./components/CustomerSalesTable";

import { useDeleteCustomer } from "@src/queries/Customers";

import { useThemeContext } from "@src/contexts/useThemeContext";

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
  const { isDark } = useThemeContext();
  const deleteCustomer = useDeleteCustomer(isDark);

  const handleDelete = async (customerId: number) => {
    if (customerId === -1) return;
    await deleteCustomer.mutateAsync(customerId);
  };
  return (
    <>
      <ModalStyle theme={theme} />
      <Modal
        className="custom-modal"
        title="Customer Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <Button
              type="primary"
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
              style={{
                background: theme.button?.background || "#6C79F7",
                color: theme.button?.color || "#fff",
                boxShadow: theme.button?.boxShadow,
                borderRadius: theme.button?.borderRadius,
                fontWeight: theme.button?.fontWeight,
                fontSize: theme.button?.fontSize,
                padding: theme.button?.padding,
                transition: theme.button?.transition,
                border: theme.button?.border,
              }}
              onMouseOver={(e) => {
                if (theme.button) {
                  e.currentTarget.style.background =
                    theme.button.hoverBackground || "#5A67D8";
                  e.currentTarget.style.color =
                    theme.button.hoverColor || "#fff";
                }
              }}
              onMouseOut={(e) => {
                if (theme.button) {
                  e.currentTarget.style.background =
                    theme.button.background || "#6C79F7";
                  e.currentTarget.style.color = theme.button.color || "#fff";
                }
              }}
              // onClick={() => setUpdateOpen(true)}
            >
              Edit
            </Button>
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
            <Image
              src={
                customer?.c_photo
                  ? `Images/customers/${customer.c_photo}`
                  : "https://via.placeholder.com/200"
              }
              alt={customer?.c_name}
              style={{ borderRadius: "12px", width: "100%" }}
            />
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
          <CustomerSalesTable customerId={customer?.c_id || -1} theme={theme} />
        </Row>
      </Modal>
      {/* <UpdatePermissionsModal
        modalOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        theme={theme}
        employeeId={employee?.e_id || -1}
      /> */}
    </>
  );
};

export default CustomerDetailModal;
