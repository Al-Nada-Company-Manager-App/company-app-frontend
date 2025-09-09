import { Modal, Descriptions, Tag, Row, Col, Image, Button } from "antd";
import { useState } from "react";
import type { Employee } from "../../../types/Employees/employee";
import type { Theme } from "@src/types/theme";
import { calculateAge } from "@src/utils/calculateAge";

import ConfirmBtn from "@src/components/UI/confirm";
import CustomBtn from "@src/components/UI/customBtn";
import ModalStyle from "@src/components/UI/ModalStyle";
import {
  useDeleteEmployee,
  useDeactivateEmployee,
} from "@src/queries/Employees";
import { useThemeContext } from "@src/contexts/useThemeContext";
import UpdatePermissionsModal from "./UpdatePermissions";

interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  employee?: Employee;
}

const EmployeeDetailModal = ({
  modalOpen,
  onClose,
  employee,
  theme,
}: DetailModal) => {
  const { isDark } = useThemeContext();
  const [updateOpen, setUpdateOpen] = useState(false);
  const deleteEmployee = useDeleteEmployee(isDark);

  const deactivateEmployee = useDeactivateEmployee(isDark);

  const handleDelete = async (employeeId: number) => {
    if (employeeId === -1) return;
    await deleteEmployee.mutateAsync(employeeId);
  };
  const handleDeactivate = async (employeeId: number) => {
    if (employeeId === -1) return;
    await deactivateEmployee.mutateAsync(employeeId);
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Employee Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <Button
              type="primary"
              danger
              className="mr-2 px-6 py-2 mb-5"
              style={{
                color: theme.button?.color || "#fff",
                boxShadow: theme.button?.boxShadow,
                borderRadius: theme.button?.borderRadius,
                fontWeight: theme.button?.fontWeight,
                fontSize: theme.button?.fontSize,
                padding: theme.button?.padding,
                transition: theme.button?.transition,
                border: theme.button?.border,
              }}
              onClick={() => {
                handleDeactivate(employee?.e_id || -1);
                onClose();
              }}
            >
              Deactivate
            </Button>
            <CustomBtn
              btnTitle="Edit Permissions"
              onClick={() => setUpdateOpen(true)}
              theme={theme}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(employee?.e_id || -1);
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
        width={700}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Image
                src={
                  employee?.e_photo
                    ? `Images/employees/${employee.e_photo}`
                    : "/Images/employees/placeholder.jpg"
                }
                alt={employee?.f_name}
                style={{ borderRadius: "12px", width: "100%" }}
              />
            </div>
          </Col>

          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {`${employee?.f_name} ${employee?.l_name}`}
              </Descriptions.Item>
              <Descriptions.Item label="Age">
                {employee?.birth_date
                  ? calculateAge(employee.birth_date)
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Position">
                {employee?.e_role}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {employee?.e_gender}
              </Descriptions.Item>
              <Descriptions.Item label="Salary">
                ${employee?.salary}
              </Descriptions.Item>
              <Descriptions.Item label="Active">
                {employee?.e_active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Username">
                {employee?.e_username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {employee?.e_email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {employee?.e_phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {employee?.e_address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {employee?.e_city}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {employee?.e_country}
              </Descriptions.Item>
              <Descriptions.Item label="Zip Code">
                {employee?.e_zipcode}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
      <UpdatePermissionsModal
        modalOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        theme={theme}
        employeeId={employee?.e_id || -1}
      />
    </>
  );
};

export default EmployeeDetailModal;
