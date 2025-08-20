import { Modal, Descriptions, Tag, Row, Col, Image, Button } from "antd";
import type {
  Employee,
  EmployeeTheme,
} from "../../../types/Employees/employee";
import { calculateAge } from "../../../utils/calculateAge";

import ConfirmBtn from "../../UI/confirm";
import ModalStyle from "../../UI/ModalStyle";
import  {useDeleteEmployee,useGetAllEmployees} from "../../../queries/Employees";

interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  theme: EmployeeTheme;
  employee?: Employee;
}

const EmployeeDetailModal = ({
  modalOpen,
  onClose,
  employee,
  theme,
}: DetailModal) => {
      const deleteEmployee = useDeleteEmployee();
      const getAllEmployees = useGetAllEmployees();
    
 const handleDelete = async (employeeId: number) => {
    if (employeeId === -1) return;
    await deleteEmployee.mutateAsync(employeeId);
    await getAllEmployees.refetch();
 }
   
  return (
    <>
      <ModalStyle theme={theme} />
      <Modal
        className="custom-employee-modal"
        title="Employee Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <Button type="primary" className="mr-2 px-6 py-2 mb-5 ">
              Edit
            </Button>
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(employee?.e_id || -1);
                onClose();
              }
            }
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
            <Image
              src={
                employee?.e_photo
                  ? `Images/employees/${employee.e_photo}`
                  : "https://via.placeholder.com/200"
              }
              alt={employee?.f_name}
              style={{ borderRadius: "12px", width: "100%" }}
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
