import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Row,
  Col,
  Button,
} from "antd";
import type { RcFile } from "antd/es/upload";
import { useThemeContext } from "@src/contexts/theme";
import type { CreateProductInput, UpdateProductInput, Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { useCreateProduct, useUpdateProduct, useUpdateProductPhoto } from "@src/queries/Products";
import CustomBtn from "@src/components/UI/customBtn";
import RichTextEditor from "@src/components/UI/RichTextEditor";
import { ImageUpload } from "@src/components/UI";
import { getImageUrl } from "@src/config/api";
import { useGetAllSuppliers } from "@src/queries/Suppliers/supplierQueries";
import dayjs from "dayjs";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  theme,
  product,
}) => {
  const { isDark } = useThemeContext();
  const { data: suppliers } = useGetAllSuppliers();
  const [form] = Form.useForm();
  const category = Form.useWatch("p_category", form);
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  const createProduct = useCreateProduct(isDark);
  const updateProduct = useUpdateProduct(isDark);
  const updateProductPhoto = useUpdateProductPhoto(isDark);

  // Sync form values, description and image preview when modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      if (product) {
        form.setFieldsValue({
          p_name: product.p_name,
          p_category: product.p_category,
          p_costprice: product.p_costprice,
          p_sellprice: product.p_sellprice,
          p_quantity: product.p_quantity,
          model_code: product.model_code,
          p_size: product.p_size,
          expire_date: product.expire_date ? dayjs(product.expire_date) : null,
          p_status: product.p_status,
          serial_number: product.serial_number,
          s_id: product.s_id || undefined,
        });
        setDescription(product.p_description || "");
        setPreviewImage(product.p_photo ? getImageUrl("products", product.p_photo) : undefined);
      } else {
        form.resetFields();
        setDescription("");
        setPreviewImage(undefined);
      }
      setImageFile(null);
    }
  }, [isOpen, product, form]);

  const handleUploadImage = async (
    file: RcFile,
    id: number,
  ): Promise<string> => {
    const response = await updateProductPhoto.mutateAsync({
      id,
      file,
    });
    return response.p_photo ? response.p_photo : "";
  };

  const onFinish = async (values: any) => {
    let photoFilename = product?.p_photo || "";

    const isLabOrChem = values.p_category === "Laboratory Equipment" || values.p_category === "Chemical";
    const isChem = values.p_category === "Chemical";

    const formattedValues = {
      ...values,
      model_code: isLabOrChem ? null : (values.model_code ?? undefined),
      serial_number: isLabOrChem ? null : (values.serial_number ?? undefined),
      expire_date: (isChem && values.expire_date) ? values.expire_date.format("YYYY-MM-DD") : null,
    };

    if (product) {
      // Edit mode
      if (imageFile) {
        photoFilename = await handleUploadImage(imageFile, product.p_id);
      }

      const updatedProduct: UpdateProductInput = {
        ...formattedValues,
        p_id: product.p_id,
        p_photo: photoFilename,
        p_description: description || null,
        model_code: formattedValues.model_code ?? undefined,
        p_size: formattedValues.p_size ?? undefined,
        expire_date: formattedValues.expire_date ?? undefined,
        p_status: formattedValues.p_status ?? undefined,
      };

      await updateProduct.mutateAsync(updatedProduct);
    } else {
      // Add mode
      const newProduct: Omit<CreateProductInput, "p_id"> = {
        ...formattedValues,
        p_photo: "",
        p_description: description || undefined,
      };

      const response = await createProduct.mutateAsync(newProduct);
      if (imageFile && response.p_id) {
        await handleUploadImage(imageFile, response.p_id);
      }
    }

    form.resetFields();
    setImageFile(null);
    setPreviewImage(undefined);
    setDescription("");
    onClose();
  };

  return (
    <Modal
      centered
      title={product ? "Update Product" : "Add New Product"}
      open={isOpen}
      onCancel={onClose}
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
            <ImageUpload
              value={imageFile}
              onChange={(file) => setImageFile(file)}
              previewImage={previewImage}
              onPreviewChange={setPreviewImage}
              theme={theme}
              isOpen={isOpen}
              altText={product ? product.p_name : "Product"}
            />
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
                  <Input placeholder="Enter product name" />
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
                  <Select placeholder="Select category">
                    <Select.Option value="Measuring & Controllers">
                      Measuring & Controllers
                    </Select.Option>
                    <Select.Option value="Laboratory Equipment">
                      Laboratory Equipment
                    </Select.Option>
                    <Select.Option value="Chemical">Chemical</Select.Option>
                    <Select.Option value="Spare Part">
                      Spare Part
                    </Select.Option>
                    <Select.Option value="Others">Others</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label="Manufacturer / Supplier" name="s_id">
                  <Select 
                    placeholder="Select a supplier" 
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      (option?.children as unknown as string)
                        ?.toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {suppliers?.map((sup: any) => (
                      <Select.Option key={sup.s_id} value={sup.s_id}>
                        {sup.s_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Cost Price (EGP)"
                  name="p_costprice"
                  rules={[
                    {
                      required: true,
                      message: "Please enter cost price",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter cost price" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Sell Price (EGP)"
                  name="p_sellprice"
                  rules={[
                    {
                      required: true,
                      message: "Please enter selling price",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter selling price" />
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
                  <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter quantity" />
                </Form.Item>
              </Col>
              {!(category === "Laboratory Equipment" || category === "Chemical") && (
                <Col span={12}>
                  <Form.Item label="Model Code" name="model_code">
                    <Input placeholder="Enter model code" />
                  </Form.Item>
                </Col>
              )}
              {(category === "Laboratory Equipment" || category === "Chemical") && (
                <Col span={12}>
                  <Form.Item label="Size" name="p_size">
                    <Input placeholder="Enter size (e.g., 50 ml)" />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={[16, 16]}>
              {!(category === "Laboratory Equipment" || category === "Chemical") && (
                <Col span={12}>
                  <Form.Item
                    label="Serial Number"
                    name="serial_number"
                  >
                    <Input placeholder="Enter serial number" />
                  </Form.Item>
                </Col>
              )}
              {category === "Chemical" && (
                <Col span={12}>
                  <Form.Item label="Expire Date" name="expire_date">
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
              )}
            </Row>
            {product && (
              <Form.Item name="p_status" label="Status">
                <Input placeholder="Enter product status" />
              </Form.Item>
            )}
          </Col>
        </Row>

        <Form.Item label="Description">
          <RichTextEditor
            value={description}
            onChange={setDescription}
            height={130}
            isDark={isDark}
            placeholder="Enter product description..."
          />
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
              btnTitle={product ? "Update" : "Add"}
              onClick={() => form.submit()}
              loading={product ? updateProduct.isPending : createProduct.isPending}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
