import { Modal, Form, Input, Upload, Button, Row, Col, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useThemeContext } from "@src/contexts/theme";
import {
  useCreateSupplier,
  useUpdateSupplierPhoto,
} from "@src/queries/Suppliers";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";

interface AddModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const AddSupplierModal = ({ modalOpen, onClose, theme }: AddModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createSupplier = useCreateSupplier(isDark);
  const updateSupplierPhoto = useUpdateSupplierPhoto(isDark);

  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

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

  const handleUploadImage = async (
    file: RcFile,
    id: number
  ): Promise<string> => {
    const response = await updateSupplierPhoto.mutateAsync({
      s_id: id,
      photo: file,
    });
    return response;
  };

  const onFinish = async (values: Omit<Supplier, "s_id">) => {
    let photoFilename = "";

    const newSupplier: Omit<Supplier, "s_id"> = {
      ...values,
      s_photo: photoFilename,
    };

    const response = await createSupplier.mutateAsync(newSupplier);
    if (imageFile && response.s_id) {
      photoFilename = await handleUploadImage(imageFile, response.s_id);
    }

    form.resetFields();
    setImageFile(null);
    setPreviewImage(undefined);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Add Supplier"
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
                  src={previewImage || "/Images/suppliers/placeholder.jpg"}
                  alt={"Supplier"}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: `1px solid ${theme.row?.borderColor || "#E2E8F0"}`,
                  }}
                />
                <Upload
                  name="s_photo"
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
                    name="s_name"
                    label="Supplier Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the supplier name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter supplier name" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="s_email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter the supplier email",
                  },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="s_phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the supplier phone number",
                      },
                    ]}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="s_fax"
                    label="Fax"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the supplier fax",
                      },
                    ]}
                  >
                    <Input placeholder="Enter fax number" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="s_address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter the supplier address",
                  },
                ]}
              >
                <Input placeholder="Enter address" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="s_city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the supplier city",
                      },
                    ]}
                  >
                    <Input placeholder="Enter city" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="s_country"
                    label="Country"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the supplier country",
                      },
                    ]}
                  >
                    <Input placeholder="Enter country" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="s_zipcode"
                label="Zip Code"
                rules={[
                  {
                    required: true,
                    message: "Please enter the supplier zipcode",
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
};

export default AddSupplierModal;
