import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Upload,
  Select,
  message,
  Row,
  Col,
  Button,
} from "antd";
import ModalStyle from "@src/components/UI/ModalStyle";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useThemeContext } from "@src/contexts/useThemeContext";
import type { CreateProductInput } from "@src/types/Products/product";
import { PlusOutlined } from "@ant-design/icons";
import type { Theme } from "@src/types/theme";
import { useCreateProduct, useUpdateProductPhoto } from "@src/queries/Products";
import CustomBtn from "@src/components/UI/customBtn";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  theme,
}) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const createProduct = useCreateProduct(isDark);
  const updateProductPhoto = useUpdateProductPhoto(isDark);

  const handleUploadImage = async (
    file: RcFile,
    id: number
  ): Promise<string> => {
    const response = await updateProductPhoto.mutateAsync({
      id,
      file,
    });
    return response.p_photo ? response.p_photo : "";
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    const fileObj = info.file as RcFile;
    if (fileObj) {
      setImageFile(fileObj);
      setPreviewImage(URL.createObjectURL(fileObj));
    }
  };

  const onFinish = async (values: Omit<CreateProductInput, "p-id">) => {
    let photoFilename = "";

    const newProduct: Omit<CreateProductInput, "p_id"> = {
      ...values,
      p_photo: photoFilename,
    };
    const response = await createProduct.mutateAsync(newProduct);

    if (imageFile && response.p_id) {
      photoFilename = await handleUploadImage(imageFile, response.p_id);
      message.success("Product image uploaded: " + photoFilename);
    }

    message.success("Product created successfully!");
    form.resetFields();
    setImageFile(null);
    setPreviewImage(undefined);
    onClose();
  };

  return (
    <>
      <ModalStyle theme={theme} />
      <Modal
        centered
        title="Add New Product"
        open={open}
        onCancel={onClose}
        onOk={() => form.submit()}
        okButtonProps={{ className: "bg-blue-500 text-white" }}
        className="custom-modal"
        width={800}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
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
                <Form.Item label="Upload Photo" name="p_photo">
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    showUploadList={false}
                    onChange={handleImageChange}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="preview"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col span={16}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Product Name"
                    name="p_name"
                    rules={[
                      { required: true, message: "Please enter product name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Category"
                    name="p_category"
                    rules={[
                      { required: true, message: "Please select category" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Measuring & Controllers">
                        Measuring & Controllers
                      </Select.Option>
                      <Select.Option value="Laboratory Equipment">
                        Laboratory Equipment
                      </Select.Option>
                      <Select.Option value="Chemical">Chemical</Select.Option>
                      <Select.Option value="Spare Part">Spare Part</Select.Option>
                      <Select.Option value="Others">Others</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Cost Price"
                    name="p_costprice"
                    rules={[
                      {
                        required: true,
                        message: "Please enter cost price",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      suffix="EGP"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Sell Price"
                    name="p_sellprice"
                    rules={[
                      {
                        required: true,
                        message: "Please enter selling price",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      suffix="EGP"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Quantity"
                    name="p_quantity"
                    rules={[
                      { required: true, message: "Please enter quantity" },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      suffix="EGP"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Model Code" name="model_code">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Serial Number"
                    name="serial_number"
                    rules={[
                      { required: true, message: "Please enter serial number" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Expire Date" name="expire_date">
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item label="Description" name="p_description">
            <Input.TextArea rows={3} />
          </Form.Item>
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

export default AddProductModal;
