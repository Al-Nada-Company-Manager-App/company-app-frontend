import {
  Form,
  Input,
  Button,
  Radio,
  Select,
} from "antd";
import type { Customer } from "@src/types/Customers/customer";
import type { Theme } from "@src/types/theme";
import { useThemeContext } from "@src/contexts/theme";
import {
  useCreateCustomer,
  useUpdateCustomer,
  useUpdateCustomerPhoto,
  useGetAllCompanies,
} from "@src/queries/Customers";
import type { RcFile } from "antd/es/upload";
import { useState, useEffect } from "react";
import CustomBtn from "@src/components/UI/customBtn";
import { ImageUpload } from "@src/components/UI";
import { getImageUrl } from "@src/config/api";
import AppModal from "@src/components/UI/AppModal";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  customer?: Customer;
}

const CustomerModal = ({ isOpen, onClose, theme, customer }: CustomerModalProps) => {
  const { isDark } = useThemeContext();
  const [form] = Form.useForm();
  const createCustomer = useCreateCustomer(isDark);
  const updateCustomer = useUpdateCustomer(isDark);
  const updateCustomerPhoto = useUpdateCustomerPhoto(isDark);
  const { data: companies } = useGetAllCompanies();

  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [customerType, setCustomerType] = useState<string>("COMPANY");
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  // Sync form values, image, and type when modal opens or customer changes
  useEffect(() => {
    if (isOpen) {
      if (customer) {
        form.setFieldsValue({
          c_name: customer.c_name,
          c_email: customer.c_email,
          c_phone: customer.c_phone,
          c_address: customer.c_address,
          c_city: customer.c_city,
          c_country: customer.c_country,
          c_zipcode: customer.c_zipcode,
          c_fax: customer.c_fax,
          c_business_type: customer.c_business_type,
          c_latitude: customer.c_latitude,
          c_longitude: customer.c_longitude,
          c_type: customer.c_type || "COMPANY",
          c_company_id: customer.c_company_id,
        });
        setCustomerType(customer.c_type || "COMPANY");
        setPreviewImage(customer.c_photo ? getImageUrl("customers", customer.c_photo) : undefined);
      } else {
        form.resetFields();
        setCustomerType("COMPANY");
        setPreviewImage(undefined);
      }
      setImageFile(null);
    }
  }, [isOpen, customer, form]);

  const handleUploadImage = async (
    file: RcFile,
    id: number,
  ): Promise<string> => {
    const response = await updateCustomerPhoto.mutateAsync({
      c_id: id,
      photo: file,
    });
    return response;
  };

  const onFinish = async (values: Omit<Customer, "c_id">) => {
    let photoFilename = customer?.c_photo || "";

    if (customer) {
      // Edit mode
      if (imageFile) {
        photoFilename = await handleUploadImage(imageFile, customer.c_id);
      }
      const updatedCustomer: Partial<Customer> = {
        ...values,
        c_id: customer.c_id,
        c_photo: photoFilename,
      };
      await updateCustomer.mutateAsync({
        id: customer.c_id,
        customerData: updatedCustomer,
      });
    } else {
      // Add mode
      const newCustomer: Omit<Customer, "c_id"> = {
        ...values,
        c_photo: "",
      };
      const response = await createCustomer.mutateAsync(newCustomer);
      if (imageFile && response.c_id) {
        await handleUploadImage(imageFile, response.c_id);
      }
    }

    form.resetFields();
    setImageFile(null);
    setPreviewImage(undefined);
    onClose();
  };

  return (
    <AppModal
      title={customer ? "Update Customer" : "Add Customer"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      zIndex={10200}
      form={form}
      isLoading={customer ? updateCustomer.isPending : createCustomer.isPending}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <ImageUpload
              value={imageFile}
              onChange={(file) => setImageFile(file)}
              previewImage={previewImage}
              onPreviewChange={setPreviewImage}
              theme={theme}
              isOpen={isOpen}
              altText={customer ? customer.c_name : "Customer"}
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <Form.Item name="c_type" label="Type" initialValue="COMPANY">
                  <Radio.Group
                    onChange={(e) => setCustomerType(e.target.value)}
                  >
                    <Radio value="COMPANY">Company</Radio>
                    <Radio value="PERSON">Person</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {customerType === "PERSON" && (
                <div className="w-full">
                  <Form.Item name="c_company_id" label="Company">
                    <Select
                      placeholder="Select Company"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={companies?.map((c) => ({
                        value: c.c_id,
                        label: c.c_name,
                      }))}
                    />
                  </Form.Item>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
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
              </div>
              <div className="w-full">
                <Form.Item name="c_business_type" label="Type of Business">
                  <Input placeholder="Enter type of business" />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              name="c_email"
              label="Email"
              rules={[
                {
                  message: "Please enter the customer email",
                },
              ]}
              className="mb-0"
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
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
              </div>
              <div className="w-full">
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
              </div>
            </div>
            <Form.Item
              name="c_address"
              label="Address"
              rules={[
                {
                  message: "Please enter the customer address",
                },
              ]}
              className="mb-0"
            >
              <Input.TextArea placeholder="Enter address" rows={3} />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
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
              </div>
              <div className="w-full">
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
              </div>
            </div>
            <Form.Item
              name="c_zipcode"
              label="Zip Code"
              rules={[
                {
                  message: "Please enter the customer zipcode",
                },
              ]}
              className="mb-0"
            >
              <Input placeholder="Enter zip code" />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <Form.Item name="c_latitude" label="Latitude">
                  <Input
                    type="number"
                    placeholder="e.g. 30.0444"
                    step="0.0001"
                  />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item name="c_longitude" label="Longitude">
                  <Input
                    type="number"
                    placeholder="e.g. 31.2357"
                    step="0.0001"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <Form.Item className="mt-6">
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
              btnTitle={customer ? "Update" : "Add"}
              onClick={() => form.submit()}
              loading={customer ? updateCustomer.isPending : createCustomer.isPending}
            />
          </div>
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default CustomerModal;
