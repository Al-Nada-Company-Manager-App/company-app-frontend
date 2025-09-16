import { Modal, Form, Input, Upload, Button, Row, Col, Image, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Employee } from "@src/types/Employees/employee";
import type { Theme } from "@src/types/theme";
import { useAuthContext } from "@src/contexts/auth";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import moment from "moment";

interface UpdateProfileModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  user?: Employee;
}

const UpdateProfileModal = ({
  modalOpen,
  onClose,
  user,
  theme,
}: UpdateProfileModalProps) => {
  const { login } = useAuthContext(); // We'll use this to update the dummy data
  const [form] = Form.useForm();

  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    user?.e_photo ? user.e_photo : undefined
  );

  useEffect(() => {
    if (user?.e_photo) {
      setPreviewImage(user.e_photo);
    }
  }, [user?.e_photo]);

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    const fileObj = info.file as RcFile;
    if (fileObj) {
      setImageFile(info.file);
      setPreviewImage(URL.createObjectURL(fileObj));
    }
  };

  const onFinish = async (values: Partial<Employee>) => {
    let photoFilename = user?.e_photo;

    // For now, just simulate updating the photo if a new one is selected
    if (imageFile) {
      // In a real app, you would upload the image and get the filename
      photoFilename = `/public/Images/employees/updated_${user?.e_id}.jpg`;
    }

    // Update the dummy user data
    const updatedUser: Employee = {
      ...user!,
      ...values,
      birth_date: values.birth_date ? moment(values.birth_date).format('YYYY-MM-DD') : user!.birth_date,
      e_photo: photoFilename || user!.e_photo,
    };

    // Update the auth context with the new user data (simulating API update)
    login(updatedUser);
    
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Update Profile"
        open={modalOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            f_name: user?.f_name,
            l_name: user?.l_name,
            e_email: user?.e_email,
            e_phone: user?.e_phone,
            e_address: user?.e_address,
            e_city: user?.e_city,
            e_country: user?.e_country,
            e_zipcode: user?.e_zipcode,
            e_username: user?.e_username,
            birth_date: user?.birth_date ? moment(user.birth_date) : undefined,
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
                  src={previewImage || "/public/Images/employees/placeholder.jpg"}
                  alt={`${user?.f_name} ${user?.l_name}`}
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
                      {
                        required: true,
                        message: "Please enter the first name",
                      },
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
                      {
                        required: true,
                        message: "Please enter the last name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="e_email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the email",
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="Enter email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="e_phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the phone number",
                      },
                    ]}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="e_username"
                    label="Username"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the username",
                      },
                    ]}
                  >
                    <Input placeholder="Enter username" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="birth_date"
                    label="Birth Date"
                    rules={[
                      {
                        required: true,
                        message: "Please select the birth date",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} placeholder="Select birth date" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="e_address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter the address",
                  },
                ]}
              >
                <Input placeholder="Enter address" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="e_city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the city",
                      },
                    ]}
                  >
                    <Input placeholder="Enter city" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="e_country"
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the country",
                      },
                    ]}
                  >
                    <Input placeholder="Enter country" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="e_zipcode"
                label="Zip Code"
                rules={[
                  {
                    required: true,
                    message: "Please enter the zipcode",
                  },
                ]}
              >
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
                  boxShadow: theme.button?.boxShadow,
                  borderRadius: theme.button?.borderRadius,
                  fontWeight: theme.button?.fontWeight,
                  fontSize: theme.button?.fontSize,
                  padding: theme.button?.padding,
                  transition: theme.button?.transition,
                  border: theme.button?.border,
                }}
              >
                Cancel
              </Button>
              <CustomBtn
                theme={theme}
                btnTitle="Update"
                onClick={() => form.submit()}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
