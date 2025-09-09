import ConfirmBtn from "@src/components/UI/confirm";
import ModalStyle from "@src/components/UI/ModalStyle";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Image, Modal, Row } from "antd";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { useDeleteProduct } from "@src/queries/Products/productQueries";
import { useThemeContext } from "@src/contexts/useThemeContext";
import CustomBtn from "@src/components/UI/customBtn";

interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  product?: Product;
}

const ProductDetailModal = ({
  modalOpen,
  onClose,
  product,
  theme,
}: DetailModal) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();
  const deleteProduct = useDeleteProduct(isDark);

  const handleDelete = async (productId: number) => {
    if (productId === -1) return;
    await deleteProduct.mutateAsync(productId);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Product Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <CustomBtn
              btnTitle="Edit"
              onClick={() => setUpdateOpen(true)}
              theme={theme}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(product?.p_id || -1);
                onClose();
              }}
              onCancel={() => {
                console.log("Delete cancelled");
              }}
              className="px-6 py-2 mb-5 mr-5"
              theme={theme}
            />
          </div>
        }
        centered
        style={{ minWidth: 900, width: "auto", maxWidth: "95vw" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Image
              src={
                product?.p_photo
                  ? `Images Products/${product.p_photo}`
                  : "/Images Products/placeholder.jpg"
              }
              alt={product?.p_name}
              style={{ borderRadius: "12px", width: "100%" }}
            />
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Product Name">
                {product?.p_name}
              </Descriptions.Item>
              <Descriptions.Item label="Model Code">
                {product?.model_code || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Serial Number">
                {product?.serial_number || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {product?.p_category || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Quantity">
                {product?.p_quantity || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Cost Price">
                {product?.p_costprice || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Sell Price">
                {product?.p_sellprice || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Expire Date">
                {product?.expire_date || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {product?.p_status || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {product?.p_description || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
      <UpdateProduct
        key={product?.p_id}
        modalOpen={updateOpen}
        onClose={handleUpdateClose}
        product={product}
        theme={theme}
      />
    </>
  );
};

export default ProductDetailModal;
