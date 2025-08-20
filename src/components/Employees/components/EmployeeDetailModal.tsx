import { Modal, Descriptions, Tag } from "antd";
import { Row, Col, Image } from "antd";
import type {
  Employee,
  EmployeeTheme,
} from "../../../types/Employees/employee";
import { calculateAge } from "../../../utils/calculateAge";
interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  employee?: Employee;
  theme?: EmployeeTheme;
}

const EmployeeDetailModal = ({
  modalOpen,
  onClose,
  employee,
  theme,
}: DetailModal) => {
  return (
    <>
      <style>{`
         .custom-employee-modal .ant-modal-content {
            background: ${theme?.modal?.background} !important;
            color: ${theme?.modal?.color} !important;
            border-radius: 18px !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
            border: none !important;
            padding: 0 !important;
            backdrop-filter: blur(30px) !important; // or use theme.backdropFilter
            -webkit-backdrop-filter: blur(30px) !important;
        }
        .custom-employee-modal .ant-modal-header {
          background: transparent !important;
          border-bottom: 1px solid ${
            theme?.row?.borderColor || "#eee"
          } !important;
          border-radius: 18px 18px 0 0 !important;
          padding: 24px 32px 12px 32px !important;
        }
        .custom-employee-modal .ant-modal-title {
          color: ${theme?.modal?.color || "#222"} !important;
          font-size: 22px !important;
          font-weight: 700 !important;
          letter-spacing: 0.03em !important;
        }
        .custom-employee-modal .ant-modal-close {
          top: 24px !important;
          right: 32px !important;
        }
        .custom-employee-modal .ant-modal-close-x {
          color: ${theme?.modal?.color || "#222"} !important;
          font-size: 20px !important;
        }
        .custom-employee-modal .ant-modal-body {
          padding: 32px !important;
        }
        .custom-employee-modal .ant-descriptions-bordered .ant-descriptions-item-label {
          background: transparent !important;
          color: ${theme?.modal?.color || "#444"} !important;
          font-weight: 600 !important;
          font-size: 14px !important;
        }
        .custom-employee-modal .ant-descriptions-bordered .ant-descriptions-item-content {
          background: transparent !important;
          color: ${theme?.employee?.nameColor || "#222"} !important;
          font-size: 15px !important;
        }
      `}</style>
      <Modal
        className="custom-employee-modal"
        title="Employee Details"
        open={modalOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={700}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Image
              src={
                employee?.e_photo
                  ? `Images/employees/${employee.e_photo}`
                  : "https://via.placeholder.com/200"
              }
              alt={employee?.f_name}
              style={{ borderRadius: "12px", width: "100%"}}
            />
          </Col>

          <Col span={16}>
            <Descriptions bordered column={1} labelStyle={{ fontWeight: 600 }}>
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
    </>
  );
};

export default EmployeeDetailModal;
