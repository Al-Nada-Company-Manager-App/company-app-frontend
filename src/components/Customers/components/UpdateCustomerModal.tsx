import { Modal, Form, Input, Upload, Button, Row, Col } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import {
  useUpdateCustomer,
  useUpdateCustomerPhoto,
} from "@src/queries/Customers";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import { getImageUrl } from "@src/config/api";

interface UpdateModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  customer?: Customer;
}

const UpdateCustomerModal = ({
  modalOpen,
  onClose,
  customer,
  theme,
}: UpdateModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const updateCustomer = useUpdateCustomer(isDark);
  const updateCustomerPhoto = useUpdateCustomerPhoto(isDark);

  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    customer?.c_photo ? getImageUrl("customers", customer.c_photo) : undefined,
  );
  useEffect(() => {
    if (customer?.c_photo) {
      setPreviewImage(getImageUrl("customers", customer.c_photo));
    }
  }, [customer?.c_photo]);

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const rcFile = Object.assign(file, {
              uid: `paste-${Date.now()}`,
            }) as RcFile;
            setImageFile(rcFile);
            setPreviewImage(URL.createObjectURL(file));
          }
          break;
        }
      }
    };
    if (modalOpen) {
      document.addEventListener("paste", handlePaste);
    }
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [modalOpen]);

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    const fileObj = info.file as RcFile;
    if (fileObj) {
      setImageFile(info.file);
      setPreviewImage(URL.createObjectURL(fileObj));
    }
  };

  const handleUploadImage = async (file: RcFile): Promise<string> => {
    const response = await updateCustomerPhoto.mutateAsync({
      c_id: customer?.c_id || -1,
      photo: file,
    });
    return response;
  };

  const onFinish = async (values: Customer) => {
    let photoFilename = customer?.c_photo;

    if (imageFile) {
      photoFilename = await handleUploadImage(imageFile as RcFile);
    }

    const updatedCustomer: Partial<Customer> = {
      ...values,
      c_id: customer?.c_id,
      c_photo: photoFilename,
    };

    if (customer?.c_id) {
      await updateCustomer.mutateAsync({
        id: customer.c_id,
        customerData: updatedCustomer,
      });
      // form.resetFields();
      onClose();
    }
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Update Customer"
        open={modalOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={800}
        zIndex={10200}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            c_name: customer?.c_name,
            c_email: customer?.c_email,
            c_phone: customer?.c_phone,
            c_address: customer?.c_address,
            c_city: customer?.c_city,
            c_country: customer?.c_country,
            c_zipcode: customer?.c_zipcode,
            c_fax: customer?.c_fax,
            c_business_type: customer?.c_business_type,
            c_latitude: customer?.c_latitude,
            c_longitude: customer?.c_longitude,
          }}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Upload.Dragger
                name="e_photo"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleImageChange}
                accept="image/*"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${theme.row?.borderColor || "#E2E8F0"}`,
                  padding: previewImage ? 0 : undefined,
                  background: "transparent",
                }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={customer?.c_name}
                    style={{
                      width: "100%",
                      maxHeight: "220px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div style={{ padding: "16px" }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag image here</p>
                    <p className="ant-upload-hint">
                      Paste from clipboard (Ctrl+V)
                    </p>
                  </div>
                )}
              </Upload.Dragger>
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
                <Col span={12}>
                  <Form.Item name="c_business_type" label="Type of Business">
                    <Input placeholder="Enter type of business" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="c_email"
                label="Email"
                rules={[
                  {
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
                    message: "Please enter the customer address",
                  },
                ]}
              >
                <Input.TextArea placeholder="Enter address" rows={3} />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="c_city"
                    label="City"
                    rules={[
                      {
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
                    message: "Please enter the customer zipcode",
                  },
                ]}
              >
                <Input placeholder="Enter zip code" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="c_latitude" label="Latitude">
                    <Input
                      type="number"
                      placeholder="e.g. 30.0444"
                      step="0.0001"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="c_longitude" label="Longitude">
                    <Input
                      type="number"
                      placeholder="e.g. 31.2357"
                      step="0.0001"
                    />
                  </Form.Item>
                </Col>
              </Row>
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

export default UpdateCustomerModal;
