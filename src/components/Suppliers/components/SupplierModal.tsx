import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  Select,
} from "antd";
import type { Supplier } from "@src/types/Suppliers/supplier";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import {
  useCreateSupplier,
  useUpdateSupplier,
  useUpdateSupplierPhoto,
  useGetAllCompanies,
} from "@src/queries/Suppliers";
import type { RcFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import { ImageUpload } from "@src/components/UI";
import { getImageUrl } from "@src/config/api";

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  supplier?: Supplier;
}

const SupplierModal = ({ isOpen, onClose, theme, supplier }: SupplierModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createSupplier = useCreateSupplier(isDark);
  const updateSupplier = useUpdateSupplier(isDark);
  const updateSupplierPhoto = useUpdateSupplierPhoto(isDark);
  const { data: companies } = useGetAllCompanies();

  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [supplierType, setSupplierType] = useState<string>("COMPANY");
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  // Sync form values, image and type when modal opens or supplier changes
  useEffect(() => {
    if (isOpen) {
      if (supplier) {
        form.setFieldsValue({
          s_name: supplier.s_name,
          s_email: supplier.s_email,
          s_phone: supplier.s_phone,
          s_address: supplier.s_address,
          s_city: supplier.s_city,
          s_country: supplier.s_country,
          s_zipcode: supplier.s_zipcode,
          s_fax: supplier.s_fax,
          s_type: supplier.s_type || "COMPANY",
          s_company_id: supplier.s_company_id,
        });
        setSupplierType(supplier.s_type || "COMPANY");
        setPreviewImage(supplier.s_photo ? getImageUrl("suppliers", supplier.s_photo) : undefined);
      } else {
        form.resetFields();
        setSupplierType("COMPANY");
        setPreviewImage(undefined);
      }
      setImageFile(null);
    }
  }, [isOpen, supplier, form]);

  const handleUploadImage = async (
    file: RcFile,
    id: number,
  ): Promise<string> => {
    const response = await updateSupplierPhoto.mutateAsync({
      s_id: id,
      photo: file,
    });
    return response;
  };

  const onFinish = async (values: Omit<Supplier, "s_id">) => {
    let photoFilename = supplier?.s_photo || "";

    if (supplier) {
      // Edit mode
      if (imageFile) {
        photoFilename = await handleUploadImage(imageFile, supplier.s_id);
      }
      const updatedSupplier: Partial<Supplier> = {
        ...values,
        s_id: supplier.s_id,
        s_photo: photoFilename,
      };
      await updateSupplier.mutateAsync({
        id: supplier.s_id,
        supplierData: updatedSupplier,
      });
    } else {
      // Add mode
      const newSupplier: Omit<Supplier, "s_id"> = {
        ...values,
        s_photo: "",
      };
      const response = await createSupplier.mutateAsync(newSupplier);
      if (imageFile && response.s_id) {
        await handleUploadImage(imageFile, response.s_id);
      }
    }

    form.resetFields();
    setImageFile(null);
    setPreviewImage(undefined);
    onClose();
  };

  return (
    <Modal
      className="custom-modal"
      title={supplier ? "Update Supplier" : "Add Supplier"}
      open={isOpen}
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
            <ImageUpload
              value={imageFile}
              onChange={(file) => setImageFile(file)}
              previewImage={previewImage}
              onPreviewChange={setPreviewImage}
              theme={theme}
              isOpen={isOpen}
              altText={supplier ? supplier.s_name : "Supplier"}
            />
          </Col>
          <Col span={16}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="s_type" label="Type" initialValue="COMPANY">
                  <Radio.Group
                    onChange={(e) => setSupplierType(e.target.value)}
                  >
                    <Radio value="COMPANY">Company</Radio>
                    <Radio value="PERSON">Person</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              {supplierType === "PERSON" && (
                <Col span={12}>
                  <Form.Item name="s_company_id" label="Company">
                    <Select
                      placeholder="Select Company"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={companies?.map((c) => ({
                        value: c.s_id,
                        label: c.s_name,
                      }))}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
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
              btnTitle={supplier ? "Update" : "Add"}
              onClick={() => form.submit()}
              loading={supplier ? updateSupplier.isPending : createSupplier.isPending}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierModal;
