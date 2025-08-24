import { Modal, Form, Input, Upload, Button, Row, Col, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useThemeContext } from "@src/contexts/useThemeContext";
import { useCreateCustomer , useUpdateCustomerPhoto } from "@src/queries/Customers";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";

interface AddModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
}


const AddCustomerModal = ({ modalOpen, onClose, theme }: AddModalProps) => {
    const { isDark } = useThemeContext();
    const [form] = Form.useForm();
    const createCustomer = useCreateCustomer(isDark);
    const updateCustomerPhoto = useUpdateCustomerPhoto(isDark);

    const [imageFile, setImageFile] = useState<RcFile | null>(null);
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

    // Reset form and image preview when modal opens
    useEffect(() => {
      if (modalOpen) {
        form.resetFields();
        setImageFile(null);
        setPreviewImage(undefined);
      }
    }, [modalOpen, form]);

    const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
      const fileObj = info.file as RcFile;
      if (fileObj) {
        setImageFile(fileObj);
        setPreviewImage(URL.createObjectURL(fileObj));
      }
    };

    const handleUploadImage = async (file: RcFile, id : number): Promise<string> => {
      const response = await updateCustomerPhoto.mutateAsync({
        c_id: id,
        photo: file,
      });
      return response;
    };

    const onFinish = async (values: Omit<Customer, "c_id">) => {
      let photoFilename = "";

      
      const newCustomer: Omit<Customer, "c_id"> = {
        ...values,
        c_photo: photoFilename,
      };
      
      const response = await createCustomer.mutateAsync(newCustomer);
      if (imageFile && response.c_id) {
        photoFilename = await handleUploadImage(imageFile, response.c_id);
      }

      form.resetFields();
      setImageFile(null);
      setPreviewImage(undefined);
      onClose();


    };

    return (
      <>
        <ModalStyle theme={theme} />
        <Modal
          className="custom-modal"
          title="Add Customer"
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
                    src={previewImage || "/Images/customers/placeholder.jpg"}
                    alt={"Customer"}
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: `1px solid ${
                        theme.row?.borderColor || "#E2E8F0"
                      }`,
                    }}
                  />
                  <Upload
                    name="c_photo"
                    showUploadList={false}
                    beforeUpload={() => false} // Prevent auto-upload
                    onChange={handleImageChange}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                      Upload Photo
                    </Button>
                  </Upload>
                </div>
              </Col>
              <Col span={16}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="c_name"
                      label="Customer Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter customer name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="c_email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer email",
                    },
                  ]}
                >
                  <Input placeholder="Enter email" />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="c_phone"
                      label="Phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer phone number",
                        },
                      ]}
                    >
                      <Input placeholder="Enter phone number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="c_fax"
                      label="Fax"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer fax",
                        },
                      ]}
                    >
                      <Input placeholder="Enter fax number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="c_address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer address",
                    },
                  ]}
                >
                  <Input placeholder="Enter address" />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="c_city"
                      label="City"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer city",
                        },
                      ]}
                    >
                      <Input placeholder="Enter city" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="c_country"
                      label="Country"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the customer country",
                        },
                      ]}
                    >
                      <Input placeholder="Enter country" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="c_zipcode"
                  label="Zip Code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer zipcode",
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
                  btnTitle="Add"
                  onClick={() => form.submit()}
                />
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }


  export default AddCustomerModal;
