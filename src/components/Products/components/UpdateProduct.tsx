import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  Row,
  Col,
  Image,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/useThemeContext";
import { useUpdateProduct, useUpdateProductPhoto } from "@src/queries/Products";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import type { UpdateProductInput } from "@src/types/Products/product";

interface UpdateProductModalProps {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  product?: Product;
}

const UpdateProduct = ({
  modalOpen,
  onClose,
  product,
  theme,
}: UpdateProductModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const updateProduct = useUpdateProduct(isDark);
  const updateProductPhoto = useUpdateProductPhoto(isDark);

  const [imageFile, setImageFile] = useState<UploadFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    product?.p_photo ? `/Images/products/${product.p_photo}` : undefined
  );

  useEffect(() => {
    if (product?.p_photo) {
      setPreviewImage(`/Images/products/${product.p_photo}`);
    }
  }, [product?.p_photo]);

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    const fileObj = info.file as RcFile;
    if (fileObj) {
      setImageFile(info.file);
      setPreviewImage(URL.createObjectURL(fileObj));
    }
  };

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

  const onFinish = async (values: Product) => {
    let photoFilename = product?.p_photo;

    if (imageFile) {
      photoFilename = await handleUploadImage(
        imageFile as RcFile,
        product?.p_id || -1
      );
    }

    const updatedProduct: UpdateProductInput = {
      ...values,
      p_id: product?.p_id || -1,
      p_photo: photoFilename,
      p_description: values.p_description ?? undefined,
      model_code: values.model_code ?? undefined,
      expire_date: values.expire_date ?? undefined,
      p_status: values.p_status ?? undefined,
    };

    if (product?.p_id) {
      await updateProduct.mutateAsync(updatedProduct);
      onClose();
    }
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Update Product"
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
            p_name: product?.p_name,
            p_category: product?.p_category,
            p_costprice: product?.p_costprice,
            p_sellprice: product?.p_sellprice,
            p_quantity: product?.p_quantity,
            model_code: product?.model_code,
            p_description: product?.p_description,
            expire_date: product?.expire_date,
            p_status: product?.p_status,
            serial_number: product?.serial_number,
          }}
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={[24, 24]}>
            {/* Left side - Image */}
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
                  src={previewImage || "/Images/products/placeholder.jpg"}
                  alt={product?.p_name}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: `1px solid ${theme.row?.borderColor || "#E2E8F0"}`,
                  }}
                />
                <Upload
                  name="p_photo"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                    Change Photo
                  </Button>
                </Upload>
              </div>
            </Col>

            {/* Right side - Form fields */}
            <Col span={16}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="p_name"
                    label="Product Name"
                    rules={[
                      { required: true, message: "Please enter product name" },
                    ]}
                  >
                    <Input placeholder="Enter product name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="p_category"
                    label="Category"
                    rules={[
                      { required: true, message: "Please enter category" },
                    ]}
                  >
                    <Input placeholder="Enter category" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="p_costprice"
                    label="Cost Price"
                    rules={[{ required: true, message: "Enter cost price" }]}
                  >
                    <InputNumber
                      placeholder="Enter cost price"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="p_sellprice"
                    label="Sell Price"
                    rules={[{ required: true, message: "Enter sell price" }]}
                  >
                    <InputNumber
                      placeholder="Enter sell price"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="p_quantity"
                    label="Quantity"
                    rules={[{ required: true, message: "Enter quantity" }]}
                  >
                    <InputNumber
                      placeholder="Enter quantity"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="model_code" label="Model Code">
                    <Input placeholder="Enter model code" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="p_description" label="Description">
                <Input.TextArea
                  rows={3}
                  placeholder="Enter product description"
                />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="expire_date" label="Expire Date">
                    <Input type="date" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="serial_number" label="Serial Number">
                    <Input placeholder="Enter serial number" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="p_status" label="Status">
                <Input placeholder="Enter product status" />
              </Form.Item>
            </Col>
          </Row>

          {/* Footer buttons */}
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

export default UpdateProduct;
