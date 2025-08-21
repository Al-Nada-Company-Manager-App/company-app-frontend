import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Switch,
  Row,
  Col,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type {
  Employee,
} from "../../../types/Employees/employee";
import type { Theme } from "@src/types/theme";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useThemeContext } from "@src/contexts/useThemeContext";
import { useUpdateEmployee } from "@src/queries/Employees"; // Assuming this hook exists for updating employee data
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import moment from "moment"; // For handling dates
import { useState, useEffect } from "react";

interface UpdateModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  employee?: Employee;
}

const UpdateEmployeeModal = ({
  modalOpen,
  onClose,
  employee,
  theme,
}: UpdateModalProps) => {
    const { isDark } = useThemeContext();
    const [form] = Form.useForm();
    const updateEmployee = useUpdateEmployee(isDark); // Assuming this mutation hook for updating employee
    
    const [imageFile, setImageFile] = useState<UploadFile | null>(null);
    const [previewImage, setPreviewImage] = useState<string | undefined>(
        employee?.e_photo ? `Images/employees/${employee.e_photo}` : undefined
    );
    useEffect(() => {
      if (employee?.e_photo) {
        setPreviewImage(`/Images/employees/${employee.e_photo}`);
      }
    }, [employee?.e_photo]);


    const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      setImageFile(info.file.originFileObj as RcFile);
      setPreviewImage(URL.createObjectURL(info.file.originFileObj as RcFile));
    }
  };

  const handleUploadImage = async (file: RcFile): Promise<string> => {
    return "new-uploaded-filename.jpg";
  };

  const onFinish = async (values: Employee) => {
    let photoFilename = employee?.e_photo;

    // If new image is selected, upload it separately
    if (imageFile && imageFile.originFileObj) {
      photoFilename = await handleUploadImage(
        imageFile.originFileObj as RcFile
      );
    }

    const updatedEmployee: Partial<Employee> = {
      ...values,
      e_id: employee?.e_id,
      e_photo: photoFilename,
      birth_date: values.birth_date
        ? moment(values.birth_date).format("YYYY-MM-DD")
        : undefined,
      e_active: values.e_active,
    };

    if (employee?.e_id) {
      await updateEmployee.mutateAsync({
        id: employee.e_id,
        data: updatedEmployee,
      });
      form.resetFields();
      onClose();
    }
  };

  return (
    <>
      <ModalStyle theme={theme} />
      <Modal
        className="custom-modal"
        title="Update Employee"
        open={modalOpen}
        onCancel={onClose}
        footer={null} // Custom footer handled in form
        centered
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            f_name: employee?.f_name,
            l_name: employee?.l_name,
            birth_date: employee?.birth_date
              ? moment(employee.birth_date)
              : null,
            e_role: employee?.e_role,
            e_gender: employee?.e_gender,
            salary: employee?.salary,
            e_active: employee?.e_active,
            e_username: employee?.e_username,
            e_email: employee?.e_email,
            e_phone: employee?.e_phone,
            e_address: employee?.e_address,
            e_city: employee?.e_city,
            e_country: employee?.e_country,
            e_zipcode: employee?.e_zipcode,
          }}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Image
                  src={previewImage || "https://via.placeholder.com/200"}
                  alt={employee?.f_name}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: `1px solid ${theme.row?.borderColor || "#E2E8F0"}`,
                  }}
                />
                <Upload
                  name="e_photo"
                  showUploadList={false}
                  beforeUpload={() => false} // Prevent auto-upload
                  onChange={handleImageChange}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                    Change Photo
                  </Button>
                </Upload>
              </div>
            </Col>
            <Col span={16}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="f_name"
                    label="First Name"
                    rules={[
                      { required: true, message: "Please enter first name" },
                    ]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="l_name"
                    label="Last Name"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="birth_date" label="Birth Date">
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Select birth date"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="e_active"
                    label="Active"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="Inactive"
                    />
                  </Form.Item>
                 </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="e_role"
                    label="Position"
                    rules={[
                      { required: true, message: "Please enter position" },
                    ]}
                  >
                    <Select placeholder="Select gender">
                      <Select.Option value="Manager">Manager</Select.Option>
                      <Select.Option value="SalesMan">SalesMan</Select.Option>
                      <Select.Option  value="Accountant">Accountant</Select.Option >
                      <Select.Option  value="Technical Support">Technical Support</Select.Option >
                      <Select.Option  value="Secretary">Secretary</Select.Option >
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="e_gender"
                    label="Gender"
                    rules={[
                      { required: true, message: "Please select gender" },
                    ]}
                  >
                    <Select placeholder="Select gender">
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="salary"
                    label="Salary"
                    rules={[{ required: true, message: "Please enter salary" }]}
                  >
                    <Input
                      type="number"
                      prefix="$"
                      placeholder="Enter salary"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                </Col>
              </Row>
              <Form.Item
                name="e_username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
              <Form.Item
                name="e_email"
                label="Email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
              <Form.Item name="e_phone" label="Phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
              <Form.Item name="e_address" label="Address">
                <Input placeholder="Enter address" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="e_city" label="City">
                    <Input placeholder="Enter city" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="e_country" label="Country">
                    <Input placeholder="Enter country" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="e_zipcode" label="Zip Code">
                <Input placeholder="Enter zip code" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                style={{
                  background: theme.modal?.cancelButtonBg,
                  color: theme.modal?.cancelButtonColor,
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                // loading={updateEmployee.isLoading}
                style={{
                  background: theme.button?.background,
                  color: theme.button?.color,
                }}
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateEmployeeModal;
